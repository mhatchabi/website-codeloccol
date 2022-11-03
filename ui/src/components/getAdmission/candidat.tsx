import { FunctionComponent } from "react";
import { AdmissionService } from "../../services/AdmissonServices";

interface Props {
  candidat: Admission;
  index: number
}

const Candidat: FunctionComponent<Props> = ({ candidat, index }) => {
  return (
    <tr>
      <td>{index}</td>
      <td>{candidat.name}</td>
      <td>{candidat.mail}</td>
      <td>{candidat.mobile}</td>
    </tr>
  )
}
export default Candidat