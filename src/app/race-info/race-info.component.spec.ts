import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceInfoComponent } from './race-info.component';

describe('RaceInfoComponent', () => {
  let component: RaceInfoComponent;
  let fixture: ComponentFixture<RaceInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaceInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
