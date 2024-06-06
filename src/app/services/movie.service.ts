import { Movie } from './../types/movie';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, of, shareReplay, tap } from 'rxjs';
import { tmdbConfig } from '../constants/config';
import { Genre } from '../types/genre';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  isDisplayImage: boolean = false;
  newListGenres: Genre[] = [];
  index: number = 0;
  httpService = inject(HttpClient);

  getPopularMovies() {
    const headers = this.getHeaders();
    return this.httpService.get('https://api.themoviedb.org/3/movie/popular', {
      headers: headers,
    });
  }

  getMovieWithGenre(genreSeqNo: string, page: number = 1) {
    const headers = this.getHeaders();
    return this.httpService.get(
      `
      https://api.themoviedb.org/3/discover/movie`,
      {
        params: {
          page: page,
          with_genres: genreSeqNo,
        },
        headers: headers,
      }
    );
  }

  getMovieDetails(movieSeqNo: string) {
    const headers = this.getHeaders();
    return this.httpService.get(
      `https://api.themoviedb.org/3/movie/${movieSeqNo}`,
      {
        headers: headers,
      }
    );
  }

  getCastAndDirect(movieSeqNo: string) {
    const headers = this.getHeaders();
    return this.httpService.get(
      `https://api.themoviedb.org/3/movie/${movieSeqNo}/credits`,
      {
        headers: headers,
      }
    );
  }

  getKeyYbMovie(movieSeqNo: string) {
    const headers = this.getHeaders();
    return this.httpService.get(
      `https://api.themoviedb.org/3/movie/${movieSeqNo}/videos`,
      {
        headers: headers,
      }
    );
  }

  getSimilarMovie(movieSeqNo: string) {
    const headers = this.getHeaders();
    return this.httpService.get(
      `https://api.themoviedb.org/3/movie/${movieSeqNo}/similar`,
      {
        headers: headers,
      }
    );
  }

  getGenres() {
    const headers = this.getHeaders();
    return this.httpService.get(
      'https://api.themoviedb.org/3/genre/movie/list',
      {
        headers: headers,
      }
    );
  }

  getNowPlayingMovies() {
    const headers = this.getHeaders();
    return this.httpService.get(
      'https://api.themoviedb.org/3/movie/now_playing',
      {
        headers: headers,
      }
    );
  }

  getTopRatedMovies() {
    const headers = this.getHeaders();
    return this.httpService.get(
      'https://api.themoviedb.org/3/movie/top_rated',
      {
        headers: headers,
      }
    );
  }

  getUpcomingMovies() {
    const headers = this.getHeaders();
    return this.httpService.get('https://api.themoviedb.org/3/movie/upcoming', {
      headers: headers,
    });
  }

  getHeaders() {
    let headers = new HttpHeaders();
    headers = headers.append('accept', 'application/json');
    headers = headers.append(
      'Authorization',
      'Bearer ' + tmdbConfig.accessToken
    );
    return headers;
  }

  calculateIMDb(value: number) {
    return Math.ceil(value);
  }

  splitDate(value: string) {
    var splitDate = [];
    splitDate = value.split('-');
    return splitDate;
  }

  // fetchItems(): Observable<Movie[]> {
  //   // let moviesGenre$: Observable<Movie[]>;
  //   // const movie: Movie = {
  //   //   original_title: 'The Spider Within: A Spider-Verse Story',
  //   //   release_date: '2022',
  //   //   vote_average: '9.2',
  //   //   overview: '',
  //   //   poster_path: 'https://swiperjs.com/demos/images/nature-5.jpg',
  //   // };
  //   // moviesGenre$ = of([
  //   //   {
  //   //     original_title: 'The Spider Within: A Spider-Verse Story',
  //   //     release_date: '2022',
  //   //     rating: '9.2',
  //   //     overview: '',
  //   //     backdrop_path: 'https://swiperjs.com/demos/images/nature-5.jpg',
  //   //   },
  //   //   {
  //   //     original_title: 'The Spider Within: A Spider-Verse Story',
  //   //     year: '2022',
  //   //     rating: '9.2',
  //   //     overview: '',
  //   //     backdrop_path: 'https://swiperjs.com/demos/images/nature-5.jpg',
  //   //   },
  //   //   {
  //   //     original_title: 'The Spider Within: A Spider-Verse Story',
  //   //     year: '2022',
  //   //     rating: '9.2',
  //   //     overview: '',
  //   //     backdrop_path: 'https://swiperjs.com/demos/images/nature-5.jpg',
  //   //   },
  //   //   {
  //   //     original_title: 'The Spider Within: A Spider-Verse Story',
  //   //     year: '2022',
  //   //     rating: '9.2',
  //   //     overview: '',
  //   //     backdrop_path: 'https://swiperjs.com/demos/images/nature-5.jpg',
  //   //   },
  //   //   {
  //   //     original_title: 'The Spider Within: A Spider-Verse Story',
  //   //     year: '2022',
  //   //     rating: '9.2',
  //   //     overview: '',
  //   //     backdrop_path: 'https://swiperjs.com/demos/images/nature-5.jpg',
  //   //   },
  //   //   {
  //   //     original_title: 'The Spider Within: A Spider-Verse Story',
  //   //     year: '2022',
  //   //     rating: '9.2',
  //   //     overview: '',
  //   //     backdrop_path: 'https://swiperjs.com/demos/images/nature-5.jpg',
  //   //   },
  //   //   {
  //   //     original_title: 'The Spider Within: A Spider-Verse Story',
  //   //     year: '2022',
  //   //     rating: '9.2',
  //   //     overview: '',
  //   //     backdrop_path: 'https://swiperjs.com/demos/images/nature-5.jpg',
  //   //   },
  //   //   {
  //   //     original_title: 'The Spider Within: A Spider-Verse Story',
  //   //     year: '2022',
  //   //     rating: '9.2',
  //   //     overview: '',
  //   //     backdrop_path: 'https://swiperjs.com/demos/images/nature-5.jpg',
  //   //   },
  //   //   {
  //   //     original_title: 'The Spider Within: A Spider-Verse Story',
  //   //     year: '2022',
  //   //     rating: '9.2',
  //   //     overview: '',
  //   //     backdrop_path: 'https://swiperjs.com/demos/images/nature-5.jpg',
  //   //   },
  //   //   {
  //   //     original_title: 'The Spider Within: A Spider-Verse Story',
  //   //     year: '2022',
  //   //     rating: '9.2',
  //   //     overview: '',
  //   //     backdrop_path: 'https://swiperjs.com/demos/images/nature-5.jpg',
  //   //   },
  //   //   {
  //   //     original_title: 'The Spider Within: A Spider-Verse Story',
  //   //     year: '2022',
  //   //     rating: '9.2',
  //   //     overview: '',
  //   //     backdrop_path: 'https://swiperjs.com/demos/images/nature-5.jpg',
  //   //   },
  //   // ]);
  //    return moviesGenre$;
  // }

  constructor() {}
}
