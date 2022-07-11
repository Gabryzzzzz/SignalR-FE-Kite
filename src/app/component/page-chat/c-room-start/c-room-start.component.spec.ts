import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRoomStartComponent } from './c-room-start.component';

describe('CRoomStartComponent', () => {
  let component: CRoomStartComponent;
  let fixture: ComponentFixture<CRoomStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRoomStartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CRoomStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
