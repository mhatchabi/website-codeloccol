export class AdmissionService {
  
  public async getAllAdmissions(): Promise<any> {
    const response = await fetch("/api/admissions");
    const responseJson = await response.json();
    return responseJson;
  }

  public async existeAdmission(data: any): Promise<any> {
    const response = await fetch(`/api/admission/existe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ admission: data }),
    });
    return await response.json();
  }

  public async createAdmission(data: any): Promise<any> {
    const response = await fetch(`/api/admission`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ admission: data }),
    });
    return await response.json();
  }

  public async deleteAdmission(admissionId: number): Promise<any> {
    const response = await fetch(`/api/admission/${admissionId}`, { method: "DELETE" });
    return await response.json();
  }

  public async editAdmission(data: any): Promise<any> {
    const response = await fetch(`/api/admission`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ admission: data }),
    });
    return await response.json();
  }

  public async sendMail(data: any): Promise<any> {
    const response = await fetch(`/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contact: data }),
    });
    return await response.json();
  }
}