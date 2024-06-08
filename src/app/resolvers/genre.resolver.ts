import { Movie } from './../models/movie';
import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ResolveFn,
} from '@angular/router';
import { Observable } from 'rxjs';
import { MovieService } from '../services/movie.service';

export const LazyLoadingMovieGenreResolver: ResolveFn<Movie[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<Movie[]> => {
  return inject(MovieService).LazyLoadingMovieGenre(route.params['genreId']);
};
