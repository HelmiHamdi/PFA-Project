import { IonRatingStarsModule } from 'ion-rating-stars';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChatPageRoutingModule } from './chat-routing.module';
import { ChatPage } from './chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatPageRoutingModule,
    IonRatingStarsModule
  ],
  declarations: [ChatPage],
  entryComponents: [ChatPage]
})
export class ChatPageModule {}
