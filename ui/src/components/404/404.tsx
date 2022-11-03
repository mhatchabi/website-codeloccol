import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import "./404.css"

const ErrorContent: FunctionComponent = () => {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>Oops!</h1>
        </div>
        <h2>Erreur 404</h2>
        <p>
        La page que vous recherchez a peut-être été supprimée, a changé de nom ou est temporairement indisponible.
        </p>
        <Link to="#!" className="btn_1 yellow rounded" onClick={()=>{ window.history.back(); console.log(window.history.length)}}>
          Retournez en arrière
        </Link>
      </div>
    </div>
  );
};

export default ErrorContent;