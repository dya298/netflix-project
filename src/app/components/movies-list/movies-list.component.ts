import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { MaterialModule } from '../../modules/materials.module';
import { MovieCategoryComponent } from '../movie-category/movie-category.component';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../types/movie';
import { tmdbConfig } from '../../constants/config';
import SwiperCore from 'swiper';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { ActivatedRoute, Router } from '@angular/router';
SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [CommonModule, MovieCategoryComponent, MaterialModule],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class MoviesListComponent {
  movieService = inject(MovieService);

  popularMovie: Movie[] = [];
  nowPlayingMovie: Movie[] = [];
  topRatedMovie: Movie[] = [];
  upComingMovie: Movie[] = [];
  moviesBanner: Movie[] = [];
  backDropPath: string = '';
  idMovie: number = 0;
  originalTitle: string = '';
  overView: string = '';
  posterPath: string = '';
  voteAverage: number = 0;
  releaseDate: string = '';
  tmdbConfig = tmdbConfig;
  bannerMovie!: Movie;

  constructor(private route: ActivatedRoute, private router: Router) {}

  onChangeBanner(movie: Movie) {
    this.backDropPath = movie.backdrop_path;
    this.originalTitle = movie.original_title;
    this.overView = movie.overview;
    this.posterPath = movie.poster_path;
    this.voteAverage = this.movieService.calculateIMDb(movie.vote_average);
    this.releaseDate = this.movieService.splitDate(movie.release_date)[0];
    this.idMovie = movie.id;
  }

  ngOnInit() {
    this.movieService.getPopularMovies().subscribe((result: any) => {
      this.popularMovie = result.results;

      for (let i = 0; i < 7; i++) {
        this.moviesBanner.push(this.popularMovie[i]);
      }

      this.backDropPath = this.moviesBanner[0].backdrop_path;
      this.originalTitle = this.moviesBanner[0].original_title;
      this.overView = this.moviesBanner[0].overview;
      this.posterPath = this.moviesBanner[0].poster_path;
      this.voteAverage = this.movieService.calculateIMDb(
        this.moviesBanner[0].vote_average
      );
      this.releaseDate = this.movieService.splitDate(
        this.moviesBanner[0].release_date
      )[0];
    });

    this.movieService.getNowPlayingMovies().subscribe((result: any) => {
      this.nowPlayingMovie = result.results;
    });
    this.movieService.getTopRatedMovies().subscribe((result: any) => {
      this.topRatedMovie = result.results;
    });
    this.movieService.getUpcomingMovies().subscribe((result: any) => {
      this.upComingMovie = result.results;
    });
  }

  onClickWatchTrailers(idMovie: number) {
    this.router.navigate(['movies', idMovie], {
      relativeTo: this.route.parent,
    });
  }
}
