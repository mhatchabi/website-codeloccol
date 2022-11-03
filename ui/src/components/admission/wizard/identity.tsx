import { FunctionComponent, ChangeEvent, useState, useEffect } from "react";
import { AdmissionService } from "../../../services/AdmissonServices";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"

interface Props {
  admissionForm : Admission
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) =>void
  validate : boolean
  setValidate : (validate:boolean)=> void
  nextStep: () => void;
  setLoaderForm: (loaderForm: boolean)=> void
}

interface Cites {
  country : string, 
  cities : string[]
}

interface Indicator {
  country : string;
  indicator : string
}

const IdentityWizard: FunctionComponent<Props> = ({admissionForm, handleInputChange, validate, nextStep, setValidate, setLoaderForm}) => {
  const [identity, setIdentity] = useState<Identity> ({
    name: admissionForm.name,
    mail: admissionForm.mail,
    country: admissionForm.country,
    city: admissionForm.city,
    mobile: admissionForm.mobile,
    age: admissionForm.age,
    gender: admissionForm.gender
  });
  const [after, setAfter] = useState<boolean>(false);
  const [gender, setGender] = useState<string>(admissionForm.gender.value);
  const [countryCities, setCountryCities] = useState<Cites[]>([]);
  const [country, setCountry] = useState<string []>([]);
  const [indicator, setIncator] = useState<Indicator[]>([]);
  const [dial, setDial] = useState<string>("");
  const [city, setCity] = useState<string []>([]);
  useEffect(()=>{
    fetch("https://countriesnow.space/api/v0.1/countries")
    .then(data => data.json())
    .then(datas => {
      let allCountries : string[] = [];
      let allCountiesCities : Cites[] = [];
      if(datas.data) {
        datas.data.map((cc: { country: string; cities : string[]}) => {
          allCountries = [...allCountries, cc.country]
          allCountiesCities = [... allCountiesCities, {cities : cc.cities, country : cc.country}]
        })
        setCountryCities(allCountiesCities);
        setCountry(allCountries);
      }
    })

    fetch("https://countriesnow.space/api/v0.1/countries/codes")
    .then(data => data.json())
    .then(datas => {
      let allCountries : Indicator[] = [];
      if(datas.data) {
        datas.data.map((cc: { name: string; dial_code : string}) => allCountries = [...allCountries, {country : cc.name, indicator: cc.dial_code}])
        setIncator(allCountries);
      }
    })
  },[]);

  const allCity = (pays : string) => {
    const trueCountry = country.filter(c => c === pays);
    admissionForm.city.value = ""
    setDial("")
    if(trueCountry.length > 0) {
      const allCites = countryCities.filter(cc => cc.country === trueCountry[0]);
      setCity(allCites[0].cities);
      const dial = indicator.filter(cc => cc.country === trueCountry[0]);
      setDial(dial[0].indicator)
    } else setCity([]);
  }
  
  useEffect (()=>{
    if(validate) {
      const validateF = validateForm();
      if(validateF) {
        const copy = identity;
        if(copy.mail.isValid && copy.mobile.isValid && validate) {
          const admissionService = new AdmissionService();
          const admission = {
            mail: admissionForm.mail.value,
            mobile: admissionForm.mobile.value
          }
          setLoaderForm(true);
          admissionService.existeAdmission(admission).then(response => {
            if(response.type){
              for(let obj in response.existe) {
                if(response.existe[obj].mail === admission.mail) {
                  copy.mail = { error :`Ce mail ${admission.mail} existe deja dans notre liste d'admission`, value:"", isValid: false};
                  admissionForm.mail.value = '';
                }

                if(response.existe[obj].mobile === +admission.mobile) {
                  copy.mobile = {error: `Ce numero ${admission.mobile} existe deja dans notre liste d'admission`, value:"", isValid: false};
                  admissionForm.mobile.value = '';
                }
              }
              setIdentity(copy);
            } else {
              nextStep();
            }
            setLoaderForm(false);
          });
        }
      };
      setAfter(true)
    }
    if(after) validateForm();
    setValidate(false);
    admissionForm.gender.value = gender;
  }, [ validate, after, admissionForm ]);

  const validateForm = () => {
    let newForm: Identity = identity;

    if(!/^[a-zA-Zéèê\s]{3}/.test(admissionForm.name.value)){
      const errorMsg : string = `Tu dois saisir tes nom et prénom`;
      const newField : Field = { value : admissionForm.name.value, error : errorMsg, isValid : false};
      newForm = {...newForm, ...{name : newField}};
    } else {
      const newField : Field = { value : admissionForm.name.value, error : '', isValid : true};
      newForm = {...newForm, ...{name : newField}};
    }

    if(!/^[\w.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(admissionForm.mail.value)){
      const errorMsg : string = `Tu dois saisir une adresse mail correct`;
      const newField : Field = { value : admissionForm.mail.value, error : errorMsg, isValid : false};
      newForm = {...newForm, ...{mail : newField}};
    } else {
      const newField : Field = { value : admissionForm.mail.value, error : '', isValid : true};
      newForm = {...newForm, ...{mail : newField}};
    }

    if(country.indexOf(admissionForm.country.value) === -1){
      const errorMsg : string = `Indiques ton pays de résidence`;
      const newField : Field = { value : admissionForm.country.value, error : errorMsg, isValid : false};
      newForm = {...newForm, ...{country : newField}};
    } else {
      const newField : Field = { value : admissionForm.country.value, error : '', isValid : true};
      newForm = {...newForm, ...{country : newField}};
    }

    if(city.indexOf(admissionForm.city.value) === -1){
      const errorMsg : string = `Indiques ta ville de résidence`;
      const newField : Field = { value : admissionForm.city.value, error : errorMsg, isValid : false};
      newForm = {...newForm, ...{city : newField}};
    } else {
      const newField : Field = { value : admissionForm.city.value, error : '', isValid : true};
      newForm = {...newForm, ...{city : newField}};
    }

    if(!/^[\d\s+]{8,12}/.test(admissionForm.mobile.value)){
      const errorMsg : string = `Tu dois saisir un numéro de téléphone correct`;
      const newField : Field = { value : admissionForm.mobile.value, error : errorMsg, isValid : false};
      newForm = {...newForm, ...{mobile : newField}};
    } else {
      const newField : Field = { value : admissionForm.mobile.value, error : '', isValid : true};
      newForm = {...newForm, ...{mobile : newField}};
    }

    if(!/^[\d\s]{2}/.test(admissionForm.age.value)){
      const errorMsg : string = `Tu dois avoir au moins 18`;
      const newField : Field = { value : admissionForm.age.value, error : errorMsg, isValid : false};
      newForm = {...newForm, ...{age : newField}};
    } else {
      const newField : Field = { value : admissionForm.age.value, error : '', isValid : true};
      
      newForm = {...newForm, ...{age : newField}};
    }

    if(!/^[a-zA-Zéèê\s]{3}/.test(admissionForm.gender.value)){
      const errorMsg : string = `Indiques ton genre ici`;
      const newField : Field = { value : admissionForm.gender.value, error : errorMsg, isValid : false};
      newForm = {...newForm, ...{gender : newField}};
    } else {
      const newField : Field = { value : admissionForm.gender.value, error : '', isValid : true};
      newForm = {...newForm, ...{gender : newField}};
    }

    setIdentity(newForm);
    return (newForm.name.isValid && newForm.mail.isValid && newForm.country.isValid && newForm.city.isValid && newForm.mobile.isValid && newForm.age.isValid && newForm.gender.isValid);
  }

  
  return (
    <div className="step">
      <h3 className="main_question">
        <FontAwesomeIcon icon={ faArrowRight } />
        Salut jeune padawan ! 
        Dis nous qui tu es ? 
      </h3>
      <div className="form-group add_top_30">
        <label>Nom et Prénom</label>
        <input
          type="text"
          name="name"
          value={admissionForm.name.value}
          onChange={(e) => handleInputChange(e)}
          className="form-control required"
        />
        {
          !identity.name.isValid && (
            <>
              {
                identity.name.value.trim() === "" ? (
                  <span className="error"> Ce champs est obligatoire </span>
                ) : (
                  <span className="error"> {identity.name.error} </span>
                )
              }
            </>
          )
        }
      </div>
      <div className="form-group">
        <label>Courriel</label>
        <input
          type="email"
          name="mail"
          className="form-control required"
          value={admissionForm.mail.value}
          onChange={(e) => handleInputChange(e)}
        />
        {
          !identity.mail.isValid && (
            <>
              {
                identity.mail.value.trim() === "" && !identity.mail.error?.includes("existe") ? (
                  <span className="error"> Ce champs est obligatoire </span>
                ) : (
                  <span className="error"> {identity.mail.error} </span>
                )
              }
            </>
          )
        }
      </div>
      <div className="form-group">
        <label>Pays</label>
        <input
          name="country"
          className="countrypicker form-control required"
          onChange={(e) => {
            handleInputChange(e);
            allCity(e.target.value);
          }}
          value={admissionForm.country.value}
          list="country"
        />
        <datalist id="country">
          {
            country.map(c => <option value={c}></option>)
          }
        </datalist>
        {
          !identity.country.isValid && (
            <>
              {
                identity.country.value.trim() === "" ? (
                  <span className="error"> Ce champs est obligatoire </span>
                ) : (
                  <span className="error"> {identity.country.error} </span>
                )
              }
            </>
          )
        }
      </div>
      <div className="form-group">
        <label>Ville</label>
        <input
          type="text"
          name="city"
          value={admissionForm.city.value}
          onChange={(e) => {
            handleInputChange(e);
          }}
          className="form-control required"
          list="city"
        />
        <datalist id="city">
          {
            city.map(c => <option value={c}></option>)
          }
        </datalist>
        {
          !identity.city.isValid && (
            <>
              {
                identity.city.value.trim() === "" ? (
                  <span className="error"> Ce champs est obligatoire </span>
                ) : (
                  <span className="error"> {identity.city.error} </span>
                )
              }
            </>
          )
        }
      </div>
      <div className="form-group">
        <label>Mobile (whatsapp)</label>
        <div className="input-group">
          <span className={`input-group-text dial ${dial.length === 0 ? "d-none" : ""}`}>{dial}</span>
          <input
            type="text"
            name="mobile"
            value={admissionForm.mobile.value}
            onChange={(e) => handleInputChange(e)}
            className="form-control required"
          />
        </div>
        {
          !identity.mobile.isValid && (
            <>
              {
                identity.mobile.value.trim() === ""  && !identity.mobile.error?.includes("existe") ? (
                  <span className="error"> Ce champs est obligatoire </span>
                ) : (
                  <span className="error"> {identity.mobile.error} </span>
                )
              }
            </>
          )
        }
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-3 col-sm-3 col-4">
          <label>Age</label>
          <div className="form-group radio_input">
            <input
              type="text"
              name="age"
              className="form-control required"
              value={admissionForm.age.value}
              onChange={(e) => handleInputChange(e)}
            />
            {
              !identity.age.isValid && (
                <>
                  {
                    identity.age.value.trim() === "" ? (
                      <span className="error"> Obligatoire </span>
                    ) : (
                      <span className="error"> {identity.age.error} </span>
                    )
                  }
                </>
              )
            }
          </div>
        </div>
        <div className="col-lg-5 col-md-5 col-sm-6 col-8">
          <label>Genre</label>
          <div className="form-group radio_input">
            {
              !identity.gender.isValid && (
                <>
                  {
                    identity.gender.value.trim() === "" ? (
                      <span className="error"> Obligatoire </span>
                    ) : (
                      <span className="error"> {identity.gender.error} </span>
                    )
                  }
                </>
              )
            }
            <label className="container_radio me-3">
              Homme
              <input
                type="radio"
                name="gender"
                className="required"
                onChange={() => { setGender("Homme") }}
                checked={gender === "Homme"}
              />
              <span className="checkmark" />
            </label>
            <label className="container_radio">
              Femme
              <input
                type="radio"
                name="gender"
                className="required"
                onChange={() => setGender("Femme")}
                checked={gender === "Femme"}
              />
              <span className="checkmark" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
export default IdentityWizard;
