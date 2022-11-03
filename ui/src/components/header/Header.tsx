import { FunctionComponent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import "./header.css";
import codeloccol from "./../../img/Codeloccol.png";
import codeloccol2 from "./../../img/Codeloccol2.png";

interface Props {
  newTab: (url: string) => void;
  transparent: boolean
}
const Header: FunctionComponent<Props> = ({ newTab, transparent }) => {

  const [isClicked, setClick] = useState<boolean>(false);
  const [sticky, setSticky] = useState({});

  useEffect(() => {
    window.addEventListener('scroll', stickNavbar);
    return () => window.removeEventListener('scroll', stickNavbar);
  }, []);
 const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 30 ? setSticky({ position: "fixed", top: "0" , background: '#fff', borderBottom : "2px solid #179349" }) : setSticky({ });
    }
  }

  return (
    <header>
      <div className={`${!transparent && "mb"}`}></div>
      <nav style={sticky} className={`navbar fixed-top navbar-expand-sm ${transparent ? "transparent hover" : "navbar-light bg-white border-bottom border-success border-2"}`}>
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img
              src={codeloccol}
              alt=""
              width={178}
              height={45}
              className="d-none d-md-block"
            />
            <img
              src={codeloccol2}
              alt=""
              width={62}
              height={45}
              className="d-block d-md-none"
            />
          </Link>
          <button
            className={`border-0 navbar-toggler ${isClicked ? "collapsed active" : ""}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded={isClicked}
            aria-label="Toggle navigation"
            onClick={() => setClick(!isClicked)}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className={`collapse navbar-collapse ${isClicked ? "show" : ""}`} id="navbarNav">
            <ul className={"navbar-nav flex-wrap ms-md-auto me-2 " + isClicked}>
              <div className="d-lg-none"><br /></div>
              <li className="nav-item me-2">
                <Link to="/" className="animated_link">
                  Accueil
                </Link>
              </li>
              <div className="d-lg-none"><br /></div>
              <li className="nav-item me-2">
                <Link to="/about" className="animated_link">
                  About
                </Link>
              </li>
              <div className="d-lg-none"><br /></div>
              <li className="nav-item me-2">
                <Link to="/faq" className="animated_link">
                  Faq
                </Link>
              </li>
              <div className="d-lg-none"><br /></div>
              <li className="nav-item me-2">
                <Link to="/contact" className="animated_link">
                  Contactez-nous
                </Link>
              </li>
            </ul>
            <div id="social" className="mt-2 me-2 d-none d-sm-block">
              <ul>
                <li>
                  <Link
                    to=""
                    onClick={() => {
                      newTab("https://www.facebook.com/codeloccol");
                    }}
                  >
                    <FontAwesomeIcon icon={faFacebookF} size={"lg"} />
                  </Link>
                </li>
                <li>
                  <Link
                    to=""
                    onClick={() => {
                      newTab("https://twitter.com/codeloccol");
                    }}
                  >
                    <FontAwesomeIcon icon={faTwitter} size={"lg"} />
                  </Link>
                </li>
                <li>
                  <Link
                    to=""
                    onClick={() => {
                      newTab("https://www.instagram.com/codeloccol/");
                    }}
                  >
                    <FontAwesomeIcon icon={faInstagram} size={"lg"} />
                  </Link>
                </li>
                <li>
                  <Link
                    to=""
                    onClick={() => {
                      newTab("https://www.linkedin.com/company/codeloccol/");
                    }}
                  >
                    <FontAwesomeIcon icon={faLinkedin} size={"lg"} />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="btn-nav">
              <ul>
                <li>
                  <Link to="/apply" target="_blank" className="p-2">
                    Admission
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
