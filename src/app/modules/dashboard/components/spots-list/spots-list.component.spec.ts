import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotsListComponent } from './spots-list.component';

describe('SpotsListComponent', () => {
  let component: SpotsListComponent;
  let fixture: ComponentFixture<SpotsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
