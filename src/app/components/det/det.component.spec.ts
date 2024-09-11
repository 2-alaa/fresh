import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetComponent } from './det.component';

describe('DetComponent', () => {
  let component: DetComponent;
  let fixture: ComponentFixture<DetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
