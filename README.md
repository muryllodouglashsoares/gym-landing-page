# FORJA Training Studio — Landing Page

Landing page de alta conversão para um studio de treinamento fictício, desenvolvida como projeto de portfólio para demonstrar domínio de front-end moderno, SEO técnico, acessibilidade e performance em um cenário realista de negócio local.

**🔗 Demo ao vivo:** https://gym-landing-page.muryllodouglash-soares.workers.dev/

> ⚠️ **Projeto conceitual.** "FORJA Training Studio" não é uma academia real. Nome, endereço, telefone, equipe e depoimentos são fictícios, criados para fins de demonstração — as imagens usadas são de banco de imagens (Unsplash), já que não há autorização de uma academia real para uso de fotos próprias. O formulário de contato é funcional (integrado via Make → Google Sheets) apenas para demonstrar o fluxo completo de captura de lead.

---

## Sobre o projeto

O objetivo foi construir uma landing page como a de uma agência entregaria a um cliente real de nicho fitness: identidade visual forte, copywriting persuasivo, formulário validado ponta a ponta, SEO técnico completo e cuidado com performance/acessibilidade — não apenas uma página "bonita".

## Stack

- **[TanStack Start](https://tanstack.com/start)** — framework full-stack sobre React, com server functions e SSR
- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui** (estilo "new-york") sobre **Radix UI**
- **React Hook Form** + **Zod** — validação de formulário no cliente e no servidor
- **TanStack Router / React Query**
- **Bun** como gerenciador de pacotes/runtime de desenvolvimento

## Destaques técnicos

- **SEO estruturado completo**: JSON-LD (`ExerciseGym` + `FAQPage`), meta tags Open Graph e Twitter Card, `canonical`, `sitemap.xml`, `robots.txt` e manifest PWA com ícones (inclusive `maskable`).
- **Performance de imagem**: `srcSet`, `sizes`, `width`/`height` calculados dinamicamente a partir da própria URL da imagem, para evitar Cumulative Layout Shift (CLS) e servir o tamanho certo por viewport.
- **Formulário robusto**: validação dupla (cliente com React Hook Form + Zod, e servidor via `createServerFn` como defesa em profundidade), campo honeypot anti-bot, mensagens de erro acessíveis (`aria-invalid`, `role="alert"`) e integração real com Make → Google Sheets.
- **Acessibilidade**: labels associados a todos os campos, contraste cuidado no tema escuro, navegação por teclado, textos alternativos descritivos em todas as imagens.
- **Design system consistente**: paleta customizada (ember/steel/charcoal/ice), tipografia dupla (Barlow Condensed + Outfit), micro-interações (partículas, glow pulse, reveal on scroll) sem comprometer performance.

## Estrutura do projeto

```
src/
├── components/
│   ├── forja/          # Seções da landing page (Hero, Planos, Depoimentos, Contato...)
│   └── ui/              # Componentes shadcn/ui reutilizáveis
├── lib/
│   ├── contact-schema.ts    # Schema Zod compartilhado (cliente + servidor)
│   └── contact.server.ts    # Server function que recebe e encaminha o lead
├── routes/               # Rotas (TanStack Router)
└── styles.css             # Design tokens e estilos globais
```

## Rodando localmente

Requer [Node.js](https://nodejs.org) e [Bun](https://bun.sh).

```bash
bun install
bun run dev
```

Outros scripts disponíveis:

```bash
bun run build      # build de produção
bun run preview    # preview do build
bun run lint        # eslint
bun run format      # prettier
```

### Variáveis de ambiente

```
CONTACT_WEBHOOK_URL= https://hook.us2.make.com/fxifoofnkd83tyz4l6qkx39ovj7h98qw
```

## Decisões de projeto

- **Dados fictícios, mas realistas**: em vez de usar `lorem ipsum`, todo o conteúdo (planos, FAQ, timeline, equipe) foi escrito como copy real de negócio, para que a página funcione como prova de capacidade de copywriting e estruturação de informação — não só de código.
- **Sem uso indevido de prova social**: os números de avaliação exibidos (JSON-LD) refletem um cenário fictício e não devem ser interpretados como dados reais de um negócio existente.
- **Formulário funcional de verdade**: a decisão de conectar a um webhook real (em vez de simular o envio) foi proposital, para demonstrar o fluxo completo de captura de lead — do front-end até a planilha.

## Licença

Projeto para fins de portfólio. Sinta-se livre para usar como referência.