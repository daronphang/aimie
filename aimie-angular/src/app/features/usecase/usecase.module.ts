import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { UsecaseComponent } from './usecase.component';
import { UsecaseRoutingModule } from './usecase-routing.module';

@NgModule({
  declarations: [UsecaseComponent],
  imports: [SharedModule, UsecaseRoutingModule],
})
export class UsecaseModule {}
