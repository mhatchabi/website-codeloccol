import {FunctionComponent, useState} from "react"
import Layout from "./layout"
import ContactBanner from "../components/banner/contact"
import ContactContent from "../components/contact/contact"

const ContactPage: FunctionComponent = () => {
  const [loaderForm, setLoaderForm]= useState<boolean>(false);
  return <Layout content={<ContactContent setLoaderForm={setLoaderForm} />} banner = {<ContactBanner />} color={"#fff"} background={""} loaderForm= {false}/>
}

export default ContactPage