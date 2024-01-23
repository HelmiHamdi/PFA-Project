import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})

export class ChatPage implements OnInit {

  message !: string;
  conversation !: {message: string, response: any}[];
  question : {message: string, response: any}  = { message: '', response: null };

  constructor(private chatService: ChatService, private loadingController: LoadingController) {}

  ngOnInit() : void {
    this.conversation = [];
  }

  async sendMessage() {

    this.question.message = this.message;

    if(this.question.message) {

      const loading = await this.loadingController.create({
        message: 'Loading...',
        spinner: 'dots'
      });
      await loading.present();

      this.chatService.getDataFromOpenAI(this.question.message).subscribe( (res) => {
        this.question.response = res;

        this.conversation.push(this.question);
        this.question = { message: '', response: null };
        this.message = '';

        loading.dismiss();
      });
    }
  }

  doRefresh(ev: any){
    setTimeout(() => {
      ev.target.complete();
    }, 2000);
    this.ngOnInit();
    //window.location.reload();
  }
}
