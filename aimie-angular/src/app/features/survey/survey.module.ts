import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SurveyComponent } from './survey.component';
import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyService } from './survey.service';

@NgModule({
  declarations: [SurveyComponent],
  imports: [SharedModule, SurveyRoutingModule],
  providers: [SurveyService],
})
export class SurveyModule {}
