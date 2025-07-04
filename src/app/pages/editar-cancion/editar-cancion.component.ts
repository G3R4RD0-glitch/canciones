import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CancionService } from '../../services/cancion.service';
import { Cancion } from '../../models/cancion.model';

@Component({
  selector: 'app-editar-cancion',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './editar-cancion.component.html',
  styleUrl: './editar-cancion.component.css'
})
export class EditarCancionComponent implements OnInit {

  cancionForm: FormGroup = new FormGroup({});
  enviado: boolean = false;
  cancionGenero: string[] = [
    'Pop', 'Rock', 'Hip Hop', 'Rap', 'Classic', 'Jazz', 
    'Electronic', 'Funk', 'Country', 'Acoustic'
  ];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private cancionService: CancionService,
    private actRoute: ActivatedRoute
  ) {
    this.mainForm();
  }

  ngOnInit(): void {
    this.mainForm();
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.getCancion(id);
  }

  mainForm() {
    this.cancionForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      genero: ['', Validators.required],
      artista: ['', Validators.required],
      album: ['', Validators.required],
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

  getCancion(id: any) {
    this.cancionService.getCancion(id).subscribe((data) => {
      this.cancionForm.setValue({
        titulo: data['titulo'],
        genero: data['genero'],
        artista: data['artista'],
        album: data['album'],
        anio: data['anio'],
      });
    });
  }

  onSubmit() {
    this.enviado = true;
    if (this.cancionForm.invalid) {
      return;
    }

    if (window.confirm('¿Estás seguro que deseas modificar la canción?')) {
      const id = this.actRoute.snapshot.paramMap.get('id');
      this.cancionService.actualizarCancion(id, this.cancionForm.value).subscribe({
        complete: () => {
          console.log('Canción actualizada correctamente');
          this.router.navigateByUrl('/listar-cancion');
        },
        error: (e) => {
          console.log('Error al actualizar canción:', e);
        }
      });
    }
  }
}
