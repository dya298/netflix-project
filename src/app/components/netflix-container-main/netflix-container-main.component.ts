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
import { Movie } from '../../models/movie';
import { IMDB, STRING_EMPTY, tmdbConfig } from '../../constants/config';
import SwiperCore from 'swiper';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { ActivatedRoute, Router } from '@angular/router';
import { Common } from '../../constants/common-enum';
SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

@Component({
  selector: 'app-netflix-container-main',
  standalone: true,
  imports: [CommonModule, MovieCategoryComponent, MaterialModule],
  templateUrl: './netflix-container-main.component.html',
  styleUrl: './netflix-container-main.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class NetflixContainerMainComponent {
  _movieService = inject(MovieService);

  popularMovie: Movie[] = [];
  nowPlayingMovie: Movie[] = [];
  topRatedMovie: Movie[] = [];
  upComingMovie: Movie[] = [];
  moviesBanner: Movie[] = [];

  innerWidth: number = Common.VALUE_DEFAULT;

  bannerMovie!: Movie;

  backDropPath: string = STRING_EMPTY;
  movieId: number = Common.VALUE_DEFAULT;
  originalTitle: string = STRING_EMPTY;
  overView: string = STRING_EMPTY;
  posterPath: string = STRING_EMPTY;
  voteAverage: string = STRING_EMPTY;
  releaseDate: string = STRING_EMPTY;
  stringIMDb: string = IMDB;
  valueDefault = Common.VALUE_DEFAULT;
  maxOverview = Common.MAX_OVERVIEW;

  tmdbConfig = tmdbConfig;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.innerWidth = window.innerWidth;

    this._movieService.LoadPopularMovies().subscribe((result: any) => {
      this.popularMovie = result.results;

      this.moviesBanner = this.popularMovie.slice(
        Common.VALUE_DEFAULT,
        Common.BANNER_MOVIES
      );

      this.onChangeBanner(this.moviesBanner[Common.VALUE_DEFAULT]);
    });

    this._movieService.LoadNowPlayingMovies().subscribe((result: any) => {
      this.nowPlayingMovie = result.results;
    });

    this._movieService.LoadTopRatedMovies().subscribe((result: any) => {
      this.topRatedMovie = result.results;
    });

    this._movieService.LoadUpcomingMovies().subscribe((result: any) => {
      this.upComingMovie = result.results;
    });
  }

  onClickWatchTrailersNow(movieId: number) {
    this.router.navigate(['movies', movieId], {
      relativeTo: this.route.parent,
    });
  }

  onChangeBanner(movie: Movie) {
    this.backDropPath = movie.backdrop_path;
    this.originalTitle = movie.original_title;
    if (this.innerWidth <= Common.SIZE_LG) {
      this.overView = STRING_EMPTY;
    } else {
      this.overView = movie.overview;
    }

    this.posterPath = movie.poster_path;
    this.voteAverage = movie.vote_average.toFixed(Common.DEFAULT_PAGE);
    this.releaseDate = this._movieService.SplitReleaseDate(movie.release_date)[
      Common.VALUE_DEFAULT
    ];
    this.movieId = movie.id;
  }
}
