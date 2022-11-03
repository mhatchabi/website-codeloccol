import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import "./footer.css"

interface Props {
  newTab: (url: string) => void
}
const Footer: FunctionComponent<Props> = ({ newTab }) => {
  return (
    <footer id="home" className="clearfix">
      <div className="row">
        <div className="col-sm-6 d-flex justify-content-start">
          <p className="text-start">© {new Date().getFullYear()} Codeloccol</p>
        </div>
        <div className="col-sm-6 d-flex justify-content-sm-end justify-content-xs-start">
          <ul>
            <li>
              <Link to="/" className="animated_link">
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/about" className="animated_link">
                About
              </Link>
            </li>
            <li>
              <Link to="/faq" className="animated_link">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/contact" className="animated_link">
                Contactez-nous
              </Link>
            </li>
          </ul></div>
      </div>
    </footer>
  );
};
export default Footer;