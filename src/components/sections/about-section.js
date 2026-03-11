import { anniversaryData } from "@/data/anniversary";

export default function AboutSection() {
  return (
    <section id="about" className="section soft-section">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Tentang Kita</p>
          <h2>
            Sedikit hal sederhana yang selalu terasa spesial kalau sama kamu.
          </h2>
        </div>

        <div className="grid cards-4">
          {anniversaryData.aboutCards.map((item, index) => (
            <div key={index} className="card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
