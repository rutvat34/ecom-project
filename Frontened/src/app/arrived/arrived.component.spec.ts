import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrivedComponent } from './arrived.component';

describe('ArrivedComponent', () => {
  let component: ArrivedComponent;
  let fixture: ComponentFixture<ArrivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrivedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
