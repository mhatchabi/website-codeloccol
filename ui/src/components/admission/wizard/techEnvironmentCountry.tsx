import { FunctionComponent, ChangeEvent, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface Props {
  admissionForm : Admission
  handleTextareaChange: (e: ChangeEvent<HTMLTextAreaElement>) =>void
  validate : boolean
  setValidate : (essai:boolean)=> void
  nextStep: () => void;
  WordCount: (str:string) => number
}

const TechEnvironmentCountryWizard: FunctionComponent<Props> = ({admissionForm, validate, nextStep, setValidate, handleTextareaChange, WordCount}) => {
  
  const [techEnvironment, setTechEnvironment] = useState<TechEnvironment> ({
    techEnvironment: admissionForm.techEnvironment
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
    let newForm: TechEnvironment = techEnvironment;

    if(!(WordCount(admissionForm.techEnvironment.value)  >= 100 && WordCount(admissionForm.techEnvironment.value)  <= 250)){
      const errorMsg : string = `N'oublies pas de nous en dire plus sur l'environnement tech de ton pays`;
      const newField : Field = { value : admissionForm.techEnvironment.value, error : errorMsg, isValid : false};
      newForm = {...newForm, ...{techEnvironment : newField}};
    } else {
      const newField : Field = { value : admissionForm.techEnvironment.value, error : '', isValid : true};
      newForm = {...newForm, ...{techEnvironment : newField}};
    }
    setTechEnvironment(newForm);
    return newForm.techEnvironment.isValid;
  }
  
  return (
    <div className="step">
      <h3 className="main_question">
        <FontAwesomeIcon icon={faArrowRight} />
        ...et voilà c'est tout comme questions. C'était intéressant n'est-ce pas
        !!! OK OK, dernière question, que penses-tu de l'environnement Tech de
        ton Pays ?
      </h3>
      <div className="form-group">
        <div className={`fl-wrap fl-wrap-textarea fl-is-required ${admissionForm.techEnvironment.value !== "" && "fl-is-active"}`}>
          <label htmlFor="question_9" className="fl-label">
            Partages tes impressions en quelques lignes
          </label>
          <textarea
            name="techEnvironment"
            className="form-control required fl-textarea"
            rows={10}
            style={{height : 250 }}
            placeholder="Partages tes impressions en quelques lignes"
            value={admissionForm.techEnvironment.value}
            onChange={(e) => handleTextareaChange(e)}
          />
          {
            !techEnvironment.techEnvironment.isValid && (
              <>
                {
                  techEnvironment.techEnvironment.value.trim() === "" ? (
                    <span className="error"> Obligatoire </span>
                  ) : (
                    <span className="error"> {techEnvironment.techEnvironment.error} </span>
                  )
                }
              </>
            )
          }
        </div>
        <p>
            Nombre de mots :<span id="show"> {WordCount(admissionForm.techEnvironment.value)}</span>
          </p>
      </div>
    </div>
  );
};
export default TechEnvironmentCountryWizard;
