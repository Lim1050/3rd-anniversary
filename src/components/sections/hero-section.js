import Image from "next/image";
import { anniversaryData } from "@/data/anniversary";
import { formatDateID, getRelationshipDuration } from "@/lib/date";
import Reveal from "@/components/ui/reveal";

export default function HeroSection() {
  const duration = getRelationshipDuration(anniversaryData.anniversaryDate);

  return (
    <section id="hero" className="section">
      <div className="container two-column">
        <Reveal delay={0.05}>
          <div
            className="image-card hero-photo-frame"
            style={{ position: "relative" }}
          >
            <Image
              src={anniversaryData.heroImage.src}
              alt={anniversaryData.heroImage.alt}
              fill
              loading="eager"
              fetchPriority="high"
              className="hero-photo"
              sizes="(max-width: 960px) 100vw, 50vw"
            />
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="content-block">
            <p className="eyebrow">Untuk {anniversaryData.partnerName}</p>
            <h2>Orang favoritku.</h2>

            <p className="meta">
              Together since {formatDateID(anniversaryData.anniversaryDate)}
            </p>

            <p className="meta strong">
              {duration.years} tahun {duration.months} bulan {duration.days}{" "}
              hari bersama
            </p>

            <p>
              Hari ini mungkin hanya satu tanggal di kalender, tapi buat aku ini
              adalah pengingat bahwa selama tiga tahun terakhir, aku punya
              seseorang yang selalu berarti. Seseorang yang hadir di banyak
              tawa, cerita, pelajaran, dan hari-hari yang tidak selalu mudah.
              Dan orang itu adalah kamu.
            </p>

            <p className="quote">
              3 years, countless memories, and still my favorite person.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
