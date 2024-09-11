import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishyComponent } from './wishy.component';

describe('WishyComponent', () => {
  let component: WishyComponent;
  let fixture: ComponentFixture<WishyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WishyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
