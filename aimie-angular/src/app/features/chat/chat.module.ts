import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ChatComponent } from './chat.component';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatService } from './chat.service';

@NgModule({
  declarations: [ChatComponent],
  imports: [SharedModule, ChatRoutingModule],
  providers: [ChatService],
})
export class ChatModule {}
