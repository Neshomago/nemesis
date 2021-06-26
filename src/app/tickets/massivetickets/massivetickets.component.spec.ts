import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassiveticketsComponent } from './massivetickets.component';

describe('MassiveticketsComponent', () => {
  let component: MassiveticketsComponent;
  let fixture: ComponentFixture<MassiveticketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MassiveticketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MassiveticketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
