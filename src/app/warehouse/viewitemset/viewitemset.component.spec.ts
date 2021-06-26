import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewitemsetComponent } from './viewitemset.component';

describe('ViewitemsetComponent', () => {
  let component: ViewitemsetComponent;
  let fixture: ComponentFixture<ViewitemsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewitemsetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewitemsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
