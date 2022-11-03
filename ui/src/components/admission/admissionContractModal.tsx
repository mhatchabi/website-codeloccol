import { FunctionComponent } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface Props {
  contract: boolean;
  setContract: (contact: boolean) => void;
}
const AdmissionContractModal: FunctionComponent<Props> = ({
  contract,
  setContract,
}) => {
  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={contract}
      onHide={() => setContract(!contract)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Termes et conditions</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <p>
          Afin d'accéder à Codeloccol, vous devez avoir
          <strong> 18 ans révolu au 31 décembre 2022.</strong>
        </p>
        <p>
          Sauf si vous êtes bénéficiaire d'une de nos
          <strong> bourses </strong>, vous vous engagez à verser 15% du montant
          des frais d'apprentissage dès la rentrée. Vous vous engagez également
          à payer le montant restant sur une période de deux ans après
          l'obtention de votre certificat.
        </p>
        <p>
          Enfin, vous vous engagez à vous consacrer avec discipline et
          devouement à l'apprentissage du coding et/ou des autres métiers du
          numérique. L'apprentissage selon notre approche est difficile mais
          éfficace. Vous allez pratiquer 24h/24, vous vivrez des moments
          extrêmement difficiles.
          <strong>
            {" "}
            Si vous n'êtes pas sûr de tenir, ne vous y engager pas. Laissez la
            place aux plus persévérants.
          </strong>
        </p>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button
          className="btn_1"
          variant="success"
          onClick={() => setContract(!contract)}
        >
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default AdmissionContractModal;
