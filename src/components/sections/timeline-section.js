import { anniversaryData } from "@/data/anniversary";

export default function TimelineSection() {
  return (
    <section id="story" className="section soft-section">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Our Story So Far</p>
          <h2>Setiap momen punya tempatnya sendiri.</h2>
        </div>

        <div className="timeline">
          {anniversaryData.timeline.map((item, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
