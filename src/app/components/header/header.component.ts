import { Component, inject } from '@angular/core';
import { LOGO_URL } from '../../constants/config';
import { CommonModule } from '@angular/common';
import { DropdownMenuUserComponent } from './dropdown-menu-user/dropdown-menu-user.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, DropdownMenuUserComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  logoUrl = LOGO_URL;

  _route = inject(ActivatedRoute);
  _router = inject(Router);

  onClickLogo() {
    this._router.navigate(['/'], { relativeTo: this._route.parent });
  }
}
