import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelInfoComponent } from './hotel-info.component';

describe('HotelInfoComponent', () => {
  let component: HotelInfoComponent;
  let fixture: ComponentFixture<HotelInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
