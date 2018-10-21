import { LocalUser } from "./../models/local_user.model";
import { API_CONFIG } from "./../config/api.config";
import { HttpClient } from "@angular/common/http";
import { CredencialDTO } from "./../models/credencial.dto";
import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";

import { JwtHelper } from "angular2-jwt";

@Injectable()
export class AuthService {
  constructor(public http: HttpClient, public storage: StorageService) {}

  jwtHelper: JwtHelper = new JwtHelper();

  authenticate(credencial: CredencialDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/login`, credencial, {
      observe: "response",
      responseType: "text"
    });
  }

  refreshToken() {
    return this.http.post(`${API_CONFIG.baseUrl}/auth/refresh_token`,{}, {
      observe: "response",
      responseType: "text"
    });
  }

  successfullLogin(authorizationValue: string) {
    const TAMANHO_BARIER = 7;
    let tok = authorizationValue.substring(TAMANHO_BARIER);
    let user: LocalUser = {
      token: tok,
      email: this.jwtHelper.decodeToken(tok).sub
    };
    this.storage.setLocalUser(user);
  }

  logout() {
    this.storage.setLocalUser(null);
  }
}
