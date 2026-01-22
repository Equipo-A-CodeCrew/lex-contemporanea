import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../utils/environment';

@Injectable({
  providedIn: 'root',
})
export class BoeService {
  private readonly baseUrl = environment.boeApiUrl;

  constructor(private readonly http: HttpClient) { }

  getSumario() {
    return this.http.get(this.baseUrl);
  }
}
