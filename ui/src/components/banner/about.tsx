import { FunctionComponent } from "react";
import banner from "./../../img/sub-header.jpg"
import "./banner.css"

const AboutBanner: FunctionComponent = () => {
  return (
    <section className="parallax_window_in" style={{backgroundImage: `url(${banner})`, backgroundSize: "100% 100%", backgroundRepeat: "no-repeat", backgroundAttachment:"fixed"}}>
      <div id="sub_content_in">
        <h1>Guide du candidat Codeloccol</h1>
        <p>
          Vous êtes curieux, discipliné, ambitieux, passionné par le coding et
          vous avez le sens de l'humour alors candidater vous serez chez nous,
          chez vous
        </p>
      </div>
    </section>
  );
};

export default AboutBanner;
