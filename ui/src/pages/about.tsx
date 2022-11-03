import {FunctionComponent} from "react"
import Layout from "./layout"
import AboutBanner from "../components/banner/about"
import AboutContent from "../components/about/about"
const AboutPage: FunctionComponent = () => {
  const openTab = (url: string) => {
    window.open(url);
  };

  return <Layout content={<AboutContent newTab={openTab}/>} banner={<AboutBanner />} color={"#fff"} loaderForm= {false} background={""} />
}

export default AboutPage