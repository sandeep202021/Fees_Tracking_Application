import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutemasterComponent } from './institutemaster.component';

describe('InstitutemasterComponent', () => {
  let component: InstitutemasterComponent;
  let fixture: ComponentFixture<InstitutemasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstitutemasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstitutemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
