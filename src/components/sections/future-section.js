import { anniversaryData } from "@/data/anniversary";

export default function FutureSection() {
  return (
    <section id="future" className="section">
      <div className="container narrow">
        <div className="section-heading center">
          <p className="eyebrow">For the Days Ahead</p>
          <h2>I still want you in my tomorrows.</h2>
        </div>

        <div className="content-block centered-text">
          {anniversaryData.futureText.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
