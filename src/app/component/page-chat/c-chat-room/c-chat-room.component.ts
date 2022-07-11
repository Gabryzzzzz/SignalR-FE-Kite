import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { timer } from 'rxjs';
import { messages_of_the_chat, send_message } from 'src/models/message';
import { user } from 'src/models/users';
import { HttpRequestsService } from 'src/services/http.service';
import { SignalrService } from 'src/services/signalr.service';

@Component({
  selector: 'app-c-chat-room',
  templateUrl: './c-chat-room.component.html',
  styleUrls: ['./c-chat-room.component.scss']
})
export class CChatRoomComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer?: ElementRef;
  @Output() exit_event = new EventEmitter<any>()

  user: user = JSON.parse(localStorage.getItem("user") as string); //Prendo l'utente salvato (se c'è)

  message = ""

  messages: messages_of_the_chat[] = []

  constructor(
    public signalr_service: SignalrService,
    public http: HttpRequestsService) { }

  ngOnInit(): void {

    this.get_message_with_code() //All'entrata faccio la get di tutti i messaggi di quella chat

    this.signalr_service.chat_listener() //Avvio il listner dei messaggi
    this.signalr_service.message_emitter.subscribe(res => { //Ascolto i messaggi in arriva dall'emitter
      console.log("Message from the hub", res);
      this.messages.push(res) //Aggiungo i messaggi alla lista
      this.scrollToBottom();
    })


  }

  get_message_with_code() {
    this.http.get("api/Chat/GetMessages?chat_code=" + this.user.ChatCode).subscribe(res => {
      console.log("Message from the http get", res);
      this.messages = res //Aggiungo i messaggi 'vecchi' alla lista dei messaggi
      this.scrollToBottom(); //Scrollo semplicemente la chat in fondo
    })
  }

  send_message_fun() {

    let send_message_request: send_message = { //Preparo il messaggio
      chat_code: this.user.ChatCode,
      sender: this.user.UserName,
      msg: this.message
    }

    this.message = ""

    this.http.post("api/Chat/SendMessage", send_message_request).subscribe(res => { //Lo invio per HTTP
      console.log("Message from the http", res);
    })

  }

  exit() {
    localStorage.removeItem("user") //Rimuovo l'utente salvato simulando un logout
    this.exit_event.emit()
  }

  scrollToBottom(): void {
    console.log("Scroll on bottom");
    timer(100).subscribe(res => {
      try {
        this.myScrollContainer!.nativeElement.scrollTop = this.myScrollContainer!.nativeElement.scrollHeight;
      } catch (err) { }
    })
  }

}
