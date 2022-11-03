import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

interface Props {
  content: ReactNode;
  banner: ReactNode;
  color: string;
  background: string | undefined;
  loaderForm: boolean;
}

const Layout: FunctionComponent<Props> = ({ content, banner, color, background, loaderForm}) => {

  const [preloader, setPreloader] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0)
    const onPageLoad = () => {
      setPreloader(true);
    };

    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad);
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);
  
  const openTab = (url: string) => {
    window.open(url);
  };

  const title = document.URL.split("/")[3];
  function capitalizeFirstLetter(a: string) {
    return a.charAt(0).toUpperCase() + a.slice(1);
  }
  if(document.title !== "Codeloccol | 404") {
    if (title !== "") document.title = "Codeloccol | Formulaire d'apllication | " + capitalizeFirstLetter(title);
    else document.title = "Codeloccol | Formulaire d'apllication";
  }
  
  const divStyle = {
    background: color
  };
  const backStyle = {
    background: background ? background : "#f5f6f8"
  }
  const transparent = title === "" ? true : false

  const headerFoooterHidden = title.includes("apply") || document.title === "Codeloccol | 404"
  
  return (
    <>
      <div id="preloader" className={`${preloader && "d-none"}`}>
        <div data-loader="circle-side" className={`${preloader && "d-none"}`}/>
      </div>
      <div id="loader_form" className={`${!loaderForm && "d-none"}`}>
        <div data-loader="circle-side" className={`${!loaderForm && "d-none"}`} />
      </div>
      {
        !headerFoooterHidden && (
          <>
            <div style={divStyle}>
              <Header newTab={openTab} transparent={transparent} />
            </div>
            {banner}
          </>
        )
      }
      
      <main id="general_page" style={backStyle}>
        <div className={`${title.includes("apply") ? "conatainer-fluid" : "margin_60_35 container"}`}>
          {content}
        </div>
      </main>
      {
        !headerFoooterHidden && (
          <>
            <div style={divStyle}>
              <div className="container">
                <Footer newTab={openTab} />
              </div>
            </div>
          </>
        )
      }
      
      <div className="cd-overlay-nav">
        <span />
      </div>
      <div className="cd-overlay-content">
        <span />
      </div>
    </>
  );
};

export default Layout;
