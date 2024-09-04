import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { routeAnimations } from '@core/utils/animations';
import { SharedModule } from '@shared/shared.module';
import { StandaloneModule } from '@standalone/standalone.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, SharedModule, StandaloneModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [routeAnimations],
})
export class AppComponent implements OnInit {
  title = 'pdm-angular';

  constructor(private contexts: ChildrenOutletContexts) {}

  ngOnInit(): void {
    this.preloadImages();
  }

  protected getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  private preloadImages() {
    const images: string[] = [
      '/assets/images/background.png',
      '/assets/images/challenge2.png',
      '/assets/images/chat2.png',
      '/assets/images/connect2.png',
      '/assets/images/usecase2.png',
      '/assets/images/quiz-machine.png',
      '/assets/images/quiz-mona.png',
    ];
    images.forEach(row => {
      const img = new Image();
      img.src = row;
    });
  }
}
