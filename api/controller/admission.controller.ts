import { APILogger } from "../logger/api.logger";
import { AdmissionService } from "../service/admission.service";

export class AdmissionController {
  private admissionService: AdmissionService;
  private logger: APILogger;

  constructor() {
    this.admissionService = new AdmissionService();
    this.logger = new APILogger();
  }

  async getAdmissions() {
    this.logger.info("Controller: getAdmissions", null);
    return await this.admissionService.getAdmissions();
  }

  async existeAdmission(admission: any){
    this.logger.info("Controller: existeAdmission", null);
    return await this.admissionService.existeAdmission(admission);
  }

  async createAdmission(Admission: any) {
    this.logger.info("Controller: createAdmission", null);
    return await this.admissionService.createAdmission(Admission);
  }

  async updateAdmission(Admission: any) {
    this.logger.info("Controller: updateAdmission", null);
    return await this.admissionService.updateAdmission(Admission);
  }

  async deleteAdmission(AdmissionId: any) {
    this.logger.info("Controller: deleteAdmission", null);
    return await this.admissionService.deleteAdmission(AdmissionId);
  }
}
