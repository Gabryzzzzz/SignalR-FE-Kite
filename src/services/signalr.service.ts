import { EventEmitter, Injectable, Output } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { messages_of_the_chat } from 'src/models/message';
import { user } from 'src/models/users';

@Injectable({ providedIn: 'root' })
export class SignalrService {

  private connection_chat!: HubConnection; //Inzializzo la connessione
  @Output() message_emitter = new EventEmitter<messages_of_the_chat>() //Questo emitter si occupa di trasportare i messaggi


  //#region chat
  public init_chat_connection(user: user): Promise<void> {
    return new Promise((resolve, reject) => {
      this.connection_chat = new HubConnectionBuilder() //Inizializzo la configurazione per la connessione
        .configureLogging(LogLevel.Information)
        .withUrl( //Qua andrà inserito l'url per la connessione all'hub
          environment.base_url +
          "chathub" + //Nome dell' hub
          '?ChatCode=' + user.ChatCode + //Parametri aggiuntivi possono essere inseriti come query param
          "&UserName=" + user.UserName
        )
        .build();

      this.connection_chat
        .start() //Parte la connessione
        .then(() => {
          console.log(`SignalR connection success! connectionId: ${this.connection_chat} `);
          resolve(); //Se la connessione va a buon fine la promise si risolve
        })
        .catch((error) => {
          console.log(`SignalR connection error: ${error}`);
          reject(); //Altrimenti si ha un reject
        });
    });
  }

  public chat_listener = () => { //Questa funzione si occupa di ascoltare i messaggi dell'hub
    this.connection_chat!.on('message', (message) => { //'message' è il canale in cui il listener ascolta
      if (!message) return;
      this.message_emitter.emit(message)  //Se il messaggio non è null, allora l'emitter propaga il messaggio
    });                                   //basterà fare una subscribe a 'message_emitter'
  };
  //#endregion
}
