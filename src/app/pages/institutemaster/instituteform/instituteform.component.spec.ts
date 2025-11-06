import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteformComponent } from './instituteform.component';

describe('InstituteformComponent', () => {
  let component: InstituteformComponent;
  let fixture: ComponentFixture<InstituteformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstituteformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstituteformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
