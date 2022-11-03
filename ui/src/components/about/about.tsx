import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import ansi from "./../../img/logo-ansi-colored.png";
import cipmen from "./../../img/logo-CIPMEN.png";
import adu from "./../../img/logo-ADU.png";
import learn from "./../../img/clipart1229189.png";
import peer from "./../../img/clipart3460871.png";
import mentoring from "./../../img/clipart1118920.png";
import cursus from '../../img/road.jpg'
import "./about.css";

interface Props {
  newTab: (tab: string) => void;
}

const AboutContent: FunctionComponent<Props> = ({ newTab }) => {
  return (
    <>
      <div className="main_title_2">
        <span>
          <em />
        </span>
        <h2>Fondateurs</h2>
        <p>
          Codeloccol est le fruit d'un partenariat innovant entre trois
          organisation
        </p>
      </div>
      <div className="row">
        <div className="col-sm-4">
          <Link
            to=""
            className="box_topic"
            onClick={() => {
              newTab("https://ansi.ne/");
            }}
          >
            <span>
              <img src={ansi} width={70} height={70} alt="" />
            </span>
            <h3>ANSI</h3>
            <p>Agence National pour la société de l'information</p>
            <p />
          </Link>
        </div>
        <div className="col-sm-4">
          <Link
            to=""
            className="box_topic"
            onClick={() => {
              newTab("https://www.cipmen.org/");
            }}
          >
            <span>
              <img src={cipmen} width={70} height={70} alt="" />
            </span>
            <h3>CIPMEN</h3>
            <p>Centre Incubateur des Petites et Moyennes Entreprises</p>
            <p />
          </Link>
        </div>
        <div className="col-sm-4">
          <Link
            to=""
            className="box_topic"
            onClick={() => {
              newTab("https://ilimi.edu.ne/");
            }}
          >
            <span>
              <img src={adu} width={70} height={70} alt="" />
            </span>
            <h3>ADU</h3>
            <p>ILIMI - The African Development University</p>
            <p />
          </Link>
        </div>
      </div>
      <div className="main_title_2">
        <span>
          <em />
        </span>
        <h2>Pédagogie</h2>
        <p>L'approche codeloccol se base sur trois concepts</p>
      </div>
      <div className="row">
        <div className="col-sm-4">
          <a className="box_topic" href="#0">
            <span>
              <img src={learn} width={70} height={70} alt="" />
            </span>
            <h3>Le self learning</h3>
            <p />
          </a>
        </div>
        <div className="col-sm-4">
          <a className="box_topic" href="#0">
            <span>
              <img src={peer} width={70} height={70} alt="" />
            </span>
            <h3>Le peer Learning</h3>
            <p />
          </a>
        </div>
        <div className="col-sm-4">
          <a className="box_topic" href="#0">
            <span>
              <img src={mentoring} width={70} height={70} alt="" />
            </span>
            <h3>Coaching &amp; Mentoring</h3>
            <p />
          </a>
        </div>
      </div>
      <div className="main_title_2">
        <span>
          <em />
        </span>
        <h2>Roadmap</h2>
        <p>
          CodeLoccol oueuvre à former des développeurs Full Stack avec un Roadmap réfléchi et adapté à tous. <br/>
        </p>
        <img className="w-100 img-fluid road" src={cursus} alt="RoadMap" />
      </div>
    </>
  );
};
export default AboutContent;
