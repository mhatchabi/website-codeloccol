import { FunctionComponent, ChangeEvent, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface Props {
  admissionForm : Admission
  handleTextareaChange: (e: ChangeEvent<HTMLTextAreaElement>) =>void
  validate : boolean
  setValidate : (essai:boolean)=> void
  nextStep: () => void;
  WordCount:(str:string) => number
}

const WhyDoNotLearnCodingWizard: FunctionComponent<Props> = ({admissionForm, validate, nextStep, setValidate, handleTextareaChange, WordCount}) => {
  
  const [whyDoNotLearnCoding, setWhyDoNotLearnCoding] = useState<WhyDoNotLearnCoding> ({
    whyDoNotLearnCoding: admissionForm.whyDoNotLearnCoding
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
    let newForm: WhyDoNotLearnCoding = whyDoNotLearnCoding;

    if(!(WordCount(admissionForm.whyDoNotLearnCoding.value)  >= 100 && WordCount(admissionForm.whyDoNotLearnCoding.value)  <= 250)){
      const errorMsg : string = `Tu dois saisir les raisons pour lesquelles tu n'a pas encore commencé`;
      const newField : Field = { value : admissionForm.whyDoNotLearnCoding.value, error : errorMsg, isValid : false};
      newForm = {...newForm, ...{whyDoNotLearnCoding : newField}};
    } else {
      const newField : Field = { value : admissionForm.whyDoNotLearnCoding.value, error : '', isValid : true};
      newForm = {...newForm, ...{whyDoNotLearnCoding : newField}};
    }
    setWhyDoNotLearnCoding(newForm);
    return newForm.whyDoNotLearnCoding.isValid;
  }
  
  return (
    <div className="branch" id="No">
      <div className="step" data-state="De">
        <h3 className="main_question">
          <FontAwesomeIcon icon={faArrowRight} />
          Pourquoi ne t'es tu pas lancé ?
        </h3>
        <div className="form-group">
          <div className={`fl-wrap fl-wrap-textarea fl-is-required ${admissionForm.whyDoNotLearnCoding.value !== "" && "fl-is-active"}`}>
            <textarea
              name="whyDoNotLearnCoding"
              className="form-control required fl-textarea"
              rows={10}
              cols={150}
              style={{height : 250 }}
              placeholder="Dis nous en quelques lignes les raisons pour lesquelles tu n'a pas encore commencé. (entre 100 et 250 mots)"
              value={admissionForm.whyDoNotLearnCoding.value}
              onChange={(e) => handleTextareaChange(e)}
            />
            {
              !whyDoNotLearnCoding.whyDoNotLearnCoding.isValid && (
                <>
                  {
                    whyDoNotLearnCoding.whyDoNotLearnCoding.value.trim() === "" ? (
                      <span className="error"> Obligatoire </span>
                    ) : (
                      <span className="error"> {whyDoNotLearnCoding.whyDoNotLearnCoding.error} </span>
                    )
                  }
                </>
              )
            }
            <label htmlFor="question_6" className="fl-label">
              Dis nous en quelques lignes les raisons pour lesquelles tu n'a pas
              encore commencé
            </label>
          </div>
          <p>
            Nombre de mots :<span id="show"> {WordCount(admissionForm.whyDoNotLearnCoding.value)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default WhyDoNotLearnCodingWizard;
