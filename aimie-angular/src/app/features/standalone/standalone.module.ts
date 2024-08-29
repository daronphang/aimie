import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { LandingComponent } from './landing/landing.component';

@NgModule({
  declarations: [LandingComponent],
  imports: [SharedModule],
})
export class StandaloneModule {}
