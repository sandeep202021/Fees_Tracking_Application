import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveInstituteComponent } from './active-institute.component';

describe('ActiveInstituteComponent', () => {
  let component: ActiveInstituteComponent;
  let fixture: ComponentFixture<ActiveInstituteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveInstituteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveInstituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
