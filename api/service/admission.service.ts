import { AdmissionRepository } from "../repository/admission.repository";

export class AdmissionService {
  private admissionRepository: AdmissionRepository;

  constructor() {
    this.admissionRepository = new AdmissionRepository();
  }

  async getAdmissions() {
    return await this.admissionRepository.getAdmissions();
  }

  async existeAdmission(admission: any) {
    return await this.admissionRepository.existeAdmission(admission);
  }

  async createAdmission(Admission: any) {
    return await this.admissionRepository.createAdmission(Admission);
  }

  async updateAdmission(Admission: any) {
    return await this.admissionRepository.updateAdmission(Admission);
  }

  async deleteAdmission(AdmissionId: number) {
    return await this.admissionRepository.deleteAdmission(AdmissionId);
  }
}