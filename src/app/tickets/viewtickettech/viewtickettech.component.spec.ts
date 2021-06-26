import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtickettechComponent } from './viewtickettech.component';

describe('ViewtickettechComponent', () => {
  let component: ViewtickettechComponent;
  let fixture: ComponentFixture<ViewtickettechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewtickettechComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewtickettechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
