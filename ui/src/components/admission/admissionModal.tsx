import { FunctionComponent } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface Props {
  modal: boolean;
  setModal: (modal: boolean) => void;
}
const AdmissionModal: FunctionComponent<Props> = ({ modal, setModal }) => {
  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={modal}
      onHide={() => setModal(!modal)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Foire aux questions</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <p>
          <strong>
            Quelle diplôme aurais je à l'issue de ma formation à Codeloccol ?
          </strong>
        </p>
        <p>
          Codeloccol n'est pas un établissement d'enseignement supérieur, nous
          ne delivrons pas de diplôme par conséquent. Nous sommes un centre
          d'apprentissage pour les métiers du Digital. A la fin de la formation
          l'apprenant obtient une Certification Codeloccol, reconnu par l'ANSI
          et nos différents partenaires.
        </p>
        <p>
          <strong>Quels sont les frais d'accès à Codeloccol ?</strong>
        </p>
        <p>
          Nos frais pour une année d'apprentissage s'élèvent à{" "}
          <strong>deux million de Francs CFA</strong>. L'apprenant s'acquitte de{" "}
          <strong>15%</strong> soit <strong>trois cent mille francs CFA</strong>
          . Le montant restant est payable pendant une période de deux ans après
          la formation.
        </p>
        <p>
          <strong>
            Quels sont mes possibilités après ma formation à Codeloccol ?
          </strong>
        </p>
        <p>
          Après votre formation à Codeloccol vous pouvez travailler en tant que
          freelance pour les entreprises/startup locales ou internationnales,
          créer votre propre startup dans le numérique ou travailler dans le
          cadre du programme <strong>Niger 2.0</strong> du gouvernement
          nigérien. Pour toutes ces trois options nous vous accompagnons à
          trouvé les bonnes opportunités.
        </p>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button
          className="btn_1"
          variant="success"
          onClick={() => setModal(!modal)}
        >
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default AdmissionModal;
