import { Component, OnInit } from '@angular/core';
import { user } from 'src/models/users';
import { EmitterService } from 'src/services/emitter.service';
import { SignalrService } from 'src/services/signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public emitter_service: EmitterService,
    public signalr_service: SignalrService) { }

  ngOnInit(): void {

    this.emitter_service.connect.subscribe(user => {
      console.log(user);

      this.connect_signalr(user)
    })

  }

  connect_signalr(user: user) {
    console.log("In connection");

    this.signalr_service.init_chat_connection(user)
  }

  title = 'SignalrFEAngular';
}
