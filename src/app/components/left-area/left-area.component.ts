import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Genre } from '../../models/genre';
import { MovieService } from '../../services/movie.service';
import { GenreService } from '../../services/genre.service';

@Component({
  selector: 'app-left-area',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './left-area.component.html',
  styleUrl: './left-area.component.scss',
})
export class LeftAreaComponent {
  genres: Genre[] = [];

  movieService = inject(MovieService);
  _genreService = inject(GenreService);
  _route = inject(ActivatedRoute);
  _router = inject(Router);

  ngOnInit() {
    this._genreService.LoadGenres().subscribe((result: any) => {
      this.genres = result.genres;
    });
  }

  onClickGenre(index: number) {
    this._router.navigate(['genre', index], {
      relativeTo: this._route,
    });
  }
}
