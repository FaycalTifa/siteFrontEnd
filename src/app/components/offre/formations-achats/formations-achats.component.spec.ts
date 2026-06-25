import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationsAchatsComponent } from './formations-achats.component';

describe('FormationsAchatsComponent', () => {
  let component: FormationsAchatsComponent;
  let fixture: ComponentFixture<FormationsAchatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormationsAchatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormationsAchatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
