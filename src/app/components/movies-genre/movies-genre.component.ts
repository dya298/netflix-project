import { STRING_EMPTY } from './../../constants/config';
import { CommonModule } from '@angular/common';
import { Movie } from './../../models/movie';
import { Component, inject } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { ActivatedRoute } from '@angular/router';
import { Genre } from '../../models/genre';
import { GenreService } from '../../services/genre.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { Common } from '../../constants/common-enum';

@Component({
  selector: 'app-movies-genre',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, SpinnerComponent],
  templateUrl: './movies-genre.component.html',
  styleUrl: './movies-genre.component.scss',
})
export class MoviesGenreComponent {
  movies: Movie[] = [];
  genres: Genre[] = [];

  isLoading = false;
  loadedAll = false;
  isFirstLoad = true;
  isDisplayImage!: boolean;
  labelGenre: string = STRING_EMPTY;
  page: number = Common.DEFAULT_PAGE;

  _genreService = inject(GenreService);

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.movies = this.route.snapshot.data['lazyloading_movie_genre'];

    this.route.params.subscribe((params) => {
      this._genreService.LoadGenres().subscribe((result: any) => {
        this.genres = result.genres;
        this.labelGenre =
          this.genres[
            this.genres.findIndex((item) => item.id == params['genreId'])
          ].name;
      });
    });

    this.isDisplayImage = true;

    this.LoadMovieNextPages();

    this.WindowScroll();
  }

  LoadMovieNextPages() {
    this.isLoading = true;

    this.route.params.subscribe((params) => {
      this.movieService
        .LazyLoadingMovieGenre(params['genreId'], this.page)
        .subscribe(async (result: any) => {
          await new Promise((f) => setTimeout(f, Common.TIME_OUT));
          if (result.length) {
            this.movies.push(...result);
          } else {
            this.loadedAll = true;
          }
          this.isLoading = false;
          this.isFirstLoad = false;
        });
    });
  }

  WindowScroll() {
    window.onscroll = () => this.DetectScrollBottom();
  }

  DetectScrollBottom() {
    var sbHeight =
      window.innerHeight * (window.innerHeight / document.body.offsetHeight);
    var limitScrollPage = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );

    if (sbHeight + document.documentElement.scrollTop >= limitScrollPage) {
      if (!this.loadedAll) {
        this.page++;
        this.LoadMovieNextPages();
      }
    }
  }
}
