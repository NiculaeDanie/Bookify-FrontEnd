import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmodalComponent } from './bookmodal.component';

describe('BookmodalComponent', () => {
  let component: BookmodalComponent;
  let fixture: ComponentFixture<BookmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
