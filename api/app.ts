import * as bodyParser from "body-parser";
const nodemailer = require("nodemailer");
const path = require("path");
import * as express from "express";
import { APILogger } from "./logger/api.logger";
import { AdmissionController } from "./controller/admission.controller";

class App {
  public express: express.Application;
  public logger: APILogger;
  public admissionController: AdmissionController;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.logger = new APILogger();
    this.admissionController = new AdmissionController();
  }

  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(express.static(path.join(__dirname, "../ui/build")));
  }

  private routes(): void {
    this.express.get("/api/admissions", (req, res) => {
      this.admissionController.getAdmissions().then((data) => res.json(data));
    });

    this.express.post("/api/admission/existe", (req, res) => {
      this.admissionController
        .existeAdmission(req.body.admission)
        .then((data) => res.json(data));
    });

    this.express.post("/api/admission", (req, res) => {
      this.admissionController
        .createAdmission(req.body.admission)
        .then((data) => {
          res.json(data);
          if (data["type"]) {
            SendMail(res, data["name"], data["mail"], "Admission");
          } /* else {
            res.json(data);
          } */
        });
    });

    this.express.put("/api/admission", (req, res) => {
      this.admissionController
        .updateAdmission(req.body.admission)
        .then((data) => res.json(data));
    });

    this.express.delete("/api/admission/:id", (req, res) => {
      this.admissionController
        .deleteAdmission(req.params.id)
        .then((data) => res.json(data));
    });

    this.express.post("/api/contact", (req, res)=>{
      const {firstName, lastName, mail} = req.body.contact
      SendMail(res, `${firstName} ${lastName}`, mail, "Contact");
    });

    this.express.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "../ui/build/index.html"));
    });
    
    this.express.use("*", (req, res) => {
      res.send("Make sure url is correct!!!");
    });
  }
}

function SendMail(res:any, name:string, mail:string, subject:string) {
  let messageHTML: string;
  if(subject === "Admission") {
    messageHTML = `
    <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Email Confirmation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style type="text/css">
        @media screen {
          @font-face {
            font-family: 'Source Sans Pro';
            font-style: normal;
            font-weight: 400;
            src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
          }

          @font-face {
            font-family: 'Source Sans Pro';
            font-style: normal;
            font-weight: 700;
            src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
          }
        }
        body,
        table,
        td,
        a {
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
        }
        table,
        td {
          mso-table-rspace: 0pt;
          mso-table-lspace: 0pt;
        }
        img {
          -ms-interpolation-mode: bicubic;
        }

        a[x-apple-data-detectors] {
          font-family: inherit !important;
          font-size: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
          color: inherit !important;
          text-decoration: none !important;
        }

        div[style*="margin: 16px 0;"] {
          margin: 0 !important;
        }

        body {
          width: 100% !important;
          height: 100% !important;
          padding: 0 !important;
          margin: 0 !important;
        }
        table {
          border-collapse: collapse !important;
        }

        a {
          color: #1a82e2;
        }

        img {
          height: auto;
          line-height: 100%;
          text-decoration: none;
          border: 0;
          outline: none;
        }
        </style>

      </head>
      <body style="background-color: #e9ecef;">
        <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
          Mail de confirmation pour votre admission.
        </div>
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td align="center" bgcolor="#e9ecef">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                  <td align="center" valign="top" style="padding: 36px 24px;">
                    <a href="https://sendgrid.com" target="_blank" style="display: inline-block;">
                      <img src="https://intra.codeloccol.org/assets/codeloccol-3c90982b870c569870fbb93dbd6c2aef6bf1858f30e24586100e27e34854b8ac.png" alt="ogo" border="0" width="100" style="display: block; width: 100px; max-width: 100px; min-width: 100px;">
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" bgcolor="#e9ecef">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                  <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                    <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Confirmation d'admission</h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" bgcolor="#e9ecef">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                  <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                    <p style="margin: 0;">
                      Bonjour ${name}.<br />
                      Votre candidature à bien été reçu. <br />
                      Nous procéderons bientôt au traitement des dossiers reçus.<br />
                      Nous te prions de bien rester à l’écoute pour la suite de ta candidature.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td align="left" bgcolor="#ffffff">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                          <table border="0" cellpadding="0" cellspacing="0">
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                    <p style="margin: 0;">L'équipe,<br> Codeloccol</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                  <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                    <p style="margin: 0;">Vous avez reçu cet e-mail car nous avons reçu une demande d'<strong>[Admission Codeloccol]</strong> pour votre admission à Codeloccol.<br/>
                    Si vous n'avez pas demandé une <strong>[Admission Codeloccol]</strong>, vous pouvez supprimer cet e-mail en toute sécurité.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
  `;
  } else {
    messageHTML = `
      <p>Bonjour Monsieur/Madame <strong>${name}</strong></p>
      <p>Votre message a bien été reçu.</p>
      <p>Nous vous prions de bien rester à l’écoute, nous vous reviendrons bientôt.</p>
    `;
  }

  let transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: subject === "Admission" ?"admissions@codeloccol.org" : "contact@codeloccol.org",
      pass: subject === "Admission" ?"@Code&Loccol#19" : "@Code&Loccol/1#19",
    },
  });

  let mailOptions = {
    from: subject === "Admission" ? "[Codeloccol Admission] <admissions@codeloccol.org>" : "[Codeloccol Contact] <admissions@codeloccol.org>",
    to: `${mail}`,
    subject: subject, 
    html: messageHTML
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.send({
        type: false,
        mailSendOptions: {
          mail: mail,
          subject: subject
        }
      });
      console.log("error : " + err);
      return ;
    }

    console.log("Mail sent successfully");
    res.send({
      type: true
    });
    return;
  });
}

export default new App().express;
