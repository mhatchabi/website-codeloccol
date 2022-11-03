import { FunctionComponent } from "react";
import Carousel from 'react-bootstrap/Carousel';
import slider from "./../../img/slider.jpg"
import slider1 from "./../../img/slider1.jpeg"
import slider2 from "./../../img/slider2.jpeg"
const HomeBanner: FunctionComponent = () => {
  return (
    <Carousel pause={"hover"} controls={false} variant="black">
      <Carousel.Item interval={1000}>
        <img
          className="d-block w-100"
          src={slider}
          alt="First slide"
        />
        <Carousel.Caption>
          <h1>Pratice</h1>
          <h3>En programmation plus vous pratiquez, mieux vous allez progresser</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img
          className="d-block w-100"
          src={slider1}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h1>Self Learning</h1>
          <h3>Ouvert 24h/24 afin que vous travaillez selon votre emploi du temps</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={slider2}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h1>Peer Learning</h1>
          <h3> Vous apprendrez mieux par l’apprentissage par les pairs </h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default HomeBanner