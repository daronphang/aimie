import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsecaseComponent } from './usecase.component';

const routes: Routes = [{ path: '', component: UsecaseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsecaseRoutingModule {}
