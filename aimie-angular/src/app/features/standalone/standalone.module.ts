import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { LandingComponent } from './landing/landing.component';
import { CardComponent } from './landing/components/card/card.component';

@NgModule({
  declarations: [LandingComponent, CardComponent],
  imports: [SharedModule],
})
export class StandaloneModule {}
