import { EstadoDTO } from "./../../models/estado.dto";
import { EstadoService } from "../../services/domain/estado.service";
import { MenuController } from "ionic-angular/components/app/menu-controller";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CidadeService } from "../../services/domain/cidade.service";
import { CidadeDTO } from "../../models/cidade.dto";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class SignupPage {
  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public menu: MenuController,
    public estadoService: EstadoService,
    public cidadeService: CidadeService
  ) {
    this.formGroup = this.formBuilder.group({
      nome: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(120)
        ]
      ],
      email: ["", [Validators.required, Validators.email]],
      tipo: ["", [Validators.required]],
      cpfOuCnpj: ["", [Validators.minLength(11), Validators.maxLength(14)]],
      senha: ["", [Validators.required]],
      logradouro: ["", [Validators.required]],
      numero: ["", [Validators.required]],
      complemento: ["", []],
      bairro: ["", []],
      cep: ["", Validators.required],
      telefone1: ["", [Validators.required]],
      telefone2: ["", []],
      telefone3: ["", []],
      estadoId: [null, [Validators.required]],
      cidadeId: [null, [Validators.required]]
    });
  }

  ionViewDidLoad() {
    this.estadoService.findAll().subscribe(response => {
      this.estados = response;
      this.formGroup.controls.estadoId.setValue(this.estados[0].id);
      this.updateCidades();
    });
  }

  updateCidades() {
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id).subscribe(
      response => {
        this.cidades = response;
        this.formGroup.controls.cidadeId.setValue(null);
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
}
