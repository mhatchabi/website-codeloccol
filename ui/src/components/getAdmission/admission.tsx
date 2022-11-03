import { FunctionComponent, useEffect, useState } from "react";
import { AdmissionService } from "../../services/AdmissonServices";
import "bootstrap/dist/css/bootstrap.css";
import "./admission.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, Col, Row, Table } from "react-bootstrap";
import {
  DatatableWrapper,
  Filter,
  Pagination,
  PaginationOptions,
  TableBody,
  TableColumnType,
  TableHeader,
} from "react-bs-datatable";
const GetAdmissions: FunctionComponent = () => {
  const admissionService = new AdmissionService()
  const [candidates, setCandidates] = useState([])
  const [modal, setModal] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<Admission>();
  type ArrayElementType = (typeof candidates)[number] & {
    button: any,
    index: number,
  };
  const titrePagination: object = {
    firstPage: <FontAwesomeIcon icon={faChevronLeft} />,
    lastPage: <FontAwesomeIcon icon={faChevronRight} />,
    nextPage: <FontAwesomeIcon icon={faArrowRight} />,
    prevPage: <FontAwesomeIcon icon={faArrowLeft} />,
    show: "Display",
    entries: "rows",
    noResults: "Aucune donnée à afficher"
  };
  const className: object = {
    button: " btn-pagination"
  };
  useEffect(() => {
    admissionService.getAllAdmissions().then(res => setCandidates(res)).catch(err => { console.log(err); })
  }, []);
  const STORY_HEADERS: TableColumnType<ArrayElementType>[] = [
    {
      prop: "index",
      title: "#",
      cell: (individus) => (
        <p>{candidates.indexOf(individus) + 1}</p>
      )
    },
    {
      prop: "name",
      title: "Nom & Prenom",
      isFilterable: true,
    },

    {
      prop: "mail",
      title: "Email",
    },
    {
      prop: "mobile",
      title: "Téléphone",
    },
    {
      prop: "age",
      title: "Age",
      isFilterable: true,
    },
    {
      prop: "button",
      cell: (individus) => (
        <Button
          variant=" btn_1 rounded yellow"
          size="sm"
          onClick={() => {
            allInfoUser(individus)
          }}
        >
          Details
        </Button>
      ),
    },
  ];

  const allInfoUser = (user: Admission) => {
    setModal(!modal);
    return setModalInfo(user)
  }
  return (
    <>
      <div className="main_title_2 mt-4">
        <span>
          <em />
        </span>
        <h2>Listes des Admissions</h2>
      </div>
      <DatatableWrapper
        body={candidates}
        headers={STORY_HEADERS}
        paginationOptionsProps={{
          initialState: {
            rowsPerPage: 50,
            options: [50, 100],
          },
        }}

      >
        <Row className="mb-4 p-2 list">
          <Col
            xs={12}
            lg={4}
            className="d-flex flex-col justify-content-end align-items-end"
          >
            <Filter classes={className} />
          </Col>
          <Col
            xs={12}
            sm={6}
            lg={4}
            className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
          >
            <PaginationOptions />
          </Col>
          <Col
            xs={12}
            sm={6}
            lg={4}
            className="d-flex flex-col justify-content-end align-items-end"
          >
            <Pagination labels={titrePagination} classes={className} />
          </Col>
        </Row>
        <Table>
          <TableHeader />
          <TableBody />
        </Table>
      </DatatableWrapper>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={modal}
        onHide={() => setModal(!modal)}
      >
        <Modal.Header closeButton>
          <Modal.Title className="">Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          {
            modalInfo ?
              (
                <>
                  <p>Nom&amp;Prenom: <strong>{modalInfo.name}</strong></p>
                  <p>Email: <strong>{modalInfo.mail}</strong></p>
                  <p>Pays: <strong>{modalInfo.country}</strong></p>
                  <p>Ville: <strong>{modalInfo.city}</strong></p>
                  <p>WhatsApp: <strong>{modalInfo.mobile}</strong></p>
                  <div className="d-flex justify-content-between w-50"><p>Age: <strong>{modalInfo.age}</strong></p><p>Sexe: <strong>{modalInfo.gender}</strong></p></div>
                  <p>Handicap: {modalInfo.isHandicap ? (<strong>Oui <br></br>{modalInfo.handicap}</strong>) : <strong>Non</strong>}</p>
                  <p>IsCoding : {modalInfo.isLearnCoding ? (<strong>Oui <br></br>{modalInfo.adventure}</strong>) : (<strong> Non <br></br>{modalInfo.whyDoNotLearnCoding}</strong>)}</p>
                  <p>Learn: <strong>{modalInfo.learn}</strong></p>
                  <p>Achievement: <strong>{modalInfo.likeToAchieve}</strong></p>
                  <p>TechEnvironement: <strong>{modalInfo.techEnvironment}</strong></p>
                </>
              )
              :
              ""
          }
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button
            className=" btn_1"
            variant="success"
            onClick={() => setModal(!modal)}
          >
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default GetAdmissions