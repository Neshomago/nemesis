import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatContactComponent } from './creat-contact.component';

describe('CreatContactComponent', () => {
  let component: CreatContactComponent;
  let fixture: ComponentFixture<CreatContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
