import { createFileRoute } from "@tanstack/react-router";

import { Navbar } from "../components/forja/Navbar";
import { Hero } from "../components/forja/Hero";
import { About } from "../components/forja/About";
import { Modalidades } from "../components/forja/Modalidades";
import { WhyForja } from "../components/forja/WhyForja";
import { Planos } from "../components/forja/Planos";
import { Equipe } from "../components/forja/Equipe";
import { Galeria } from "../components/forja/Galeria";
import { Depoimentos } from "../components/forja/Depoimentos";
import { Faq } from "../components/forja/Faq";
import { CtaFinal } from "../components/forja/CtaFinal";
import { Contato } from "../components/forja/Contato";
import { Footer } from "../components/forja/Footer";
import {
  CONTACT,
  FAQS,
  IMAGES,
  PHONE_E164,
  PLANS,
} from "../components/forja/data";

// URL pública real deste projeto de portfólio (demo publicada em Cloudflare,
// conforme o README). A FORJA é uma academia fictícia e não possui domínio
// próprio. Canonical, og:url, JSON-LD, robots.txt e sitemap.xml dependem
// deste valor; se um domínio próprio for configurado, atualize os quatro.
const SITE_URL = "https://gym-landing-page.muryllodouglash-soares.workers.dev";

const TITLE = "FORJA Training Studio | Academia Premium em Pinheiros, SP";
const DESCRIPTION =
  "Training studio premium em Pinheiros, São Paulo. Musculação, funcional, cross training e personal com coaches CREF. Primeira aula experimental gratuita.";

// Faixa de preço derivada dos planos (PLANS), para não duplicar valores.
const planPrices = PLANS.map((plan) => Number(plan.price));
const priceRange = `R$${Math.min(...planPrices)}–R$${Math.max(...planPrices)}`;

// Dois nós independentes (ExerciseGym e FAQPage), ambos derivados dos mesmos
// dados exibidos na página. Não há `aggregateRating`: a página não exibe
// avaliações verificáveis (o "500" do projeto é a contagem de alunos, não de
// avaliações), e marcar isso como nota seria informação inventada.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ExerciseGym",
      "@id": `${SITE_URL}/#business`,
      name: "FORJA Training Studio",
      description: DESCRIPTION,
      url: `${SITE_URL}/`,
      image: IMAGES.heroBg,
      telephone: PHONE_E164,
      priceRange,
      address: {
        "@type": "PostalAddress",
        streetAddress: CONTACT.address.split(" — ")[0],
        addressLocality: "São Paulo",
        addressRegion: "SP",
        addressCountry: "BR",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: FAQS.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

// `<` escapado para que nenhum conteúdo possa encerrar a tag <script>.
const jsonLdString = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:site_name", content: "FORJA Training Studio" },
      { property: "og:image", content: IMAGES.heroBg },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: IMAGES.heroBg },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [
      { type: "application/ld+json", children: jsonLdString },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div style={{ background: "#0a0a0a" }}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Modalidades />
        <WhyForja />
        <Planos />
        <Equipe />
        <Galeria />
        <Depoimentos />
        <Faq />
        <CtaFinal />
        <Contato />
      </main>
      <Footer />
    </div>
  );
}
