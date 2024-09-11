import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesdetComponent } from './categoriesdet.component';

describe('CategoriesdetComponent', () => {
  let component: CategoriesdetComponent;
  let fixture: ComponentFixture<CategoriesdetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesdetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriesdetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
