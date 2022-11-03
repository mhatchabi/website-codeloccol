import { FunctionComponent, useEffect, useState } from "react";
import 'react-multi-carousel/lib/styles.css';
import Parteners from "./partener";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import "./home.css"
import back from "../../img/back-1024x724.png"
import armoirie from "../../img/niger.png"
import ueflag from "../../img/eu_flag.jpeg"
import dggf from "../../img/dggf.jpeg"
import icrisat from "../../img/icrisat.png"
import nigertelecoms from "../../img/nigertelecoms.png"
import pgrcdu from "../../img/pgrcdu.jpeg"
import bm from "../../img/bm.jpeg"
import giz from "../../img/giz.png"
import pvi from "../../img/Pvi.jpg"

import ym from "../../img/YayiMake.jpg"
import ifuture from "../../img/Ifuture.png"
import virtuprofs from "../../img/Virtusprofs.jpg"
import comsates from "../../img/comsates.png"
import ninetech from "../../img/Ninetec.jpg"
import africaYcon from "../../img/Africaycoone.png"
import zedpay from "../../img/Zedpay.jpg"

const HomeContent: FunctionComponent = () => {

  const pImgs: Parteners[] = [{ src1: armoirie, src2: ueflag }, { src1: dggf, src2: icrisat }, { src1: nigertelecoms, src2: pgrcdu }, { src1: bm, src2: giz }, { src1: pvi, src2: "" }];

  const sImgs: Parteners[] = [{ src1: ym, src2: ifuture }, { src1: comsates, src2: virtuprofs }, { src1: ninetech, src2: africaYcon }, { src1: zedpay, src2: "" }];


  const [images, setImages] = useState<Parteners[]>(pImgs);
  const [sImages, setSImages] = useState<Parteners[]>(sImgs);
  const [parteners, setParteners] = useState<Parteners[]>([]);
  const [society, setSociety] = useState<Parteners[]>([]);
  const [part, setPart] = useState<boolean>(true);
  const [soc, setSoc] = useState<boolean>(true);
  const [partPosition, setPartPosition] = useState<number>(0);
  const [socPosition, setSocPosition] = useState<number>(0);


  const imgPartPosition = images.length - 1;
  const position = pImgs[imgPartPosition];
  const imgSocPosition = sImages.length - 1;
  const sPosition = sImgs[imgSocPosition];


  useEffect(() => {
    if (part || soc) {

      if (part) {
        setParteners(images.filter((src, i) => i < 4 && src));
        setPart(!part);
        setPartPosition(0);
        for (let i = 0; i < imgPartPosition; i++) {
          if (images[i].src1 === position.src1 && images[i].src2 === position.src2) {
            const progess = imgPartPosition - i;
            setPartPosition((progess * 100) / imgPartPosition);
            break;
          }
        }
      }

      if (soc) {
        setSociety(sImages.filter((src, i) => i < 4 && src));
        setSoc(!soc);
        setSocPosition(0);
        for (let i = 0; i < imgSocPosition; i++) {
          if (sImages[i].src1 === sPosition.src1 && sImages[i].src2 === sPosition.src2) {
            const progess = imgSocPosition - i;
            setSocPosition((progess * 100) / imgSocPosition);
            break;
          }
        }
      }
    }
  }, [part, soc, images, imgPartPosition, imgSocPosition, sImages, sPosition, position]);

  const prev = (bool: boolean) => {
    const lastItem = bool ? images.pop() : sImages.pop();
    if (lastItem) {
      if (bool) {
        setImages([lastItem, ...images]);
        setPart(!part);
      } else {
        setSImages([lastItem, ...sImages]);
        setSoc(!soc);
      }
    }
  }

  const next = (bool: boolean) => {
    const firstItem = bool ? images.shift() : sImages.shift();
    if (firstItem) {
      if (bool) {
        setImages([...images, firstItem]);
        setPart(!part);
      } else {
        setSImages([...sImages, firstItem]);
        setSoc(!soc);
      }
    }
  }

  return (
    <>
      <div className="container">
        <div className="row mt-2">
          <div className="col-md-6">
            <div className="widget-container">
              <div className="image">
                <img
                  src={back}
                  className="w-100 img-fluid"
                  alt=""
                  sizes="(max-width: 3508px) 100vw, 3508px"
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="text-center">
              <FontAwesomeIcon className="quote" icon={faQuoteLeft} />
            </div>
            <blockquote className="blockquote">
              <p className="blockquote__content text-justify">
                Nous croyons fermement que devenir développeur ne devrait
                être ni frustrant ni compliqué. C’est une aventure qui
                doit plutôt enflammer votre passion, élargir votre vision
                du monde et votre créativité. Être développeur devrait
                être si édifiant et divertissant que vous vous donneriez
                corps et âme pour apprendre, découvrir et partager afin de
                créer des solutions qui changeront votre vie ainsi que
                celle de votre communauté.
              </p>
            </blockquote>
          </div>
        </div>
        <div className="row my-4">
          <div className="main_title_2">
            <span>
              <em />
            </span>
            <h2>Partenaires</h2>
          </div>
          <div className="parteners">
            <div className="sliderStart d-block">
              <div className="slider">
                <div className="row">
                  <div className="slider-wrapper slick-initialized slick-slider justify-content-center">
                    <div className="row p-2">
                      {
                        parteners.map((img, index) => <Parteners key={index} src1={img.src1} src2={img.src2} />)
                      }
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="slider-controls">
                    <button type="button" className="slick-arrow slick-prev" onClick={() => prev(true)}>
                      prev
                    </button>
                    <div className="progress" style={{ display: "block", backgroundSize: `${partPosition}% 100%` }} />
                    <button type="button" className="slick-arrow slick-next" onClick={() => next(true)}>
                      next
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className="row my-4">
          <div className="main_title_2">
            <span>
              <em />
            </span>
            <h2>Entreprises partenaires</h2>
          </div>
          <div className="parteners">
            <div className="sliderStart d-block">
              <div className="slider">
                <div className="row">
                  <div className="slider-wrapper slick-initialized slick-slider">
                    <div className="row p-2">
                      {
                        society.map((img, index) => <Parteners key={index} src1={img.src1} src2={img.src2} />)
                      }
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="slider-controls">
                    <button type="button" className="slick-arrow slick-prev" onClick={() => prev(false)}>
                      prev
                    </button>
                    <div className="progress" style={{ display: "block", backgroundSize: `${socPosition}% 100%` }} />
                    <button type="button" className="slick-arrow slick-next" onClick={() => next(false)}>
                      next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="main_title_2 mt-4">
            <span>
              <em />
            </span>
            <h2>Reseaux sociaux</h2>
          </div>
          <div className="col-lg-4 col-sm-6">
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fcodeloccol&tabs=timeline&width=340&height=500&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=true&appId"
              width={340}
              height={500}
              style={{ 
                border: "none", 
                overflow: "hidden" 
              }}
              scrolling="no"
              frameBorder={0}
              allowFullScreen={true}
              title="Codeloccol"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            />
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="d-block d-sm-none"><br /></div>
            <iframe
              id="twitter-widget-2"
              scrolling="no"
              frameBorder={0}
              allowFullScreen={true}
              className=""
              style={{
                position: "static",
                visibility: "visible",
                width: 331,
                height: 450,
                display: "block",
                flexGrow: 1
              }}
              title="Twitter Timeline"
              src="https://syndication.twitter.com/srv/timeline-profile/screen-name/Codeloccol?dnt=false&embedId=twitter-widget-2&frame=false&hideBorder=false&hideFooter=false&hideHeader=false&hideScrollBar=false&lang=en&maxHeight=450px&origin=https%3A%2F%2Fdeveloper.twitter.com%2Fen%2Fdocs%2Ftwitter-for-websites&sessionId=e3719c617f6c19fc4f4ef09c08d6fa539bbc08df&showHeader=true&showReplies=false&transparent=false&widgetsVersion=1c23387b1f70c%3A1664388199485"
            />
          </div>
          <div className="col-lg-4 col-sm-6">
          
          </div>
        </div>
      </div>
    </>

  )
}
export default HomeContent