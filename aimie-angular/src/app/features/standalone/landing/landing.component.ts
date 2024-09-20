import { Component } from '@angular/core';
import { RoutePath } from '@core/constants/route.constant';
import { LandingCard } from './components/card/card.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  public buttons: LandingCard[] = [
    {
      title: 'Chat',
      subtitle: 'Ask AIMie any questions you have',
      content: "Let's start a new conversation!",
      imageUrl: '/assets/images/chat2.png',
      class: 'card--chat',
      navigateUrl: RoutePath.CHAT,
    },
    {
      title: 'Challenge',
      subtitle: 'Challenge AIMie to a game of Human vs AI!',
      content: 'Challenge AIMie to a game of Human vs AI!',
      imageUrl: '/assets/images/challenge2.png',
      class: 'card--quiz',
      navigateUrl: RoutePath.QUIZ,
    },
    {
      title: 'Usecases',
      subtitle: 'Learn more about the usecases from AI XP Centre',
      content: 'Learn more about the usecases from AI XP Centre',
      imageUrl: '/assets/images/usecase2.png',
      class: 'card--usecase',
      navigateUrl: RoutePath.USECASE,
    },
    {
      title: 'Connect',
      subtitle: 'Tell us about your feedback and connect with us',
      content: 'Tell us about your feedback',
      imageUrl: '/assets/images/connect2.png',
      class: 'card--connect',
      navigateUrl: RoutePath.SURVEY,
    },
  ];

  constructor() {}
}
