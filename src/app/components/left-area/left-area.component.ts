import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Genre } from '../../types/genre';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-left-area',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './left-area.component.html',
  styleUrl: './left-area.component.scss',
})
export class LeftAreaComponent {
  listGenres: Genre[] = [];
  movieService = inject(MovieService);
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.movieService.getGenres().subscribe((result: any) => {
      this.listGenres = result.genres;
    });
  }

  onClickGenre(index: number) {
    this.router.navigate(['genre', index], {
      relativeTo: this.route,
    });
  }
}
