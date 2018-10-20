import { ClienteService } from "./../../services/cliente.service";
import { ClienteDTO } from "./../../models/cliente.dto";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { StorageService } from "../../services/storage.service";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    private clienteService: ClienteService
  ) {}

  cliente: ClienteDTO;

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email).subscribe(
        response => {
          this.cliente = response;
        },
        error => {console.log(error)}
      );
    }
  }
}
