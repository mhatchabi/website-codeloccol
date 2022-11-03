import { FunctionComponent, ChangeEvent, useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"

interface Props {
  admissionForm : Admission
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) =>void
  validate : boolean
  setValidate : (essai:boolean)=> void
  nextStep: () => void;
}

const HandicapWizard: FunctionComponent<Props> = ({admissionForm, validate, nextStep, setValidate, handleInputChange}) => {
  const [handicap, SetHandicap] = useState<Handicap> ({
    handicap: admissionForm.handicap
  });
  const [after, setAfter] = useState<boolean>(false);
  useEffect (()=>{
    if(validate) {
      const validateF = validateForm();
      if(validateF) nextStep();
      setAfter(true)
    }
    if(after) validateForm();
    setValidate(false);
  }, [validate, admissionForm, after, nextStep, setValidate]);

  const validateForm = () => {
    let newForm: Handicap = handicap;

    if(!/^[a-zA-Zéèêç\s]{3}/.test(admissionForm.handicap.value)){
      const errorMsg : string = `Dis nous la nature de ton handicap`;
      const newField : Field = { value : admissionForm.handicap.value, error : errorMsg, isValid : false};
      newForm = {...newForm, ...{handicap : newField}};
    } else {
      const newField : Field = { value : admissionForm.handicap.value, error : '', isValid : true};
      newForm = {...newForm, ...{handicap : newField}};
    }
    SetHandicap(newForm);
    return newForm.handicap.isValid;
  }
  return (
    <div className="branch" id="houi">
      <div className="step" data-state="hnon">
        <h3 className="main_question">
          <FontAwesomeIcon icon={ faArrowRight } />
          Peux tu précisez le type d'handicap ?
        </h3>
        <div className="form-group">
          <input
            type="text"
            name="handicap"
            className="form-control required"
            value={admissionForm.handicap.value}
            onChange={(e) => handleInputChange(e)}
          />
          {
            !handicap.handicap.isValid && (
              <>
                {
                  handicap.handicap.value.trim() === "" ? (
                    <span className="error"> Vous devez notifier votre handicaper </span>
                  ) : (
                    <span className="error"> {handicap.handicap.error} </span>
                  )
                }
              </>
            )
          }
        </div>
      </div>
    </div>
  );
};
export default HandicapWizard