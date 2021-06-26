import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteritemComponent } from './registeritem.component';

describe('RegisteritemComponent', () => {
  let component: RegisteritemComponent;
  let fixture: ComponentFixture<RegisteritemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteritemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteritemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
