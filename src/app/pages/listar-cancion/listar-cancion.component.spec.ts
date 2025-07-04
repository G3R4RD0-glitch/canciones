import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCancionComponent } from './listar-cancion.component';

describe('ListarCancionComponent', () => {
  let component: ListarCancionComponent;
  let fixture: ComponentFixture<ListarCancionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarCancionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarCancionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
