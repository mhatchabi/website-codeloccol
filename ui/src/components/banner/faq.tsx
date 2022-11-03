import { FunctionComponent } from "react";
import banner from "./../../img/sub-header1.jpg"
import "./banner.css"
const FaqBanner: FunctionComponent = () => {
  return (
    <section className="parallax_window_in" style={{backgroundImage: `url(${banner})`, backgroundSize: "100% 100%", backgroundRepeat: "no-repeat", backgroundAttachment: "fixed"}}>
      <div id="sub_content_in">
        <h1>Codeloccol</h1>
        <p>Foire aux questions</p>
      </div>
    </section>
  );
};

export default FaqBanner;
