import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MaterialModule } from '../../modules/materials.module';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../types/movie';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { MovieCategoryComponent } from '../movie-category/movie-category.component';
import { DomSanitizer } from '@angular/platform-browser';
import { tmdbConfig } from '../../constants/config';
import { Crew } from '../../types/crew';
import { Cast } from '../../types/cast';
import { Key } from '../../types/key';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    CommonModule,
    MovieCategoryComponent,
    MaterialModule,
    MovieCardComponent,
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class MovieDetailsComponent {
  @Input() isDisplayImage!: boolean;

  tmdbConfig = tmdbConfig;
  movie!: Movie;
  cast: Cast[] = [];
  crew!: Crew;
  totalCast: string = '';
  keysYoutube: Key[] = [];
  similarMovies: Movie[] = [];
  listUrlYoutube: any[] = [];
  isFinishLoad = true;

  movieService = inject(MovieService);
  private sanitizer = inject(DomSanitizer);

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.isFinishLoad = true;
    this.route.params.subscribe(async (res) => {
      await new Promise((f) => setTimeout(f, 1500));
      this.route.params.subscribe((params) => {
        this.movieService
          .getMovieDetails(params['movieSeqNo'])
          .subscribe((result: any) => {
            this.movie = result;
            this.movie.release_date = this.movieService.splitDate(
              result.release_date
            )[0];
            this.movie.vote_average = this.movieService.calculateIMDb(
              result.vote_average
            );
          });

        this.movieService
          .getCastAndDirect(params['movieSeqNo'])
          .subscribe((result: any) => {
            this.cast = result.cast;
            this.crew = result.crew[0];

            let newTotalString = '';
            if (result.cast.length > 25) {
              for (let index = 0; index < 25; index++) {
                newTotalString += ' ' + this.cast[index].name + ',';
              }
            } else if (result.cast.length < 10) {
              for (let index = 0; index < 25; index++) {
                newTotalString += ' T.B.D' + ',';
              }
            } else {
              for (let index = 0; index < result.cast.length; index++) {
                newTotalString += ' ' + this.cast[index].name + ',';
              }
            }
            this.totalCast = newTotalString.slice(0, -1);
          });

        this.movieService
          .getKeyYbMovie(params['movieSeqNo'])
          .subscribe((result: any) => {
            this.keysYoutube = result.results;
            if (this.keysYoutube.length > 7) {
              this.keysYoutube = this.keysYoutube.slice(0, 7);
            }

            for (let index = 0; index < this.keysYoutube.length; index++) {
              this.listUrlYoutube[index] =
                this.sanitizer.bypassSecurityTrustResourceUrl(
                  `https://youtube.com/embed/${this.keysYoutube[index].key}`
                );
            }
          });

        this.movieService
          .getSimilarMovie(params['movieSeqNo'])
          .subscribe((result: any) => {
            this.similarMovies = result.results;
          });
      });
      this.isFinishLoad = false;
    });
  }

  ngOnChanges() {
    this.isFinishLoad = false;
  }

  onClickMovie(index: number) {
    this.router.navigate(['movies', index], { relativeTo: this.route.parent });
    this.isFinishLoad = true;
  }
}
