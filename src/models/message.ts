export class send_message {
  sender: string = "";
  chat_code: string = "";
  msg: string = "";
}

export class messages_of_the_chat extends send_message {
  timestamp: Date = new Date()
}
