import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfmodalComponent } from './pdfmodal.component';

describe('PdfmodalComponent', () => {
  let component: PdfmodalComponent;
  let fixture: ComponentFixture<PdfmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
