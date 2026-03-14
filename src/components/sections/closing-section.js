import { anniversaryData } from "@/data/anniversary";
import FinalSurpriseModal from "@/components/ui/final-surprise-modal";

export default function ClosingSection() {
  return (
    <section id="end" className="section closing-section">
      <div className="container narrow centered-text">
        <p className="eyebrow">One More Thing...</p>
        <h2>Happy 3rd Anniversary, my love.</h2>

        <p>{anniversaryData.closingText}</p>

        <p className="quote">{anniversaryData.finalMessage}</p>

        <div className="final-actions">
          <FinalSurpriseModal />
        </div>
      </div>
    </section>
  );
}
