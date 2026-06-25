import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationsIEComponent } from './formations-ie.component';

describe('FormationsIEComponent', () => {
  let component: FormationsIEComponent;
  let fixture: ComponentFixture<FormationsIEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormationsIEComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormationsIEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
