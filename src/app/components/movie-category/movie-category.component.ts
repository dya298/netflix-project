import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { Movie } from '../../types/movie';
import SwiperCore from 'swiper';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { ActivatedRoute, Router } from '@angular/router';
import { tmdbConfig } from '../../constants/config';

SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

@Component({
  selector: 'app-movie-category',
  standalone: true,
  imports: [MovieCardComponent],
  templateUrl: './movie-category.component.html',
  styleUrl: './movie-category.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class MovieCategoryComponent {
  @Input() title = '';
  @Input() movieList: Movie[] = [];

  isDisplayImage!: boolean;
  tmdbConfig = tmdbConfig;

  constructor(private route: ActivatedRoute, private router: Router) {}

  onClickMovie(index: number) {
    this.isDisplayImage = false;
    this.router.navigate(['movies', index], { relativeTo: this.route.parent });
  }
}
