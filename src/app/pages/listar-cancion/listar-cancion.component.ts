import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CancionService } from '../../services/cancion.service';

@Component({
  selector: 'app-listar-cancion',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './listar-cancion.component.html',
  styleUrls: ['./listar-cancion.component.css']
})
export class ListarCancionComponent implements OnInit {
  canciones: any = [];

  constructor(private cancionService: CancionService) {
    this.getCanciones();
  }

  ngOnInit(): void {}

  getCanciones(): void {
    this.cancionService.getCanciones().subscribe((data) => {
      this.canciones = data;
    });
  }

  eliminarCancion(cancion: any, index: number) {
    if (window.confirm('¿Estás seguro que la deseas eliminar?')) {
      this.cancionService.eliminarCancion(cancion._id).subscribe(() => {
        this.canciones.splice(index, 1);
      });
    }
  }
}
