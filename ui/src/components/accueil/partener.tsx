import { FunctionComponent } from "react";

interface Props {
  src1: string;
  src2: string
}

const Parteners: FunctionComponent<Props> = ({ src1, src2 }) => {
  return (
    <div className="slick-slide col-lg-3 col-sm-3">
      <div className="h-200">
        <div className="sliderItem">
          <div className="sliderItem-inner">
            <div className="sliderItem">
              <img
                src={src1}
                className="img-fluid"
                alt="Partener Picture"
                itemProp="image"
              />
            </div>
          </div>
        </div>
      </div>
      {
        src2.length !== 0 && (
          <div className="h-200">
            <div className="sliderItem">
              <div className="sliderItem-inner">
                <div className="sliderItem">
                  <img
                    src={src2}
                    className="img-fluid"
                    alt="Partener Picture"
                    itemProp="image"
                  />
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Parteners