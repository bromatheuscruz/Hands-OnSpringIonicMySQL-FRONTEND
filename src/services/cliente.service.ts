import { StorageService } from "./storage.service";
import { API_CONFIG } from "./../config/api.config";
import { ClienteDTO } from "./../models/cliente.dto";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class ClienteService {
  constructor(private http: HttpClient, private storage: StorageService) {}

  findByEmail(email: String): Observable<ClienteDTO> {
    let token = this.storage.getLocalUser().token;
    let authHeader = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get<ClienteDTO>(
      `${API_CONFIG.baseUrl}/clientes/email?value=${email}`,
      { headers: authHeader });
  }
}
