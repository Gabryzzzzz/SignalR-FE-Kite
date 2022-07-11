import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-chat',
  templateUrl: './page-chat.component.html',
  styleUrls: ['./page-chat.component.scss']
})
export class PageChatComponent implements OnInit {

  logged: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

}
