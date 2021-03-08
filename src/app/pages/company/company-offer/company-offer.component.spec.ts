import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyOfferComponent } from './company-offer.component';

xdescribe('CompanyOfferComponent', () => {
  let component: CompanyOfferComponent;
  let fixture: ComponentFixture<CompanyOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
