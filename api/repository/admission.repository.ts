import { connect } from "../config/db.config";
import { AdmissionModel } from "../model/admission.model";
import { APILogger } from "../logger/api.logger";

export class AdmissionRepository {
  private logger: APILogger;

  constructor() {
    connect();
    this.logger = new APILogger();
  }

  async getAdmissions() {
    const admissions = await AdmissionModel.find({});
    console.log("admissions:::", null);
    return admissions;
  }

  async existeAdmission(admission: any) {
    let data = {};
    try {
      const check = await AdmissionModel
      .find({$or: [
        { 'mail': admission.mail },
        { 'mobile': admission.mobile }
      ]})
      .select({ "mobile": 1, "mail": 1, "name": 1 });
      if(check.length === 0) {
        data = {
          type: false
        }
        return data;
      } else {
        data = {
          type: true,
          existe: check
        }
        return data;
      }
    } catch (err) {
      this.logger.error("Error:::" + err);
    }
    return data;
  }

  async createAdmission(admission : any) {
    let data = {};
    try {
      const check = await AdmissionModel.find({$or: [
        { 'mail': admission.mail },
        { 'mobile': admission.mobile }
      ]}).select({ "mobile": 1, "mail": 1, "name": 1 });
      if(check.length === 0) {
        const create = await AdmissionModel.create(admission);
        if(create) {
          data = { type: true, name: admission.name, mail: admission.mail }
          return data;
        }
      } else {
        data = {
          type: false,
          exite: check
        }
        return data;
      }
      data = await AdmissionModel.create(admission);
    } catch (err) {
      this.logger.error("Error:::" + err);
    }
    return data;
  }

  async updateAdmission(admission: any) {
    let data = {};
    try {
      data = await AdmissionModel.updateOne(admission);
    } catch (err) {
      this.logger.error("Error:::" + err);
    }
    return data;
  }

  async deleteAdmission(admissionId : number) {
    let data: any = {};
    try {
      data = await AdmissionModel.deleteOne({ _id: admissionId });
    } catch (err) {
      this.logger.error("Error:::" + err);
    }
    return { status: `${data.deletedCount > 0 ? true : false}` };
  }
}