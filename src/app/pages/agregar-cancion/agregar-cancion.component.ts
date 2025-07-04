import { Component, OnInit, NgZone } from '@angular/core';
import { FormsModule, ReactiveFormsModule, 
  FormGroup, FormBuilder, 
  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CancionService } from '../../services/cancion.service';

@Component({
  selector: 'app-agregar-cancion',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './agregar-cancion.component.html',
  styleUrl: './agregar-cancion.component.css'
})
export class AgregarCancionComponent implements OnInit {

  cancionForm: FormGroup = new FormGroup({});
  enviado: boolean = false;

  cancionGenero: string[] = [
    'Pop', 'Rock', 'Hip Hop', 'Rap', 
    'Classic', 'Jazz', 'Electronic', 
    'Funk', 'Country', 'Acoustic'
  ];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router, 
    private ngZone: NgZone,
    private cancionService: CancionService
  ) {
    this.mainForm();
  }

  ngOnInit(): void {}

  mainForm() {
    this.cancionForm = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      artista: ['', [Validators.required]],
      album: ['', [Validators.required]],
      anio: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{4}$')
      ]]
    });
  }

  actualizarGenero(event: Event): void {
    const seleccionarElemento = event.target as HTMLSelectElement;
    const generoSeleccionado = seleccionarElemento.value;
    this.cancionForm.get('genero')?.setValue(generoSeleccionado);
  }

  get myForm() {
    return this.cancionForm.controls;
  }

  onSubmit(): void {
    this.enviado = true;

    if (this.cancionForm.invalid) {
      return;
    }

    this.cancionService.agregarCancion(this.cancionForm.value).subscribe({
      complete: () => {
        console.log('Canción agregada correctamente');
        this.ngZone.run(() => this.router.navigateByUrl('/listar-cancion'));
      }
    });
  }
}
