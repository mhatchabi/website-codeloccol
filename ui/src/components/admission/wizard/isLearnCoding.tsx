import { FunctionComponent, ChangeEvent, useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"

interface Props {
  admissionForm : Admission
  validate : boolean
  setValidate : (essai:boolean)=> void
  nextStep: () => void;
}

const IsLearnCodingWizard: FunctionComponent<Props> = ({admissionForm, validate, setValidate, nextStep}) => {
  const [learnCoding, setLearnCoding] = useState<string>(admissionForm.isLearnCoding.value);
  const [isLearnCoding, setIsLearnCoding] = useState<IsLearnCoding> ({
    isLearnCoding: admissionForm.isLearnCoding,
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
    admissionForm.isLearnCoding.value = learnCoding;
  }, [validate, admissionForm, after, nextStep, setValidate, learnCoding]);

  const validateForm = () => {
    let newForm: IsLearnCoding = isLearnCoding;

    if(!/^[a-zA-Zéèê\s]{3}/.test(admissionForm.isLearnCoding.value)){
      const errorMsg : string = `Tu dois notifier si tu as essayé d'apprendre le coding`;
      const newField : Field = { value : admissionForm.isLearnCoding.value, error : errorMsg, isValid : false};
      newForm = {...newForm, ...{isLearnCoding : newField}};
    } else {
      const newField : Field = { value : admissionForm.isLearnCoding.value, error : '', isValid : true};
      newForm = {...newForm, ...{isLearnCoding : newField}};
    }
    setIsLearnCoding(newForm);
    return newForm.isLearnCoding.isValid;
  }
  return (
    <div className="step" data-state="branchtype">
      <label className="custom add_top_10" />
      <h3 className="main_question">
        <FontAwesomeIcon icon={ faArrowRight } />
        As tu déjà essayer d'apprendre le coding ?
      </h3>
      <div className="form-group">
        {
          !isLearnCoding.isLearnCoding.isValid && (
            <>
              {
                isLearnCoding.isLearnCoding.value.trim() === "" ? (
                  <span className="error"> Obligatoire </span>
                ) : (
                  <span className="error"> {isLearnCoding.isLearnCoding.error} </span>
                )
              }
            </>
          )
        }
        <label className="container_radio version_2">
          Oui
          <input
            type="radio"
            name="isLearnCoding"
            className="required"
            onChange={() => { setLearnCoding("true") }}
            checked={learnCoding === "true"}
          />
          <span className="checkmark" />
        </label>
        <label className="container_radio version_2">
          Non
          <input
            type="radio"
            name="isLearnCoding"
            className="required"
            onChange={() => { setLearnCoding("false") }}
            checked={learnCoding === "false"}
          />
          <span className="checkmark" />
        </label>
      </div>
    </div>
  );
};
export default IsLearnCodingWizard