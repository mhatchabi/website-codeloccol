import { FunctionComponent, useState } from "react";
import FAQBASE from "../../models/faq";
import Faq from "./faqComponent";
import Accordion from "react-bootstrap/Accordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSchoolFlag,
  faFile,
  faGraduationCap,
  faMoneyBill,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import "./faq.css";
const FaqContent: FunctionComponent = () => {
  const { siege, access, parcours, frais } = FAQBASE;

  const faqSiege = [
    siege.position,
    siege.condition,
    siege.transport,
    siege.learn,
  ];

  const faqAccess = [access.career, access.test, access.level];

  const faqParcours = [parcours.formation, parcours.time, parcours.learn];

  const faqFrais = [frais.money, frais.bourse, frais.paiement];

  const [activated, setActivated] = useState<string>("siege")

  return (
    <div className="row">
      <aside className="col-lg-3" id="faq_cat">
        <div className="box_style_cat" id="faq_box">
          <ul id="cat_nav">
            <li>
              <a href="#siege" className={`${activated === "siege" && "active"}`} onClick={()=>{setActivated("siege")}}>
                <FontAwesomeIcon className="after" icon={faSchoolFlag} />
                Siège
                <FontAwesomeIcon className="before" icon={faChevronRight} />
              </a>
            </li>
            <li>
              <a href="#acces" className={`${activated === "acces" && "active"}`} onClick={()=>{setActivated("acces")}}>
                <FontAwesomeIcon className="after" icon={faGraduationCap} />
                Accès
                <FontAwesomeIcon className="before" icon={faChevronRight} />
              </a>
            </li>
            <li>
              <a href="#parcours" className={`${activated === "parcours" && "active"}`} onClick={()=>{setActivated("parcours")}}>
                <FontAwesomeIcon className="after" icon={faFile} />
                Parcours
                <FontAwesomeIcon className="before" icon={faChevronRight} />
              </a>
            </li>
            <li>
              <a href="#frais" className={`${activated === "frais" && "active"}`} onClick={()=>{setActivated("frais")}}>
                <FontAwesomeIcon className="after" icon={faMoneyBill} />
                Frais
                <FontAwesomeIcon className="before" icon={faChevronRight} />
              </a>
            </li>
          </ul>
        </div>
        {/*/sticky */}
      </aside>
      {/*/aside */}
      <div className="col-lg-9" id="faq">
        <h4 className="nomargin_top" id="siege">Siège</h4>

        <Accordion defaultActiveKey="0" className="mb-4">
          {faqSiege.map((siege, index) => (
            <Faq
              key={`s${index}`}
              faq={siege}
              id={`s${index}`}
              parent={"siege"}
            />
          ))}
        </Accordion>
        {/* /accordion section 1 */}
        <h4 className="nomargin_top" id="acces">Accès</h4>
        <Accordion defaultActiveKey="1" className="mb-4">
          {faqAccess.map((access, index) => (
            <Faq
              key={`a${index}`}
              faq={access}
              id={`a${index}`}
              parent={"acces"}
            />
          ))}
        </Accordion>
        {/* /accordion acces */}
        <h4 className="nomargin_top" id="parcours">Parcours</h4>
        <Accordion defaultActiveKey="2" className="mb-4">
          {faqParcours.map((parcours, index) => (
            <Faq
              key={`p${index}`}
              faq={parcours}
              id={`p${index}`}
              parent={"parcours"}
            />
          ))}
        </Accordion>
        {/* /accordion parcours */}
        <h4 className="nomargin_top" id="frais">Frais</h4>
        <Accordion defaultActiveKey="3" className="mb-4">
          {faqFrais.map((frais, index) => (
            <Faq
              key={`f${index}`}
              faq={frais}
              id={`f${index}`}
              parent={"frais"}
            />
          ))}
        </Accordion>
        {/* /accordion Terms - Frais */}
      </div>
      {/* /col */}
    </div>
  );
};
export default FaqContent;
