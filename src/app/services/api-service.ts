import {inject, Injectable} from '@angular/core';
import {API} from "../controller/api";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  api = new API(inject(HttpClient));
  getByDate(date: string) {
    return this.api.getByDate(date);
  }

}
