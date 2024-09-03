import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export interface LandingCard {
  title: string;
  imageUrl: string;
  class: string;
  subtitle: string;
  content: string;
  navigateUrl: string;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() data: LandingCard;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  protected onNavigate(): void {
    this.router.navigate([this.data.navigateUrl], { relativeTo: this.route });
  }
}
