import { useEffect, useRef, useState } from "react";
import { GALLERY, IMAGES, IMAGE_SRCSETS, IMAGE_DIMENSIONS } from "./data";
import { IconClose, IconExpand } from "./icons";
import { SectionLabel, SectionHeading, Reveal } from "./shared";

export function Galeria() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const isOpen = lightboxIndex !== null;
  const current = isOpen ? GALLERY[lightboxIndex] : null;

  const openLightbox = (index: number, trigger: HTMLButtonElement) => {
    lastTriggerRef.current = trigger;
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    // Devolve o foco para o item da galeria que abriu o lightbox.
    lastTriggerRef.current?.focus();
  };

  // Fecha com Esc e move o foco para o botão de fechar assim que o
  // lightbox abre, para manter a navegação por teclado previsível.
  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <section id="galeria" className="py-24 lg:py-36 bg-steel-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Reveal className="text-center mb-14">
          <SectionLabel>Galeria</SectionLabel>
          <SectionHeading>
            A FORJA EM
            <br />
            <span className="text-ember">AÇÃO.</span>
          </SectionHeading>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 auto-rows-[200px]">
          {GALLERY.map(({ key, alt, span }, index) => (
            <Reveal key={key} delayMs={index * 50} variant="fade" className={span}>
              <button
                type="button"
                onClick={(e) => openLightbox(index, e.currentTarget)}
                aria-label={`Ampliar foto: ${alt}`}
                className="gallery-item relative overflow-hidden cursor-pointer block w-full h-full p-0 border-0 bg-transparent text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-ember focus-visible:outline-offset-2"
              >
                <img
                  src={IMAGES[key]}
                  srcSet={IMAGE_SRCSETS[key]}
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  width={IMAGE_DIMENSIONS[key].width}
                  height={IMAGE_DIMENSIONS[key].height}
                  alt={alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  style={{ filter: "brightness(0.75) saturate(0.8)" }}
                />
                <div
                  className="gallery-overlay absolute inset-0 opacity-0 transition-opacity duration-300 flex items-center justify-center"
                  style={{ background: "rgba(249,115,22,0.2)" }}
                  aria-hidden="true"
                >
                  <div className="w-10 h-10 border-2 border-ice flex items-center justify-center">
                    <IconExpand />
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {current && (
        <div
          className="lightbox-backdrop"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
        >
          <button
            ref={closeButtonRef}
            className="absolute top-6 right-6 text-ice hover:text-ember transition-colors p-2"
            onClick={closeLightbox}
            aria-label="Fechar galeria"
          >
            <IconClose />
          </button>
          <img
            src={IMAGES[current.key]}
            alt={current.alt}
            className="max-w-[90vw] max-h-[88vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
