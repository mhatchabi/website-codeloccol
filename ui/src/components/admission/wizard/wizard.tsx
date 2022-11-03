import { FunctionComponent, ChangeEvent } from 'react'
import IdentityWizard from './identity'
import IsHandicapWizard from './isHandicap'
import HandicapWizard from './handicap'
import CodingWizard from './coding'
import IsLearnCodingWizard from './isLearnCoding'
import AdventureWizard from './adventure'
import WhyDoNotLearnCodingWizard from './whyDonotLearnCoding'
import LearnIsToPraticeWizard from './learnIsToPractice'
import LikeToAchieveWizard from './likeToAchieve'
import TechEnvironmentCountryWizard from './techEnvironmentCountry'
import SubmitWizard from './submitWizard'
import SuccessWizard from './succesWizard'

interface Props {
  step: number;
  admissionForm : Admission;
  setAdmissionForm : (admission : Admission)=> void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) =>void;
  validate : boolean
  setValidate : (essai:boolean)=> void;
  nextStep: () => void;
  setSubmit: (submit:boolean)=> void
  contract: boolean
  setContract: (contract: boolean) => void
  setLoaderForm: (loaderFoem: boolean)=> void
}

const Wizard: FunctionComponent<Props> = ({step, admissionForm, setAdmissionForm, handleInputChange, validate, setValidate, nextStep, setSubmit, contract, setContract, setLoaderForm}) => {

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    const newField: Field = { [fieldName]: { value: fieldValue, isValid: true} };
    setAdmissionForm({ ...admissionForm, ...newField });
  };

  function WordCount(str:string) { 
    return str.trim() !== "" ? str.trim().split(/['-_.|\s]+/).length : 0;
  }

  switch (step) {
    case 1:
      return <IdentityWizard setLoaderForm={setLoaderForm} admissionForm={admissionForm} handleInputChange={handleInputChange} validate={validate} setValidate={setValidate} nextStep= {nextStep} />
    case 2:
      return <IsHandicapWizard  admissionForm={admissionForm} validate={validate} setValidate={setValidate} nextStep= {nextStep} />
    case 3:
      return <HandicapWizard  admissionForm={admissionForm} handleInputChange={handleInputChange} validate={validate} setValidate={setValidate} nextStep= {nextStep} />
    case 4:
      return <CodingWizard  admissionForm={admissionForm} handleTextareaChange={handleTextareaChange} validate={validate} setValidate={setValidate} nextStep= {nextStep} WordCount={WordCount} />
    case 5:
      return <IsLearnCodingWizard  admissionForm={admissionForm} validate={validate} setValidate={setValidate} nextStep= {nextStep} />
    case 6:
      return <AdventureWizard  admissionForm={admissionForm} handleTextareaChange={handleTextareaChange} validate={validate} setValidate={setValidate} nextStep= {nextStep} WordCount={WordCount} />
    case 7:
      return <WhyDoNotLearnCodingWizard  admissionForm={admissionForm}  handleTextareaChange={handleTextareaChange} validate={validate} setValidate={setValidate} nextStep= {nextStep} WordCount={WordCount} />
    case 8:
      return <LearnIsToPraticeWizard  admissionForm={admissionForm} validate={validate} setValidate={setValidate} nextStep= {nextStep} handleTextareaChange={handleTextareaChange} WordCount={WordCount} />
    case 9:
      return <LikeToAchieveWizard  admissionForm={admissionForm} handleTextareaChange={handleTextareaChange} validate={validate} setValidate={setValidate} nextStep= {nextStep} WordCount={WordCount} />
    case 10:
      return <TechEnvironmentCountryWizard  admissionForm={admissionForm} handleTextareaChange={handleTextareaChange} validate={validate} setValidate={setValidate} nextStep= {nextStep} WordCount={WordCount} />
    case 11:
        return <SubmitWizard admissionForm={admissionForm} setAdmissionForm={setAdmissionForm} validate={validate} setValidate={setValidate} setSubmit={setSubmit} contract={contract} setContract={setContract} />
    case 121:
      return <SuccessWizard />
    default:
      return <IdentityWizard setLoaderForm={setLoaderForm} admissionForm={admissionForm} handleInputChange={handleInputChange} validate={validate} setValidate={setValidate} nextStep= {nextStep} />
  }
}
export default Wizard