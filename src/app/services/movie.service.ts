import { Movie } from './../models/movie';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, shareReplay, map } from 'rxjs';
import { STRING_EMPTY, tmdbConfig } from '../constants/config';
import { Cast } from '../models/cast';
import { Common } from '../constants/common-enum';
import { Key } from 'readline';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  _httpService = inject(HttpClient);
  _tmdbConfig = tmdbConfig;

  LoadPopularMovies() {
    const headers = this.GetHeaders();

    return this._httpService.get(`${this._tmdbConfig.apiUrl}/movie/popular`, {
      headers: headers,
    });
  }

  LazyLoadingMovieGenre(
    genreId: string,
    pageMovie: number = Common.DEFAULT_PAGE
  ): Observable<Movie[]> {
    const headers = this.GetHeaders();

    return this._httpService
      .get<Movie[]>(
        `
      ${this._tmdbConfig.apiUrl}/discover/movie`,
        {
          params: {
            page: pageMovie,
            with_genres: genreId,
          },
          headers: headers,
        }
      )
      .pipe(
        map((res: any) => res['results']),
        shareReplay()
      );
  }

  LoadMovieGenre(genreId: string, pageMovie: number = Common.DEFAULT_PAGE) {
    const headers = this.GetHeaders();

    return this._httpService.get(
      `
      ${this._tmdbConfig.apiUrl}/discover/movie`,
      {
        params: {
          page: pageMovie,
          with_genres: genreId,
        },
        headers: headers,
      }
    );
  }

  LoadDetailsMovie(movieId: string): Observable<Movie> {
    const headers = this.GetHeaders();

    return this._httpService
      .get<Movie>(`${this._tmdbConfig.apiUrl}/movie/${movieId}`, {
        headers: headers,
      })
      .pipe(shareReplay());
  }

  LoadCastingMovie(movieId: string) {
    const headers = this.GetHeaders();

    return this._httpService.get(
      `${this._tmdbConfig.apiUrl}/movie/${movieId}/credits`,
      {
        headers: headers,
      }
    );
  }

  LoadKeysYoutubeMovie(movieId: string) {
    const headers = this.GetHeaders();

    return this._httpService.get(
      `${this._tmdbConfig.apiUrl}/movie/${movieId}/videos`,
      {
        headers: headers,
      }
    );
  }

  LoadSimilarMovies(movieId: string): Observable<Movie[]> {
    const headers = this.GetHeaders();
    return this._httpService
      .get<Movie[]>(`${this._tmdbConfig.apiUrl}/movie/${movieId}/similar`, {
        headers: headers,
      })
      .pipe(
        map((res: any) => res['results']),
        shareReplay()
      );
  }

  LoadNowPlayingMovies() {
    const headers = this.GetHeaders();

    return this._httpService.get(
      `${this._tmdbConfig.apiUrl}/movie/now_playing`,
      {
        headers: headers,
      }
    );
  }

  LoadTopRatedMovies() {
    const headers = this.GetHeaders();

    return this._httpService.get(`${this._tmdbConfig.apiUrl}/movie/top_rated`, {
      headers: headers,
    });
  }

  LoadUpcomingMovies() {
    const headers = this.GetHeaders();

    return this._httpService.get(`${this._tmdbConfig.apiUrl}/movie/upcoming`, {
      headers: headers,
    });
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

  TotalCasting(casts: Cast[]) {
    let newTotalString = STRING_EMPTY;

    if (casts.length < Common.MAX_STARTING) {
      casts = casts.splice(Common.VALUE_DEFAULT, casts.length);
    }

    for (let index = Common.VALUE_DEFAULT; index < casts.length; index++) {
      newTotalString += ' ' + casts[index].name + ',';
    }

    let totalCast = newTotalString.slice(
      Common.VALUE_DEFAULT,
      Common.VALUE_VALID
    );

    return totalCast;
  }

  ValidKeysYoutube(keys: Key[]) {
    if (keys.length > Common.MAX_KEYS_YOUTUBE) {
      keys = keys.slice(Common.VALUE_DEFAULT, Common.MAX_KEYS_YOUTUBE);
    }
    return keys;
  }

  SplitReleaseDate(value: string) {
    var splitDate = [];
    splitDate = value.split('-');
    return splitDate;
  }

  constructor() {}
}
