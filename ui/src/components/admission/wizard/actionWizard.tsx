import { FunctionComponent } from "react";
interface Props {
  step: number
  prevStep: () => void;
  setValidate : (essai:boolean)=> void
  submit: boolean
}

const ActionWizard: FunctionComponent<Props> = ({ prevStep, step, setValidate, submit }) => {
  
  return (
    <div id="bottom-wizard">
      {
        step !== 1 && (
          <button type="button" name="backward" className="backward me-2 mb-2" onClick={ prevStep }>
            Precedent
          </button>
        )
      }

      {
        step !== 11 && (
          <button type="button" name="forward" className="forward me-2 mb-2" onClick={() => { setValidate(true) } }>
            Suivant
          </button>
        )
      }

      {
        step === 11 && (
          <button type={submit ? "submit" : "button"} name="process" className="submit" onClick={() => { !submit && setValidate(true) } }>
            Soumettre
          </button>
        )
      }
    </div>
  );
};
export default ActionWizard