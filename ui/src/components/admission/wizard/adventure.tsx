import { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface Props {
  admissionForm : Admission
  handleTextareaChange: (e: ChangeEvent<HTMLTextAreaElement>) =>void
  validate : boolean
  setValidate : (essai:boolean)=> void
  nextStep: () => void;
  WordCount : (str:string) => number
}

const AdventureWizard: FunctionComponent<Props> = ({admissionForm, validate, nextStep, setValidate, handleTextareaChange, WordCount}) => {
  
  const [adventure, setAdventure] = useState<Adventure> ({
    adventure: admissionForm.adventure
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
    let newForm: Adventure = adventure;

    if(!(WordCount(admissionForm.adventure.value)  >= 100 && WordCount(admissionForm.adventure.value)  <= 250)){
      const errorMsg : string = `Dis nous ton expérience d'apprentissage en 100 à 250 mots`;
      const newField : Field = { value : admissionForm.adventure.value, error : errorMsg, isValid : false};
      newForm = {...newForm, ...{adventure : newField}};
    } else {
      const newField : Field = { value : admissionForm.adventure.value, error : '', isValid : true};
      newForm = {...newForm, ...{adventure : newField}};
    }
    setAdventure(newForm);
    return newForm.adventure.isValid;
  }
  
  return (
    <div className="branch" id="Yes">
      <div className="step" data-state="De">
        <h3 className="main_question">
          <FontAwesomeIcon icon={faArrowRight} />
          Racontes-nous ton aventure
        </h3>
        <div className="form-group">
          <div className={`fl-wrap fl-wrap-textarea fl-is-required ${admissionForm.adventure.value !== "" && "fl-is-active"}`}>
            <textarea
              name="adventure"
              className="form-control required fl-textarea valid"
              rows={10}
              cols={100}
              placeholder="Racontes nous en quelques lignes les défis et les succès rencontrés"
              style={{height : 250 }}
              value={admissionForm.adventure.value}
              onChange={(e) => handleTextareaChange(e)}
            />
            {
              !adventure.adventure.isValid && (
                <>
                  {
                    adventure.adventure.value.trim() === "" ? (
                      <span className="error"> Obligatoire </span>
                    ) : (
                      <span className="error"> {adventure.adventure.error} </span>
                    )
                  }
                </>
              )
            }
            <label htmlFor="question_5" className="fl-label">
              Racontes nous en quelques lignes les défis et les succès
              rencontrés
            </label>
          </div>
          <p>
            Nombre de mots :<span id="show"> {WordCount(admissionForm.adventure.value)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default AdventureWizard;
