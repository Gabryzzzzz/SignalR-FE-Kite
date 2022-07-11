import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { user } from 'src/models/users';
import { SignalrService } from 'src/services/signalr.service';

@Component({
  selector: 'app-c-room-start',
  templateUrl: './c-room-start.component.html',
  styleUrls: ['./c-room-start.component.scss']
})
export class CRoomStartComponent implements OnInit {

  user: user = new user()

  @Output() logged = new EventEmitter<boolean>()

  constructor(public signalr_service: SignalrService) { }

  ngOnInit(): void {

    if (localStorage.getItem("user")) { //Se trovo un utente loggato, ri-inizializzo la connessione
      this.user = JSON.parse(localStorage.getItem("user") as string)
      this.submit()
    }

  }

  submit() {
    localStorage.setItem("user", JSON.stringify(this.user)) //Salvo i dati dell'utente per la ri connessione
    this.signalr_service.init_chat_connection(this.user).then(() => { //Inizio la connessione con l'hub
      this.logged.emit(true) //Se tutto va bene l'emitter segnala alla pagina di passare alla chat
    })

  }

  make_one() {
    this.user.ChatCode = this.makeid(12)
  }

  makeid(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }


}
