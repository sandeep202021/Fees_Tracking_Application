import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagemasterComponent } from './packagemaster.component';

describe('PackagemasterComponent', () => {
  let component: PackagemasterComponent;
  let fixture: ComponentFixture<PackagemasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackagemasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackagemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
