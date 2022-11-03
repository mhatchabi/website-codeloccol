import { FunctionComponent } from "react";

const SuccessWizard: FunctionComponent = () => {
  return (
    <div className="step">
      <div className="cardSuccess">
        <div className="successChecked">
          <i className="checkmark">✓</i>
        </div>
        <h1 className="pt-4">Félications</h1>
        <p>
        Nous avons reçu ta demande d'admission<br />
        Nous te contacterons sous peu !
        </p>
      </div>
    </div>
  );
};
export default SuccessWizard;
