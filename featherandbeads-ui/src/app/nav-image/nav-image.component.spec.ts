import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavImageComponent } from './nav-image.component';

describe('NavImageComponent', () => {
  let component: NavImageComponent;
  let fixture: ComponentFixture<NavImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
