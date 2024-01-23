import { Injectable } from '@angular/core';
import { Configuration, OpenAIApi } from 'openai';
import { Observable, filter, from, map } from 'rxjs'
import { environment } from 'src/environments/environment';
import * as $ from 'jquery';

const APIKEY = environment.apiKey;
declare var $:any;

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  constructor() {}

  readonly configuration = new Configuration({
    apiKey: APIKEY
  });

  readonly openai = new OpenAIApi(this.configuration);

  getDataFromOpenAI(text: string) : Observable<any> {
    const jQuery = $ as any;

    return from(this.openai.createCompletion({
      model: 'text-davinci-003',
      prompt: text,
      max_tokens: 256,
      temperature: 0.7
    })).pipe(
      filter(resp => !!resp && !!resp.data),
      map(resp => resp.data),
      filter((data: any) => (
        data.choices && data.choices.length > 0 && data.choices[0].text
      )),
      map(data => data.choices[0].text)
    )/*.subscribe(data => {
      console.log(data);
      jQuery('.response').append(`
        <div class="ion-padding">${data}</div> <br>`);
      return data;
    })*/;
  }

}
