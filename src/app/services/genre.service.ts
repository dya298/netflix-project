import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { tmdbConfig } from '../constants/config';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  _httpService = inject(HttpClient);
  _tmdbConfig = tmdbConfig;

  LoadGenres() {
    const headers = this.GetHeaders();

    return this._httpService.get(
      `${this._tmdbConfig.apiUrl}/genre/movie/list`,
      {
        headers: headers,
      }
    );
  }

  GetHeaders() {
    let headers = new HttpHeaders();

    headers = headers.append('accept', 'application/json');
    headers = headers.append(
      'Authorization',
      'Bearer ' + tmdbConfig.accessToken
    );
    return headers;
  }

  constructor() {}
}
