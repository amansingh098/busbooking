import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealLogComponent } from './real-log.component';

describe('RealLogComponent', () => {
  let component: RealLogComponent;
  let fixture: ComponentFixture<RealLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
