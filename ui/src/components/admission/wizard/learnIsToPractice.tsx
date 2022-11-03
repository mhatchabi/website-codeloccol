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

const LearnIsToPraticeWizard: FunctionComponent<Props> = ({admissionForm, validate, nextStep, setValidate, handleTextareaChange, WordCount}) => {
  
  const [learn, setLearn] = useState<Learn> ({
    learn: admissionForm.learn
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
    let newForm: Learn = learn;

    if(!(WordCount(admissionForm.learn.value)  >= 100 && WordCount(admissionForm.learn.value)  <= 250)){
      const errorMsg : string = `Tu dois saisir les raisons pour lesquelles tu n'as pas encore commencé (entre 100 et 250 mots)`;
      const newField : Field = { value : admissionForm.learn.value, error : errorMsg, isValid : false};
      newForm = {...newForm, ...{learn : newField}};
    } else {
      const newField : Field = { value : admissionForm.learn.value, error : '', isValid : true};
      newForm = {...newForm, ...{learn : newField}};
    }
    setLearn(newForm);
    return newForm.learn.isValid;
  }

  return (
    <div className="step" id="De">
      <h3 className="main_question">
        <FontAwesomeIcon icon={faArrowRight} />
        Que penses tu de cette phrase "la meilleure façon d'apprendre est de
        pratiquer"
      </h3>
      <div className="form-group">
        <div className={`fl-wrap fl-wrap-textarea fl-is-required ${admissionForm.learn.value !== "" && "fl-is-active"}`}>
          <label htmlFor="question_7" className="fl-label">
            Dis nous ta comprenhension en un paragraphe de 100 à 250 mots
          </label>
          <textarea
            name="learn"
            className="form-control required fl-textarea"
            rows={10}
            cols={150}
            style={{height : 250 }}
            placeholder="Dis nous ta comprenhension en un paragraphe de 100 à 250 mots"
            value={admissionForm.learn.value}
            onChange={(e) => handleTextareaChange(e)}
          />
          {
            !learn.learn.isValid && (
              <>
                {
                  learn.learn.value.trim() === "" ? (
                    <span className="error"> Obligatoire </span>
                  ) : (
                    <span className="error"> {learn.learn.error} </span>
                  )
                }
              </>
            )
          }
        </div>
        <p>
          Nombre de mots :<span id="show_2"> {WordCount(admissionForm.learn.value)}</span>
        </p>
      </div>
    </div>
  );
};
export default LearnIsToPraticeWizard;
