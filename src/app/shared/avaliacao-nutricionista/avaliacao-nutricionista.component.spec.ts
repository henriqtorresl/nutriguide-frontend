import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliacaoNutricionistaComponent } from './avaliacao-nutricionista.component';

describe('AvaliacaoNutricionistaComponent', () => {
  let component: AvaliacaoNutricionistaComponent;
  let fixture: ComponentFixture<AvaliacaoNutricionistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvaliacaoNutricionistaComponent]
    });
    fixture = TestBed.createComponent(AvaliacaoNutricionistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
