import { FunctionComponent, useState, FormEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import Wizard from "./wizard/wizard";
import ActionWizard from "./wizard/actionWizard";
import AdmissionModal from "./admissionModal";
import AdmissionContractModal from "./admissionContractModal";
import { AdmissionService } from "../../services/AdmissonServices";
import adamissionPicture from "../../img//PNG/LOGO CODELOCCOL-05.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import "./admission.css";

interface Props {
  setLoaderForm: (bool: boolean) => void
}

const AdmissionContent: FunctionComponent<Props> = ({ setLoaderForm }) => {

  const [step, setStep] = useState<number>(1);
  const [start, setStart] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [contract, setContract] = useState<boolean>(false);
  const [validate, setValidate] = useState<boolean>(false);
  const [submit, setSubmit] = useState<boolean>(false);
  const [admissionForm, setAdmissionForm] = useState<Admission>({
    name: { value: "", isValid: true },
    mail: { value: "", isValid: true },
    country: { value: "", isValid: true },
    city: { value: "", isValid: true },
    mobile: { value: "", isValid: true },
    age: { value: "", isValid: true },
    gender: { value: "", isValid: true },
    isHandicap: { value: "", isValid: true },
    handicap: { value: "", isValid: true },
    coding: { value: "", isValid: true },
    isLearnCoding: { value: "", isValid: true },
    adventure: { value: "", isValid: true },
    whyDoNotLearnCoding: { value: "", isValid: true },
    learn: { value: "", isValid: true },
    likeToAchieve: { value: "", isValid: true },
    techEnvironment: { value: "", isValid: true },
    validate: { value: "", isValid: true }
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    const newField: Field = { [fieldName]: { value: fieldValue, isValid: true } };
    setAdmissionForm({ ...admissionForm, ...newField });
  };

  const nextStep = () => {
    if ((admissionForm.isHandicap.value === "false" && step === 2) || (admissionForm.isLearnCoding.value === "false" && step === 5) || (admissionForm.isLearnCoding.value === "true" && step === 6)) setStep(step + 2);
    else setStep(step + 1);
  };

  const prevStep = () => {
    setValidate(false)
    if ((admissionForm.isHandicap.value === "false" && step === 4) || (admissionForm.isLearnCoding.value === "false" && step === 7) || (admissionForm.isLearnCoding.value === "true" && step === 8)) setStep(step - 2);
    else setStep(step - 1);
  };
  const barWidth = {
    width: `${step * 9.10}%`,
  };

  const newObject = (object: any) => {
    let newObj: any = {}
    for (let obj in object) {
      if (obj !== "validate") {
        if (obj === "isHandicap" || obj === "isLearnCoding") newObj[obj] = object[obj].value === "true" ? true : false
        else newObj[obj] = object[obj].value;
      }
    }
    return newObj
  }


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    handlePrevent(e);
    setSubmit(false);
    const admission = newObject(admissionForm);
    const admissionService = new AdmissionService();
    setLoaderForm(true);
    admissionService.createAdmission(admission).then((response) => {
      if (response.type) {
        setStep(121);
      } else {
        const copy = admissionForm;
        for (let obj in response.exite) {
          if (response.exite[obj].mail === admission.mail) copy.mail = { error: `Ce mail ${admission.mail} existe deja dans notre liste d'admission`, value: "" };
          if (response.exite[obj].mobile == admission.mobile) copy.mobile = { error: `Ce numero ${admission.mobile} existe deja dans notre liste d'admission`, value: "" };
        }
        setAdmissionForm(copy);
        setStep(1);
      }
      setLoaderForm(false);
    });
  };
  const handlePrevent = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <>
      <div id="form_container">
        <div className="row admission w-100 mx-0">
          <div className="col-lg-6 px-0">
            <div id="left_form">
              <div>
                <figure>
                  <Link to="/">
                    <img src={adamissionPicture} alt="" width="350" height="248" />
                  </Link>
                </figure>
                <div className="p-4 text-center info">
                  <h2>
                    Bienvenue<span>Sur le formulaire qui vous permet de candidater</span>
                  </h2>
                  <p>
                    Le coding c'est ta passion ? Depuis un moment tu cherches un moyen de te perfectionner sans trop savoir comment ? Tu es au bon endroit.
                  </p>
                  <p>
                    Remplis le formulaire ci-après, vérifies tes emails et soit prêt pour l'aventure.                  
                  </p>
                </div>
                <Link
                  to="/"
                  className="btn_1 rounded yellow purchase"
                >
                  Codeloccol.org
                </Link>
                <Link
                  to="#!"
                  className="btn_1 rounded mobile_btn yellow"
                  onClick={() => !start && setStart(!start)}
                >
                  Commence ici !
                </Link>
              </div>
              <Link
                to="#0"
                id="more_info"
                data-toggle="modal"
                data-target="#more-info"
                onClick={() => setModal(true)}
              >
                <FontAwesomeIcon icon={faInfoCircle} />
              </Link>
            </div>
          </div>
          <div className={`col-lg-6 px-0 ${start ? "" : "d-none d-sm-block"}`}>
            <div id="wizard_container">
              <div id={`${step !== 121 && "top-wizard"}`} className={`${step === 121 && "d-none"}`}>
                <div
                  id="progressbar"
                  className="ui-progressbar ui-widget ui-widget-content ui-corner-all"
                  role="progressbar"
                >
                  <div
                    className="ui-progressbar-value ui-widget-header ui-corner-left"
                    style={barWidth}
                  />
                </div>
                <span id="location">
                  {/* {step} sur 11 */}
                </span>
              </div>
              <div id="wizard_content">
                <form
                  id="wrapped"
                  onSubmit={(e) => { submit ? handleSubmit(e) : handlePrevent(e); }}
                  className="fl-form fl-style-1 wizard-form"
                >
                  <input id="website" name="website" type="text" value="" />
                  <div id="middle-wizard">
                    <Wizard
                      step={step}
                      admissionForm={admissionForm}
                      setAdmissionForm={setAdmissionForm}
                      handleInputChange={handleInputChange}
                      validate={validate}
                      setValidate={setValidate}
                      nextStep={nextStep}
                      setSubmit={setSubmit}
                      contract={contract}
                      setContract={setContract}
                      setLoaderForm={setLoaderForm}
                    />
                  </div>
                  {
                    step !== 121 && (
                      <ActionWizard
                        prevStep={prevStep}
                        step={step}
                        submit={submit}
                        setValidate={setValidate}
                      />
                    )
                  }
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdmissionModal modal={modal} setModal={setModal} />
      {
        step === 11 && <AdmissionContractModal contract={contract} setContract={setContract} />
      }
    </>
  );
};
export default AdmissionContent;
