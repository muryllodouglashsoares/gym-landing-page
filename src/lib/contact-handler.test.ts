/// <reference types="node" />
// Executar com: npm test  (usa o test runner nativo do Node, sem dependências
// extras). Nenhum teste toca o webhook real: `fetch` é sempre simulado.
import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { contactSchema, MODALIDADE_OPTIONS } from "./contact-schema.ts";
import {
  CONTACT_MESSAGES,
  processContactSubmission,
  type ContactDeps,
} from "./contact-handler.ts";

const WEBHOOK = "https://hook.example.invalid/secret-token-123";

const valid = {
  nome: "Maria Silva",
  email: "maria@example.com",
  telefone: "(11) 91234-5678",
  modalidade: "Cardio",
  mensagem: "Quero conhecer o estúdio.",
};

const accepts = (value: unknown) => contactSchema.safeParse(value).success;
const FAILURE = { ok: false, error: CONTACT_MESSAGES.unavailable };

type Setup = Partial<ContactDeps> & { response?: Response | Error };

function setup({ response, ...overrides }: Setup = {}) {
  const calls: { url: string; init: RequestInit }[] = [];
  const logs: unknown[][] = [];
  const reply = response ?? new Response("Accepted", { status: 200 });
  const fetchImpl = async (url: string, init: RequestInit) => {
    calls.push({ url: String(url), init });
    if (reply instanceof Error) throw reply;
    return reply;
  };
  const deps: ContactDeps = {
    webhookUrl: WEBHOOK,
    now: () => new Date("2026-01-01T00:00:00.000Z"),
    logger: { error: (...args: unknown[]) => void logs.push(args) },
    fetchImpl: fetchImpl as unknown as typeof fetch,
    ...overrides,
  };
  return { deps, calls, logs };
}

describe("contactSchema", () => {
  it("aceita dados válidos e campos opcionais vazios", () => {
    assert.equal(accepts(valid), true);
    const minimal = { nome: "Ana", email: "a@b.co", telefone: "" };
    assert.equal(accepts({ ...minimal, modalidade: "", mensagem: "" }), true);
  });

  it("rejeita campos obrigatórios ausentes e formatos inválidos", () => {
    assert.equal(accepts({}), false);
    assert.equal(accepts({ ...valid, nome: "A" }), false);
    assert.equal(accepts({ ...valid, email: "sem-arroba" }), false);
    assert.equal(accepts({ ...valid, telefone: "123" }), false);
    assert.equal(accepts({ ...valid, modalidade: "Natação" }), false);
  });

  it("rejeita entradas longas demais e tipos inesperados", () => {
    assert.equal(accepts({ ...valid, nome: "x".repeat(121) }), false);
    assert.equal(accepts({ ...valid, mensagem: "x".repeat(1001) }), false);
    assert.equal(accepts({ ...valid, telefone: "1".repeat(31) }), false);
    assert.equal(accepts({ ...valid, email: 42 }), false);
  });

  it("aceita todas as modalidades do formulário", () => {
    for (const modalidade of MODALIDADE_OPTIONS) {
      assert.equal(accepts({ ...valid, modalidade }), true);
    }
  });
});

describe("processContactSubmission", () => {
  it("encaminha dados válidos ao webhook, sem o honeypot", async () => {
    const { deps, calls } = setup();
    const result = await processContactSubmission(
      { ...valid, empresa: "" },
      deps,
    );
    assert.deepEqual(result, { ok: true });
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, WEBHOOK);
    assert.equal(calls[0].init.method, "POST");
    const body = JSON.parse(String(calls[0].init.body));
    assert.equal(body.nome, valid.nome);
    assert.equal(body.origem, "site-forja-contato");
    assert.equal(body.enviadoEm, "2026-01-01T00:00:00.000Z");
    assert.equal("empresa" in body, false);
    assert.ok(calls[0].init.signal, "deve usar timeout via AbortSignal");
  });

  it("honeypot preenchido: finge sucesso e não chama o webhook", async () => {
    const { deps, calls } = setup();
    const trapped = { ...valid, empresa: "ACME" };
    assert.deepEqual(await processContactSubmission(trapped, deps), {
      ok: true,
    });
    // Mesmo com dados inválidos a resposta é idêntica (bot não distingue).
    const invalid = { nome: "", empresa: "x" };
    assert.deepEqual(await processContactSubmission(invalid, deps), {
      ok: true,
    });
    assert.equal(calls.length, 0);
  });

  it("dados inválidos: erro amigável, sem chamar o webhook", async () => {
    const { deps, calls } = setup();
    const badEmail = { ...valid, email: "x" };
    const result = await processContactSubmission(badEmail, deps);
    assert.equal(result.ok, false);
    for (const bad of [null, undefined, "texto", 42, []]) {
      const outcome = await processContactSubmission(bad, deps);
      assert.equal(outcome.ok, false);
    }
    assert.equal(calls.length, 0);
  });

  it("webhook ausente ou inválido: falha explícita e sem vazar dados", async () => {
    const invalidUrls = [undefined, "", "não é url", "http://inseguro.test"];
    for (const webhookUrl of invalidUrls) {
      const { deps, calls, logs } = setup({ webhookUrl });
      const result = await processContactSubmission(valid, deps);
      assert.deepEqual(result, FAILURE);
      assert.equal(calls.length, 0);
      assert.ok(!JSON.stringify(result).includes("CONTACT_WEBHOOK_URL"));
      const serialized = JSON.stringify(logs);
      assert.ok(!serialized.includes(valid.email));
      assert.ok(!serialized.includes(valid.nome));
    }
  });

  it("resposta de erro do webhook: falha, log só com o status", async () => {
    const response = new Response("boom", { status: 500 });
    const { deps, logs } = setup({ response });
    assert.deepEqual(await processContactSubmission(valid, deps), FAILURE);
    const serialized = JSON.stringify(logs);
    assert.ok(serialized.includes("500"));
    assert.ok(!serialized.includes(WEBHOOK));
    assert.ok(!serialized.includes(valid.email));
  });

  it("falha de rede: mensagem amigável, sem vazar URL nem dados", async () => {
    const response = new TypeError(`fetch failed ${WEBHOOK}`);
    const { deps, logs } = setup({ response });
    const result = await processContactSubmission(valid, deps);
    assert.deepEqual(result, FAILURE);
    assert.ok(!JSON.stringify([result, logs]).includes(WEBHOOK));
  });

  it("aplica de fato o timeout configurado", async () => {
    const hanging = (_url: string, init: RequestInit) =>
      new Promise<Response>((_resolve, reject) => {
        const { signal } = init;
        signal?.addEventListener("abort", () => reject(signal.reason));
      });
    const fetchImpl = hanging as unknown as typeof fetch;
    const { deps } = setup({ fetchImpl, timeoutMs: 30 });
    // O timer de AbortSignal.timeout não mantém o processo vivo; num servidor
    // real a conexão pendente faz isso. Aqui seguramos o event loop à mão.
    const keepAlive = setInterval(() => {}, 10);
    try {
      assert.deepEqual(await processContactSubmission(valid, deps), FAILURE);
    } finally {
      clearInterval(keepAlive);
    }
  });
});
