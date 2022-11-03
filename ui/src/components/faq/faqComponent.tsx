import { FunctionComponent } from "react";
import Accordion from 'react-bootstrap/Accordion';


interface Props {
  faq: FaqContent;
  id: string
  parent: string
}

const Faq: FunctionComponent<Props> = ({ faq, id}) => {
  
  return (
    <Accordion.Item className="mb-1 border-0" eventKey={id}>
      <Accordion.Header>{faq.title}</Accordion.Header>
      <Accordion.Body className="border-top border-1">
        <div dangerouslySetInnerHTML={{ __html: faq.content }}></div>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default Faq;
