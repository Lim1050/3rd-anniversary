import { anniversaryData } from "@/data/anniversary";

export default function LetterSection() {
  return (
    <section id="letter" className="section">
      <div className="container narrow">
        <div className="letter-card">
          <p className="eyebrow">A Letter for You</p>
          <h2>Untuk kamu yang paling berarti.</h2>

          <div className="letter-body">
            <p>{anniversaryData.letter.greeting}</p>

            {anniversaryData.letter.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            <p>{anniversaryData.letter.closing},</p>
            <p className="signature">{anniversaryData.yourName}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
