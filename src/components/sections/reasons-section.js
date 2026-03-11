import { anniversaryData } from "@/data/anniversary";

export default function ReasonsSection() {
  return (
    <section id="reasons" className="section soft-section">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Reasons Why I Love You</p>
          <h2>Dan sebenarnya, daftarnya masih bisa panjang sekali.</h2>
        </div>

        <div className="grid cards-4">
          {anniversaryData.reasons.map((reason, index) => (
            <div key={index} className="card reason-card">
              <span className="reason-number">0{index + 1}</span>
              <p>{reason}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
