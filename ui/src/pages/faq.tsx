import { FunctionComponent } from "react"
import Layout from "./layout"
import FaqBanner from "../components/banner/faq"
import FaqContent from "../components/faq/faq"

const FaqPage: FunctionComponent = () => {
  return <Layout content={<FaqContent />} banner={<FaqBanner />} color={"#fff"} background={""} loaderForm={false} />
}

export default FaqPage