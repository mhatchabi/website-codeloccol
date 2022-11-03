import {
  FunctionComponent,
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
} from "react";
import { AdmissionService } from "../../services/AdmissonServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./contact.css";

interface Props {
  setLoaderForm:(bool: boolean) => void
}

const ContactContent: FunctionComponent<Props> = ({setLoaderForm}) => {
  const [show, setShow] = useState(false);
  const [response, setResponse] = useState(false);
  const [form, setForm] = useState<Contact>({
    firstName: { value: "", isValid: true },
    lastName: { value: "", isValid: true },
    mail: { value: "", isValid: true },
    mobile: { value: "", isValid: true },
    message: { value: "", isValid: true },
    checkMachine: { value: "", isValid: true },
    calcul: {
      first: Math.floor(Math.random() * 100),
      last: Math.floor(Math.random() * 100),
    },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    const newField: Field = {
      [fieldName]: { value: fieldValue, isValid: true },
    };
    setForm({ ...form, ...newField });
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    const newField: Field = {
      [fieldName]: { value: fieldValue, isValid: true },
    };
    setForm({ ...form, ...newField });
  };

  function WordCount(str: string) {
    return str.trim() !== "" ? str.trim().split(/['-_.|\s]+/).length : 0;
  }

  const validateForm = () => {
    let newForm: Contact = form;

    if (!/^[a-zA-Zéèê\s]{3}/.test(form.firstName.value)) {
      const errorMsg: string = `Vous devez saisir au moins 3 caractères`;
      const newField: Field = {
        value: form.firstName.value,
        error: errorMsg,
        isValid: false,
      };
      newForm = { ...newForm, ...{ firstName: newField } };
    } else {
      const newField: Field = {
        value: form.firstName.value,
        error: "",
        isValid: true,
      };
      newForm = { ...newForm, ...{ firstName: newField } };
    }

    if (!/^[a-zA-Zéèê\s]{3}/.test(form.lastName.value)) {
      const errorMsg: string = `Vous devez saisir au moins 3 caractères`;
      const newField: Field = {
        value: form.lastName.value,
        error: errorMsg,
        isValid: false,
      };
      newForm = { ...newForm, ...{ lastName: newField } };
    } else {
      const newField: Field = {
        value: form.lastName.value,
        error: "",
        isValid: true,
      };
      newForm = { ...newForm, ...{ lastName: newField } };
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(form.mail.value)) {
      const errorMsg: string = `Vous devez saisir une adresse mail correct`;
      const newField: Field = {
        value: form.mail.value,
        error: errorMsg,
        isValid: false,
      };
      newForm = { ...newForm, ...{ mail: newField } };
    } else {
      const newField: Field = {
        value: form.mail.value,
        error: "",
        isValid: true,
      };
      newForm = { ...newForm, ...{ mail: newField } };
    }

    if (!/^[\d\s+]{8,12}/.test(form.mobile.value)) {
      const errorMsg: string = `Vous devez saisir au moins 8 chiffres`;
      const newField: Field = {
        value: form.mobile.value,
        error: errorMsg,
        isValid: false,
      };
      newForm = { ...newForm, ...{ mobile: newField } };
    } else {
      const newField: Field = {
        value: form.mobile.value,
        error: "",
        isValid: true,
      };
      newForm = { ...newForm, ...{ mobile: newField } };
    }

    if (!(WordCount(form.message.value) >= 5)) {
      const errorMsg: string = `Vous devez saisir au moins 5 mots`;
      const newField: Field = {
        value: form.message.value,
        error: errorMsg,
        isValid: false,
      };
      newForm = { ...newForm, ...{ message: newField } };
    } else {
      const newField: Field = {
        value: form.message.value,
        error: "",
        isValid: true,
      };
      newForm = { ...newForm, ...{ message: newField } };
    }

    if (
      !(
        /^[\d\s]{2,3}/.test(form.checkMachine.value) &&
        form.checkMachine.value == form.calcul.first + form.calcul.last
      )
    ) {
      const errorMsg: string = `Le resultat de ce calcul doit etre en chiffre`;
      const newField: Field = {
        value: form.checkMachine.value,
        error: errorMsg,
        isValid: false,
      };
      newForm = { ...newForm, ...{ checkMachine: newField } };
    } else {
      const newField: Field = {
        value: form.checkMachine.value,
        error: "",
        isValid: true,
      };

      newForm = { ...newForm, ...{ checkMachine: newField } };
    }

    setForm(newForm);
    return (
      newForm.firstName.isValid &&
      newForm.lastName.isValid &&
      newForm.mail.isValid &&
      newForm.message.isValid &&
      newForm.mobile.isValid &&
      newForm.checkMachine.isValid
    );
  };

  const newObject = (object: any) => {
    let newObj: any = {};
    for (let obj in object) {
      if (obj !== "checkMachine") {
        if (obj !== "calcul") newObj[obj] = object[obj].value;
      }
    }
    return newObj;
  };

  useEffect(()=> {
    if(show && response){
      setTimeout(() => {
        setShow(false);
        setResponse(false)
      }, 5000)
    }
  }, [show, response]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const validate = validateForm();
    if (validate) {
      setLoaderForm(true);
      const admissionService = new AdmissionService();
      const contact = newObject(form);
      admissionService.sendMail(contact).then((response) => {
        if (response.hasOwnProperty("type")) {
          setShow(true);
          setResponse(response.type);
          if (response.type) {
            setForm({
              firstName: { value: "", isValid: true },
              lastName: { value: "", isValid: true },
              mail: { value: "", isValid: true },
              mobile: { value: "", isValid: true },
              message: { value: "", isValid: true },
              checkMachine: { value: "", isValid: true },
              calcul: {
                first: Math.floor(Math.random() * 100),
                last: Math.floor(Math.random() * 100),
              },
            });
          }
        }
      });
      setLoaderForm(false);
    }
  };

  return (
    <div className="row">
      <div className={`toast ${show ? "active" : ""}`}>
        <div className="toast-content">
          {response ? (
            <FontAwesomeIcon icon={faCheckCircle} />
          ) : (
            <FontAwesomeIcon icon={faInfoCircle} />
          )}
          <div className="message">
            <span className="text text-1">
              {response ? <> Félicitation </> : <> Echec </>}
            </span>
            <span className="text text-2">
              {response ? (
                <> Votre message est envoyé avec success </>
              ) : (
                <> L'envoi de votre message à echoué</>
              )}
            </span>
          </div>
        </div>
        <i className="fa-solid fa-xmark close" />
        <div className={`progress ${show ?"active" : ""}`} />
      </div>
      <div className="col-lg-8">
        <h3>Contactez-nous</h3>
        <p>Nous serons heureux de repondre à vos questions.</p>
        <div>
          <div id="message-contact" />
          <form
            id="contactform"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className="fl-form fl-style-1"
          >
            <div className="row">
              <div className="col-md-6 col-sm-6">
                <div className="form-group">
                  <div
                    className={`fl-wrap fl-wrap-input fl-is-required ${
                      form.firstName.value !== "" && "fl-is-active"
                    }`}
                  >
                    <input
                      type="text"
                      className="form-control fl-input"
                      id="name_contact"
                      name="firstName"
                      placeholder="Prénom"
                      value={form.firstName.value}
                      onChange={(e) => handleInputChange(e)}
                    />
                    {!form.firstName.isValid && (
                      <>
                        {form.firstName.value.trim() === "" ? (
                          <span className="error"> Obligatoire </span>
                        ) : (
                          <span className="error">
                            {" "}
                            {form.firstName.error}{" "}
                          </span>
                        )}
                      </>
                    )}
                    <label htmlFor="name_contact" className="fl-label">
                      Prénom
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div className="form-group">
                  <div
                    className={`fl-wrap fl-wrap-input fl-is-required ${
                      form.lastName.value !== "" && "fl-is-active"
                    }`}
                  >
                    <input
                      type="text"
                      className="form-control fl-input"
                      id="lastname_contact"
                      name="lastName"
                      placeholder="Nom"
                      value={form.lastName.value}
                      onChange={(e) => handleInputChange(e)}
                    />
                    {!form.lastName.isValid && (
                      <>
                        {form.lastName.value.trim() === "" ? (
                          <span className="error"> Obligatoire </span>
                        ) : (
                          <span className="error"> {form.lastName.error} </span>
                        )}
                      </>
                    )}
                    <label htmlFor="lastname_contact" className="fl-label">
                      Nom
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-sm-6">
                <div className="form-group">
                  <div
                    className={`fl-wrap fl-wrap-input fl-is-required ${
                      form.mail.value !== "" && "fl-is-active"
                    }`}
                  >
                    <input
                      type="email"
                      id="email_contact"
                      name="mail"
                      className="form-control fl-input"
                      placeholder="Email"
                      value={form.mail.value}
                      onChange={(e) => handleInputChange(e)}
                    />
                    {!form.mail.isValid && (
                      <>
                        {form.mail.value.trim() === "" ? (
                          <span className="error"> Obligatoire </span>
                        ) : (
                          <span className="error"> {form.mail.error} </span>
                        )}
                      </>
                    )}
                    <label htmlFor="email_contact" className="fl-label">
                      Email
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div className="form-group">
                  <div
                    className={`fl-wrap fl-wrap-input fl-is-required ${
                      form.mobile.value !== "" && "fl-is-active"
                    }`}
                  >
                    <input
                      type="text"
                      id="phone_contact"
                      name="mobile"
                      className="form-control fl-input"
                      placeholder="Numéro Whatsapp"
                      value={form.mobile.value}
                      onChange={(e) => handleInputChange(e)}
                    />
                    {!form.mobile.isValid && (
                      <>
                        {form.mobile.value.trim() === "" ? (
                          <span className="error"> Obligatoire </span>
                        ) : (
                          <span className="error"> {form.mobile.error} </span>
                        )}
                      </>
                    )}
                    <label htmlFor="phone_contact" className="fl-label">
                      Numéro Whatsapp
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <div
                    className={`fl-wrap fl-wrap-textarea fl-is-required ${
                      form.message.value !== "" && "fl-is-active"
                    }`}
                  >
                    <textarea
                      rows={5}
                      name="message"
                      className="form-control fl-textarea"
                      style={{ height: 330 }}
                      placeholder="Votre message"
                      value={form.message.value}
                      onChange={(e) => handleTextAreaChange(e)}
                    />
                    {!form.message.isValid && (
                      <>
                        {form.message.value.trim() === "" ? (
                          <span className="error"> Obligatoire </span>
                        ) : (
                          <span className="error"> {form.message.error} </span>
                        )}
                      </>
                    )}
                    <label htmlFor="message_contact" className="fl-label">
                      Votre message
                    </label>
                  </div>
                  <p className="pt-1">
                    Nombre de mots :
                    <span id="show"> {WordCount(form.message.value)}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <div
                    className={`fl-wrap fl-wrap-input fl-is-required ${
                      form.checkMachine.value !== "" && "fl-is-active"
                    }`}
                  >
                    <input
                      type="text"
                      name="checkMachine"
                      className="form-control fl-input"
                      placeholder={`Combien font ${form.calcul.last} + ${form.calcul.first} ?`}
                      value={form.checkMachine.value}
                      onChange={(e) => handleInputChange(e)}
                    />
                    {!form.checkMachine.isValid && (
                      <>
                        {form.checkMachine.value.trim() === "" ? (
                          <span className="error"> Obligatoire </span>
                        ) : (
                          <span className="error">
                            {" "}
                            {form.checkMachine.error}{" "}
                          </span>
                        )}
                      </>
                    )}
                    <label htmlFor="verify_contact" className="fl-label">
                      {`Combien font ${form.calcul.last} + ${form.calcul.first} ?`}
                    </label>
                  </div>
                </div>
                <p>
                  <input
                    type="submit"
                    value="Submit"
                    className="btn_1 add_bottom_15"
                    id="submit-contact"
                  />
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* End col lg 9 */}
      <aside className="col-lg-4">
        <div className="box_style_2">
          <h4>Contacts info</h4>
          <p>
            Cité de l'innovation, Sadoré, Niamey, Niger
            <br /> + 227 97 734545
            <br />
            <Link to="#">contact@codeloccol.org</Link>
          </p>
          <h5>Obtenir un itinéraire</h5>
          <form
            action="http://maps.google.com/maps"
            method="get"
            target="_blank"
          >
            <div className="form-group">
              <input
                type="text"
                name="saddr"
                placeholder="Entrez votre localisation"
                className="form-control"
                style={{ background: "none" }}
              />
              <input type="hidden" name="daddr" value="Codeloccol" />
              {/* Write here your end point */}
            </div>
            <input
              type="submit"
              value="Obtenir un itinéraire"
              className="btn_1 add_bottom_15"
            />
          </form>
          <hr className="styled" />
          <h4>Departement</h4>
          <ul className="contacts_info">
            <li>
              Administration
              <br />
              <a href="tel://0022797734545">00227 97 734545</a>
              <br />
              <a href="tel://003823932342">contact@codeloccol.org</a>
              <br />
              <small>Du Lundi au Samedi 9h - 17h</small>
            </li>
            <li>
              Fablab
              <br />
              <a href="tel://0022797734545">00227 97 734545</a>
              <br />
              <a href="tel://003823932342">contact@codeloccol.org</a>
              <br />
              <small>Du Lundi au Samedi 9h - 17h</small>
            </li>
            <li>
              Agriculture Numérique
              <br />
              <a href="tel://0022797734545">00227 97 734545</a>
              <br />
              <a href="tel://003823932342">contact@codeloccol.org</a>
              <br />
              <small>Du Lundi au Samedi 9h - 17h</small>
            </li>
          </ul>
        </div>
      </aside>
      {/*End aside */}
    </div>
  );
};
export default ContactContent;
