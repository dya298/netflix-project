import { CommonModule } from '@angular/common';
import { Movie } from './../../types/movie';
import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Genre } from '../../types/genre';

@Component({
  selector: 'app-movies-genre',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
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
  labelGenre: string = '';
  page: number = 1;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.movieService
        .getMovieWithGenre(params['genreSeqNo'], this.page)
        .subscribe((result: any) => {
          this.movies = result.results;
        });
      this.movieService.getGenres().subscribe((result: any) => {
        this.genres = result.genres;
        this.labelGenre =
          this.genres[
            this.genres.findIndex((item) => item.id == params['genreSeqNo'])
          ].name;
      });
    });

    this.isDisplayImage = true;
    this.getMovieNextPages();
    this.WindowScroll();
  }

  getMovieNextPages(): void {
    this.isLoading = true;
    this.route.params.subscribe((params) => {
      this.movieService
        .getMovieWithGenre(params['genreSeqNo'], this.page)
        .subscribe(async (result: any) => {
          await new Promise((f) => setTimeout(f, 1500));
          if (result.results.length) {
            this.movies.push(...result.results);
          } else {
            this.loadedAll = true;
          }
          this.isLoading = false;
          this.isFirstLoad = false;
        });
    });
  }

  WindowScroll() {
    window.onscroll = () => this.DetectBottom();
  }

  DetectBottom(): void {
    var sbHeight =
      window.innerHeight * (window.innerHeight / document.body.offsetHeight);
    var limit = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );

    if (sbHeight + document.documentElement.scrollTop >= limit) {
      if (!this.loadedAll) {
        this.page++;
        this.getMovieNextPages();
      }
    }
  }
}
