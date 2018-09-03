import { API_CONFIG } from "./../config/api.config";
import { HttpClient } from "@angular/common/http";
import { CredencialDTO } from "./../models/credencial.dto";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
  constructor(public http: HttpClient) {}

  authenticate(credencial: CredencialDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/login`, credencial, {
      observe: "response",
      responseType: "text"
    });
  }
}
