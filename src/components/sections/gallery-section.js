import { anniversaryData } from "@/data/anniversary";
import GalleryLightbox from "@/components/ui/gallery-lightbox";
import Reveal from "@/components/ui/reveal";

export default function GallerySection() {
  return (
    <section id="memories" className="section">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Our Favorite Memories</p>
          <h2>Sedikit potongan waktu yang berhasil kita simpan.</h2>
        </div>

        <Reveal>
          <GalleryLightbox items={anniversaryData.gallery} />
        </Reveal>
      </div>
    </section>
  );
}
