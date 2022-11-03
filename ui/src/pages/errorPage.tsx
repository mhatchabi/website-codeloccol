import { FunctionComponent } from "react"
import Layout from "./layout"
import ErrorContent from "../components/404/404"

const ErrorPage: FunctionComponent = () => {
  document.title = "Codeloccol | 404"
  return <Layout content={<ErrorContent />} banner={<></>} color={"#fff"} loaderForm={false} background={""} />
}

export default ErrorPage