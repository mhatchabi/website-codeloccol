import { FunctionComponent, useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Props {
  admissionForm : Admission;
  setAdmissionForm : (admission : Admission)=> void;
  validate : boolean;
  setValidate : (essai:boolean)=> void;
  setSubmit: (submit:boolean)=> void;
  contract: boolean
  setContract: (contract : boolean) => void
}

const SubmitWizard: FunctionComponent<Props> = ({ admissionForm, setSubmit, validate, setValidate, setAdmissionForm, contract, setContract }) => {
  const [authorised, setAuthorised] = useState<boolean>(admissionForm.validate.value);

  const [after, setAfter] = useState<boolean>(false);
  useEffect (()=>{
    admissionForm.validate.value = authorised;
    if(authorised) {
      setValidate(false);
      const validateF = validateForm();
      if(validateF) setSubmit(true);
      setAfter(true);
    } else {
      setSubmit(false);
    }
    if(validate) {
      validateForm();
    }
    const copy: Admission = admissionForm;
    setAdmissionForm(copy);
  }, [admissionForm, authorised, after, validate]);

  const validateForm = () => {
    return authorised;
  }


  return (
    <div className="submit step" id="end">
      <div className="summary">
        <div className="wrapper">
          <h3>
            Nous vous remercions pour votre candidature
            <br />
            <span id="name_field">{admissionForm.name.value} ! </span>
          </h3>
          <p>
            Nous vous contacterons très bientot à ce courriel <strong id="email_field">{admissionForm.mail.value}</strong> pour la suite de la démarche.
          </p>
        </div>
        <div className="text-center">
          <div className="form-group terms">
            {
              validate && <span className="error"> Tu devras accepter les termes conditions </span>
            }
            <label className="container_check">
              <Link to="#" data-toggle="modal" data-target="#terms-txt" onClick={() => setContract(!contract)} className="pe-1">
                Termes et conditions 
              </Link>
              avant de soumettre
              <input
                type="checkbox"
                name="validate"
                defaultValue="Yes"
                className="required"
                checked={authorised}
                onChange={() => { setAuthorised(!authorised) }}
              />
              <span className="checkmark" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SubmitWizard;
