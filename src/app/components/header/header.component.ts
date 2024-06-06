import { Component } from '@angular/core';
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
  constructor(private route: ActivatedRoute, private router: Router) {}
  onClickLogo() {
    this.router.navigate(['/'], { relativeTo: this.route.parent });
  }
}
