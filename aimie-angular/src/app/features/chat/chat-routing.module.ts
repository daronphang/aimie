import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { RoutePath } from '@core/constants/route.constant';
import { ChatComponent } from '@chat/chat.component';

const routes: Routes = [{ path: '', component: ChatComponent, data: { animation: 'chatPage' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoutingModule {}
