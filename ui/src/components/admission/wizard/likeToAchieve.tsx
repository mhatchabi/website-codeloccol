import { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
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

const LikeToAchieveWizard: FunctionComponent<Props> = ({ admissionForm, validate, nextStep, setValidate, handleTextareaChange, WordCount}) => {
  
  const [likeToAchieve, setLikeToAchieve] = useState<LikeToAchieve> ({
    likeToAchieve: admissionForm.likeToAchieve
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
    let newForm: LikeToAchieve = likeToAchieve;

    if(!(WordCount(admissionForm.likeToAchieve.value)  >= 100 && WordCount(admissionForm.likeToAchieve.value)  <= 250)){
      const errorMsg : string = `Tu dois saisir en quelques lignes ton projet (entre 100 et 250 mots)`;
      const newField : Field = { value : admissionForm.likeToAchieve.value, error : errorMsg, isValid : false};
      newForm = {...newForm, ...{likeToAchieve : newField}};
    } else {
      const newField : Field = { value : admissionForm.likeToAchieve.value, error : '', isValid : true};
      newForm = {...newForm, ...{likeToAchieve : newField}};
    }
    setLikeToAchieve(newForm);
    return newForm.likeToAchieve.isValid;
  }
  
  return (
    <div className="step">
      <h3 className="main_question">
        <FontAwesomeIcon icon={faArrowRight} />
        Dernière question à propos de toi : Que voudrais-tu accomplir à la fin
        de ce programme ?
      </h3>
      <div className="form-group">
        <div className={`fl-wrap fl-wrap-textarea fl-is-required ${admissionForm.likeToAchieve.value !== "" && "fl-is-active"}`}>
          <label htmlFor="question_8" className="fl-label">
            Dis nous en quelques lignes ton projet
          </label>
          <textarea
            name="likeToAchieve"
            className="form-control required fl-textarea"
            rows={10}
            style={{height : 250 }}
            placeholder="Dis nous en quelques lignes ton projet"
            value={admissionForm.likeToAchieve.value}
            onChange={(e) => handleTextareaChange(e)}
          />{
            !likeToAchieve.likeToAchieve.isValid && (
              <>
                {
                  likeToAchieve.likeToAchieve.value.trim() === "" ? (
                    <span className="error"> Obligatoire </span>
                  ) : (
                    <span className="error"> {likeToAchieve.likeToAchieve.error} </span>
                  )
                }
              </>
            )
          }
        </div>
        <p>
          Nombre de mots :<span id="show_2"> {WordCount(admissionForm.likeToAchieve.value)}</span>
        </p>
      </div>
    </div>
  );
};
export default LikeToAchieveWizard;
