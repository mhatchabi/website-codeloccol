import { FunctionComponent } from "react"
import Layout from "./layout"
import GetAdmissions from "../components/getAdmission/admission"

const GetAdmissionPage: FunctionComponent = () => {
  return <Layout content={<GetAdmissions />} banner={<></>} color={"#fff"} background={""} loaderForm={false} />
}
export default GetAdmissionPage