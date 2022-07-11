import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CChatRoomComponent } from './c-chat-room.component';

describe('CChatRoomComponent', () => {
  let component: CChatRoomComponent;
  let fixture: ComponentFixture<CChatRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CChatRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CChatRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
