import {FunctionComponent, useState} from "react"
import Layout from "./layout"
import AdmissionContent from "../components/admission/admission"
const AdmissionPage: FunctionComponent = () => {
  const [loaderForm, setLoaderForm] = useState<boolean>(false);
  return <Layout content={<AdmissionContent setLoaderForm= {setLoaderForm} />} banner={<></>} color={"#F5F6F8"} loaderForm= {loaderForm} background={""}/>
}

export default AdmissionPage