import AppNav from "../components/AppNav";
import GenericInput from "../components/GenericInput";
import { createWeight, createProtein } from "../services/api";
function OtherInputs() {
  function handleWeight(value) {
    console.log("Submitting weight:", value);
    createWeight({
      id: crypto.randomUUID(),
      weight: Number(value),
      date: new Date(),
    });
  }

  function handleProtein(value) {
    createProtein({
      id: crypto.randomUUID(),
      proteinInGrams: Number(value),
      date: new Date(),
    });
  }

  return (
    <div>
      <AppNav />
      <h1 className="text-center m-4">Other Inputs</h1>
      <div className="d-flex flex-row align-items-center justify-content-center gap-5">
        <GenericInput title="Weight" handleSubmit={handleWeight} />
        <GenericInput title="Protein Intake" handleSubmit={handleProtein} />
      </div>
    </div>
  );
}

export default OtherInputs;
