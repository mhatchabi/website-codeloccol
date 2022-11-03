import { model, Schema, Model, Document } from "mongoose";

export interface IAdmission extends Document {
  name: string;
  mail: string;
  country: string;
  city: string;
  mobile: number;
  age: number;
  gender: string;
  isHandicap: boolean;
  handicap: string;
  coding : string;
  isLearnCoding: boolean;
  adventure: string;
  whyDoNotLearnCoding: string;
  learn: string;
  likeToAchieve : string;
  techEnvironment: string;
}

const AdmissionSchema: Schema = new Schema({
  name: { type: String, required: true },
  mail: { type: String, required: true, unique: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  mobile: { type: Number, require: true, unique: true },
  age: { type: String, require: true },
  gender: { type: String, required: true },
  isHandicap: { type: Boolean, required: true },
  handicap: { type: String, require : false},
  coding :  { type: String, require : false},
  isLearnCoding:{ type: Boolean, required: true },
  adventure:  { type: String, require : false},
  whyDoNotLearnCoding:  { type: String, require : false},
  learn: { type: String, require : false},
  likeToAchieve : { type: String, require : false},
  techEnvironment: { type: String, require : false}
});

export const AdmissionModel: Model<IAdmission> = model<IAdmission>('admissions', AdmissionSchema);