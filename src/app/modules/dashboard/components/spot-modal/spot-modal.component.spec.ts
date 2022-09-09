import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotModalComponent } from './spot-modal.component';

describe('SpotModalComponent', () => {
  let component: SpotModalComponent;
  let fixture: ComponentFixture<SpotModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
