import { EventEmitter, Injectable, Output } from '@angular/core';
import { user } from 'src/models/users';

@Injectable({ providedIn: 'root' })
export class EmitterService {
  constructor() { }

  @Output() connect = new EventEmitter<user>()

}
