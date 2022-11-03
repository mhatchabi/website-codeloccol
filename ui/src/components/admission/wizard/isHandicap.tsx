import { FunctionComponent, ChangeEvent, useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"

interface Props {
  admissionForm : Admission
  validate : boolean
  setValidate : (essai:boolean)=> void
  nextStep: () => void;
}


const IsHandicapWizard: FunctionComponent<Props> = ({admissionForm, validate, setValidate, nextStep}) => {
  const [handicap, setHandicap] = useState<string>(admissionForm.isHandicap.value);
  const [isHandicap, setIsHandicap] = useState<IsHandicap> ({
    isHandicap: admissionForm.isHandicap,
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
    admissionForm.isHandicap.value = handicap;
  }, [validate, admissionForm, after, nextStep, setValidate, handicap]);

  const validateForm = () => {
    let newForm: IsHandicap = isHandicap;

    if(!/^[a-zA-Zéèê\s]{3}/.test(admissionForm.isHandicap.value)){
      const errorMsg : string = `Tu dois notifier si tu as un handicap ou non`;
      const newField : Field = { value : admissionForm.isHandicap.value, error : errorMsg, isValid : false};
      newForm = {...newForm, ...{isHandicap : newField}};
    } else {
      const newField : Field = { value : admissionForm.isHandicap.value, error : '', isValid : true};
      newForm = {...newForm, ...{isHandicap : newField}};
    }
    setIsHandicap(newForm);
    return newForm.isHandicap.isValid;
  }

  return (
    <div className="step" data-state="branchtype">
      <label className="custom add_top_10" />
      <h3 className="main_question">
        <FontAwesomeIcon icon={ faArrowRight } />
        Es tu en situation d'handicap ?
      </h3>
      <div className="form-group">
        {
          !isHandicap.isHandicap.isValid && (
            <>
              {
                isHandicap.isHandicap.value.trim() === "" ? (
                  <span className="error"> Obligatoire </span>
                ) : (
                  <span className="error"> {isHandicap.isHandicap.error} </span>
                )
              }
            </>
          )
        }
        <label className="container_radio version_2">
          Oui
          <input
            type="radio"
            name="isHandicap"
            className="required"
            onChange={() => { setHandicap("true") }}
            checked={handicap === "true"}
          />
          <span className="checkmark" />
        </label>
        <label className="container_radio version_2">
          Non
          <input
            type="radio"
            name="isHandicap"
            className="required"
            onChange={() => { setHandicap("false") }}
            checked={handicap === "false"}
          />
          <span className="checkmark" />
        </label>
      </div>
    </div>
  );
};

export default IsHandicapWizard;
