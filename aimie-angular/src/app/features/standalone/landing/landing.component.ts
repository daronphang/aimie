import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutePath } from '@core/constants/route.constant';

interface Category {
  title: string;
  text: string;
  class: string;
  path: string;
}
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  public categories: Category[] = [
    {
      title: 'Interact with AIMie',
      text: 'Chat with AIMie and ask any questions you have',
      class: 'category--chat',
      path: RoutePath.CHAT,
    },
    {
      title: 'Can you beat AIMie?',
      text: 'Challenge AIMie to a game of Human vs AI',
      class: 'category--quiz',
      path: RoutePath.QUIZ,
    },
    {
      title: 'Use Cases',
      text: 'Learn more about our individual Use Cases from the AI XP Centre!',
      class: 'category--usecase',
      path: RoutePath.USECASE,
    },
    {
      title: 'Survey',
      text: 'Take part in our survey and connect with us!',
      class: 'category--connect',
      path: RoutePath.SURVEY,
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public onNavigate(path: string): void {
    this.router.navigate([path], { relativeTo: this.route });
  }
}
