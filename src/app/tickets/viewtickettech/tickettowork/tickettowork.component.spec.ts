import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TickettoworkComponent } from './tickettowork.component';

describe('TickettoworkComponent', () => {
  let component: TickettoworkComponent;
  let fixture: ComponentFixture<TickettoworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TickettoworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TickettoworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
