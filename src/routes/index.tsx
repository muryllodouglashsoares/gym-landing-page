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
import { FAQS, IMAGES } from "../components/forja/data";

// TODO(cliente): confirmar o domínio final de produção antes do deploy.
// A canonical, og:url e JSON-LD abaixo dependem deste valor.
const SITE_URL = "https://forjatraining.com.br";

const TITLE = "FORJA Training Studio | Academia Premium em Pinheiros, SP";
const DESCRIPTION =
  "Training studio premium em Pinheiros, São Paulo. Musculação, funcional, cross training e personal com coaches CREF. Primeira aula experimental gratuita.";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ExerciseGym",
  "@id": `${SITE_URL}/#business`,
  name: "FORJA Training Studio",
  description: DESCRIPTION,
  url: SITE_URL,
  image: IMAGES.heroBg,
  telephone: "+55 11 98765-4321",
  priceRange: "R$149–R$449",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua das Palmeiras, 847",
    addressLocality: "Pinheiros, São Paulo",
    addressRegion: "SP",
    addressCountry: "BR",
  },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "500" },
  mainEntityOfPage: {
    "@type": "FAQPage",
    mainEntity: FAQS.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: IMAGES.heroBg },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: IMAGES.heroBg },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
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
