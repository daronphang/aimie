import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Input() route: ActivatedRoute;
  public backIcon = faArrowLeft;

  constructor(private router: Router) {}

  public goBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
