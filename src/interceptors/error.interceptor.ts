import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { Observable } from "rxjs";
import { StorageService } from "../services/storage.service";
import { AlertController } from "ionic-angular";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private storage: StorageService,
    private alertController: AlertController
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).catch((error, caught) => {
      let errorObj = error;

      if (errorObj.error) {
        errorObj = errorObj.error;
      }
      if (!errorObj.status) {
        errorObj = JSON.parse(errorObj);
      }

      switch (errorObj.status) {
        case 401:
          this.handle401();

        case 403:
          this.handle403();
          break;

        default:
          this.handleDefaultError(errorObj);
          break;
      }

      return Observable.throw(errorObj);
    }) as any;
  }

  handle403() {
    this.storage.setLocalUser(null);
  }

  handle401() {
    let alert = this.alertController.create({
      title: "Erro 401: Falha de autenticação",
      message: "Email ou senha inválidos",
      enableBackdropDismiss: false,
      buttons: [{ text: "Ok" }]
    });
    alert.present();
  }

    handleDefaultError(err) {
      let alert = this.alertController.create({
      title: "Erro " + err.status + ": " + err.error,
      message: err.message,
      enableBackdropDismiss: false,
      buttons: [{ text: "Ok" }]
    });
    alert.present();
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
