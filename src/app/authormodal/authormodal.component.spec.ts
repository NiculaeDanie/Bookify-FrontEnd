import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthormodalComponent } from './authormodal.component';

describe('AuthormodalComponent', () => {
  let component: AuthormodalComponent;
  let fixture: ComponentFixture<AuthormodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthormodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthormodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
