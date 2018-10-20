import { CategoriaDTO } from "./../../models/categoria.dto";
import { CategoriaService } from "./../../services/domain/categoria.service";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage({})
@Component({
  selector: "page-categorias",
  templateUrl: "categorias.html"
})
export class CategoriasPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public service: CategoriaService
  ) {}

  categorias: CategoriaDTO[];

  ionViewDidLoad() {
    this.service.findAll().subscribe(response => {
      this.categorias = response;
    }),
      error => {
        console.log(error);
      };
  }
}
