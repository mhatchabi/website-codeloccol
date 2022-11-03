import { FunctionComponent, ChangeEvent, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface Props {
  admissionForm : Admission
  handleTextareaChange: (e: ChangeEvent<HTMLTextAreaElement>) =>void
  validate : boolean
  setValidate : (essai:boolean)=> void
  nextStep: () => void;
  WordCount : (str:string)=> number
}

const CodingWizard: FunctionComponent<Props> = ({admissionForm, validate, nextStep, setValidate, handleTextareaChange, WordCount}) => {
  
  const [coding, setCoding] = useState<Coding> ({
    coding: admissionForm.coding
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
    let newForm: Coding = coding;

    if(!(WordCount(admissionForm.coding.value)  >= 100 && WordCount(admissionForm.coding.value)  <= 250)){
      const errorMsg : string = `Tu dois saisir entre 100 et 250 mots`;
      const newField : Field = { value : admissionForm.coding.value, error : errorMsg, isValid : false};
      newForm = {...newForm, ...{coding : newField}};
    } else {
      const newField : Field = { value : admissionForm.coding.value, error : '', isValid : true};
      newForm = {...newForm, ...{coding : newField}};
    }
    setCoding(newForm);
    return newForm.coding.isValid;
  }

  return (
    <div className="step">
      <h3 className="main_question">
        <FontAwesomeIcon icon={faArrowRight} />
        Pourquoi as-tu choisi Codeloccol ?
      </h3>
      <div className="form-group">
        <div className={`fl-wrap fl-wrap-textarea fl-is-required ${admissionForm.coding.value !== "" && "fl-is-active"}`}>
          <textarea
            name="coding"
            className="form-control required fl-textarea valid"
            placeholder="En utilisant entre 100 et 250 mots, dis nous tes raisons pour apprendre le Coding"
            rows={10}
            style={{height : 250 }}
            value={admissionForm.coding.value}
            onChange={(e) => handleTextareaChange(e)}
          />
          {
            !coding.coding.isValid && (
              <>
                {
                  coding.coding.value.trim() === "" ? (
                    <span className="error"> Obligatoire </span>
                  ) : (
                    <span className="error"> {coding.coding.error} </span>
                  )
                }
              </>
            )
          }
          <label htmlFor="question_2" className="fl-label">
            En utilisant entre 100 et 250 mots, dis nous tes raisons pour
            apprendre le Coding à Codeloccol
          </label>
        </div>
        <p>
          Nombre de mots :<span id="show"> {WordCount(admissionForm.coding.value)}</span>
        </p>
      </div>
    </div>
  );
};

export default CodingWizard;
