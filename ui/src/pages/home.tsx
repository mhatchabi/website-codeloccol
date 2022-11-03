import { FunctionComponent } from "react"
import HomeContent from "../components/accueil/homeContent"
import HomeBanner from "../components/banner/home"
import Layout from "./layout"
const HomePage : FunctionComponent = ()=>{
  return <Layout content={<HomeContent/>} banner={<HomeBanner />} color={"#fff"} loaderForm= {false} background={"#fff"}/>
}
export default HomePage