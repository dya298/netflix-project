import { Movie } from './../models/movie';
import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ResolveFn,
} from '@angular/router';
import { Observable } from 'rxjs';
import { MovieService } from '../services/movie.service';

export const MovieDetailsResolver: ResolveFn<Movie> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<Movie> => {
  return inject(MovieService).LoadDetailsMovie(route.params['movieId']);
};

export const SimilarMovieResolver: ResolveFn<Movie[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<Movie[]> => {
  return inject(MovieService).LoadSimilarMovies(route.params['movieId']);
};
