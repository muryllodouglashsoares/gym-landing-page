/** Conteúdo e imagens da landing page FORJA (fonte da verdade: Figma). */

export const IMAGES = {
  heroBg:
    "https://images.unsplash.com/photo-1770513649465-2c60c8039806?w=1920&h=1080&fit=crop&auto=format",
  heroAthlete:
    "https://images.unsplash.com/photo-1610312856669-2cee66b2949c?w=800&h=1200&fit=crop&auto=format",
  about:
    "https://images.unsplash.com/photo-1637430308606-86576d8fef3c?w=900&h=700&fit=crop&auto=format",
  team1:
    "https://images.unsplash.com/photo-1696563996353-214a3690bb11?w=600&h=750&fit=crop&auto=format",
  team2:
    "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=600&h=750&fit=crop&auto=format",
  team3:
    "https://images.unsplash.com/photo-1704223523169-52feeed90365?w=600&h=750&fit=crop&auto=format",
  g1: "https://images.unsplash.com/photo-1521805103424-d8f8430e8933?w=600&h=800&fit=crop&auto=format",
  g2: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&h=420&fit=crop&auto=format",
  g3: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?w=600&h=420&fit=crop&auto=format",
  g4: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&h=800&fit=crop&auto=format",
  g5: "https://images.unsplash.com/photo-1620188467120-5042ed1eb5da?w=600&h=420&fit=crop&auto=format",
  g6: "https://images.unsplash.com/photo-1592588253414-887759037c2a?w=600&h=420&fit=crop&auto=format",
} as const;

type ImageKey = keyof typeof IMAGES;

/** Extrai width/height dos parâmetros da própria URL do Unsplash, evitando duplicar esses números à mão. */
function parseDimensions(url: string): { width: number; height: number } {
  const match = url.match(/[?&]w=(\d+)&h=(\d+)/);
  if (!match) throw new Error(`URL sem w/h: ${url}`);
  return { width: Number(match[1]), height: Number(match[2]) };
}

/** Gera um srcset proporcional (mesmo enquadramento, larguras diferentes) a partir da URL base. */
function buildSrcSet(url: string, widths: number[]): string {
  const { width: baseWidth, height: baseHeight } = parseDimensions(url);
  const ratio = baseHeight / baseWidth;
  return widths
    .map((w) => {
      const h = Math.round(w * ratio);
      const scaled = url.replace(/([?&])w=\d+/, `$1w=${w}`).replace(/([?&])h=\d+/, `$1h=${h}`);
      return `${scaled} ${w}w`;
    })
    .join(", ");
}

/** Dimensões intrínsecas de cada imagem — usadas em width/height do <img> para evitar CLS. */
export const IMAGE_DIMENSIONS = Object.fromEntries(
  Object.entries(IMAGES).map(([key, url]) => [key, parseDimensions(url)]),
) as Record<ImageKey, { width: number; height: number }>;

/** srcset responsivo por imagem, para servir um arquivo menor em telas pequenas. */
export const IMAGE_SRCSETS = {
  heroBg: buildSrcSet(IMAGES.heroBg, [640, 960, 1280, 1920]),
  heroAthlete: buildSrcSet(IMAGES.heroAthlete, [400, 640, 800]),
  about: buildSrcSet(IMAGES.about, [450, 700, 900]),
  team1: buildSrcSet(IMAGES.team1, [400, 600]),
  team2: buildSrcSet(IMAGES.team2, [400, 600]),
  team3: buildSrcSet(IMAGES.team3, [400, 600]),
  g1: buildSrcSet(IMAGES.g1, [400, 600]),
  g2: buildSrcSet(IMAGES.g2, [400, 600]),
  g3: buildSrcSet(IMAGES.g3, [400, 600]),
  g4: buildSrcSet(IMAGES.g4, [400, 600]),
  g5: buildSrcSet(IMAGES.g5, [400, 600]),
  g6: buildSrcSet(IMAGES.g6, [400, 600]),
} as const satisfies Record<ImageKey, string>;

export const NAV_LINKS = [
  { label: "Sobre", href: "#sobre" },
  { label: "Modalidades", href: "#modalidades" },
  { label: "Planos", href: "#planos" },
  { label: "Equipe", href: "#equipe" },
  { label: "Contato", href: "#contato" },
] as const;

export const HERO_STATS = [
  { value: 500, decimals: 0, prefix: "+", suffix: "", label: "Alunos Ativos" },
  { value: 8, decimals: 0, prefix: "", suffix: " Anos", label: "de Excelência" },
  { value: 5, decimals: 1, prefix: "", suffix: "★", label: "Avaliação Média" },
] as const;

export const TIMELINE = [
  {
    year: "2016",
    title: "A Fundação",
    desc: "FORJA nasce de um ideal: criar um espaço onde performance e pertencimento coexistem. Primeiros 80 alunos.",
  },
  {
    year: "2018",
    title: "Expansão",
    desc: "Dobramos a estrutura e certificamos toda a equipe em treinamento funcional e cross training.",
  },
  {
    year: "2021",
    title: "Studio Premium",
    desc: "Inauguramos a área de personal training exclusiva, avaliação física avançada e spa pós-treino.",
  },
  {
    year: "2024",
    title: "Referência SP",
    desc: "Mais de 500 alunos ativos. Reconhecidos como melhor training studio de São Paulo.",
  },
] as const;

export const PLANS = [
  {
    name: "Básico",
    price: "149",
    period: "/mês",
    desc: "Para quem está começando a forja.",
    features: [
      "Acesso à musculação",
      "Acesso ao cardio",
      "Vestiário premium",
      "App de treino",
      "1 avaliação física/mês",
    ],
    missing: ["Aulas em grupo", "Personal incluído"],
    cta: "Começar Agora",
    highlight: false,
  },
  {
    name: "Elite",
    price: "249",
    period: "/mês",
    desc: "O plano mais escolhido da FORJA.",
    features: [
      "Acesso ilimitado à academia",
      "Todas as aulas em grupo",
      "App de treino premium",
      "2 avaliações físicas/mês",
      "Nutricionista parceiro",
      "Acesso à sauna",
    ],
    missing: [],
    cta: "Escolher Elite",
    highlight: true,
  },
  {
    name: "Pro",
    price: "449",
    period: "/mês",
    desc: "Máximo desempenho, suporte total.",
    features: [
      "Tudo do plano Elite",
      "4 sessões de personal/mês",
      "Periodização exclusiva",
      "Avaliações ilimitadas",
      "Acesso VIP 24h",
      "Coach dedicado",
    ],
    missing: [],
    cta: "Ir Pro",
    highlight: false,
  },
] as const;

export const TEAM = [
  {
    key: "team1" as const,
    name: "Rafael Mendes",
    role: "Head Coach · Musculação",
    bio: "CREF 012345-G. Especialista em hipertrofia e força, com 12 anos formando atletas de alta performance em São Paulo.",
  },
  {
    key: "team2" as const,
    name: "Carla Souza",
    role: "Coach · Funcional & Cross",
    bio: "CREF 098765-G. Certificada CrossFit L2 e especialista em treinamento feminino de alta intensidade.",
  },
  {
    key: "team3" as const,
    name: "Diego Alves",
    role: "Personal & Avaliação",
    bio: "CREF 054321-G. Mestre em Fisiologia do Exercício. Especialista em periodização e reabilitação esportiva.",
  },
] as const;

export const GALLERY = [
  { key: "g1" as const, alt: "Barbell FORJA", span: "row-span-2" },
  { key: "g2" as const, alt: "Treino funcional feminino", span: "" },
  { key: "g3" as const, alt: "Cross training em grupo", span: "" },
  { key: "g4" as const, alt: "Treino intenso na FORJA", span: "row-span-2" },
  { key: "g5" as const, alt: "Equipamentos premium", span: "" },
  { key: "g6" as const, alt: "Atleta em treino", span: "" },
] as const;

export const TESTIMONIALS = [
  {
    name: "Lucas Ferreira",
    role: "Aluno há 3 anos",
    text: "Em 18 meses perdi 22kg e ganhei massa muscular que nunca imaginei ter. A FORJA não é só uma academia — é uma mudança de mentalidade. Os coaches cobram resultados com carinho.",
    stars: 5,
  },
  {
    name: "Ana Claudia",
    role: "Aluna há 2 anos",
    text: "Vim de uma academia comum e a diferença é abissal. Aqui cada treino é monitorado, cada semana tenho evolução visível. O plano Elite vale cada centavo — a nutricionista parceira mudou minha relação com a comida.",
    stars: 5,
  },
  {
    name: "Marcos Henrique",
    role: "Aluno há 5 anos",
    text: "Já visitei studios em NY e Lisboa. A FORJA está no mesmo nível. Equipamentos imaculados, equipe de verdade e um ambiente que te faz querer voltar todo dia. Não existe outra opção pra mim.",
    stars: 5,
  },
  {
    name: "Fernanda Rocha",
    role: "Aluna há 1 ano",
    text: "O personal Diego mudou minha vida. Com histórico de lesões no joelho achei que nunca mais treinaria com intensidade. Em 8 meses estou mais forte do que antes da lesão. Metodologia impecável.",
    stars: 5,
  },
] as const;

export const FAQS = [
  {
    q: "Qual é o horário de funcionamento da FORJA?",
    a: "De segunda a sexta das 5h às 23h. Sábados das 7h às 20h. Domingos das 8h às 16h. Clientes Pro têm acesso 24h.",
  },
  {
    q: "Preciso agendar os treinos com antecedência?",
    a: "Para musculação e cardio, não. Para aulas em grupo (funcional, cross training) recomendamos agendamento pelo app pelo menos 2h antes. Personal sempre agendado com seu coach.",
  },
  {
    q: "Posso congelar meu plano por viagem ou doença?",
    a: "Sim. Planos Elite e Pro permitem até 30 dias de congelamento por ano. Plano Básico permite 15 dias. Basta informar na recepção com 48h de antecedência.",
  },
  {
    q: "A FORJA tem estacionamento?",
    a: "Sim, estacionamento gratuito para alunos por até 3h. Convênio com o estacionamento coberto da Rua das Palmeiras (acesso pela lateral do prédio).",
  },
  {
    q: "Como funciona a avaliação física?",
    a: "Bioimpedância, medidas antropométricas e teste de VO2 max (opcionais por plano). Plano Básico: 1x/mês. Elite: 2x/mês. Pro: ilimitado. Laudo detalhado com recomendações entregue em até 24h.",
  },
  {
    q: "Há desconto para pagamento anual?",
    a: "Sim. Pagamento anual à vista tem 15% de desconto sobre qualquer plano. Parcelamento em até 12x sem juros no cartão de crédito.",
  },
] as const;

export const CONTACT = {
  address: "Rua das Palmeiras, 847 — Pinheiros, São Paulo, SP",
  phone: "(11) 98765-4321",
  whatsapp: "(11) 98765-4321 — Atendimento 7h às 21h",
  cref: "CREF 012345-G/SP",
  // TODO(cliente): confirmar o @ real do Instagram antes do lançamento.
  instagramHandle: "forja.trainingstudio",
} as const;

/** Links reais de contato, derivados de CONTACT para não duplicar dados. */
const phoneDigits = CONTACT.phone.replace(/\D/g, "");
const whatsappDigits = phoneDigits.startsWith("55") ? phoneDigits : `55${phoneDigits}`;

export const WHATSAPP_URL = `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(
  "Olá! Gostaria de agendar uma aula experimental na FORJA.",
)}`;

export const INSTAGRAM_URL = `https://instagram.com/${CONTACT.instagramHandle}`;

export const MAPS_QUERY_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  CONTACT.address,
)}`;

export const MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  CONTACT.address,
)}&output=embed`;
