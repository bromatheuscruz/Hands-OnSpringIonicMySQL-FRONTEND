import { AuthService } from "./../../services/auth.service";
import { CredencialDTO } from "./../../models/credencial.dto";
import { Component } from "@angular/core";
import { NavController, IonicPage } from "ionic-angular";
import { MenuController } from "ionic-angular/components/app/menu-controller";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthService
  ) {}

  credencial: CredencialDTO = {
    email: "",
    senha: ""
  };

  login() {
    this.auth.authenticate(this.credencial).subscribe(response => {
      console.log(response.headers.get("Authorization"));
    }),
      error => {
        console.log(error);
      };
    this.navCtrl.setRoot("CategoriasPage");
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }
}
