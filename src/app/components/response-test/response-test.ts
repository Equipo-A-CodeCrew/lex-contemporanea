import {Component, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommonModule, JsonPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ApiResult, State} from "../../controller/api-result";
import {ApiService} from "../../services/api-service";

const URL : string = `https://www.boe.es/datosabiertos/api/boe/sumario/`;

@Component({
  selector: 'app-response-test',
  imports: [
    CommonModule,
    JsonPipe,
    FormsModule,
  ],
  templateUrl: './response-test.html',
  styleUrl: './response-test.scss',
})
export class ResponseTest {
  cargando = false;
  resultado: any = null;
  verDatos = false;
  date: string = this.getToday();
  apiService = inject(ApiService);
  data: any = "";
  apiResult: ApiResult = new ApiResult();


  constructor(private readonly http: HttpClient) { }

  testBOE() {
    if (!new RegExp(/^\d{8}$/).exec(this.date)) {
      alert('La fecha debe tener formato YYYYMMDD');
      return;
    }

    this.cargando = true;
    this.resultado = null;
    this.verDatos = false;

    this.apiResult = this.apiService.getByDate(this.date);

    this.verDatos = true;
    this.cargando = false;
  }


  getToday(): string {
    const hoy = new Date();
    const yyyy = hoy.getFullYear();
    const mm = ('0' + (hoy.getMonth() + 1)).slice(-2);
    const dd = ('0' + hoy.getDate()).slice(-2);
    return `${yyyy}${mm}${dd}`;
  }

  protected readonly State = State;
}
