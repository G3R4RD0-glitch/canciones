import { Routes } from '@angular/router';
import { AgregarCancionComponent } from './pages/agregar-cancion/agregar-cancion.component';
import { EditarCancionComponent } from './pages/editar-cancion/editar-cancion.component';
import { ListarCancionComponent } from './pages/listar-cancion/listar-cancion.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'listar-cancion'
  },
  {
    path: 'agregar-cancion',
    component: AgregarCancionComponent
  },
  {
    path: 'editar-cancion/:id',
    component: EditarCancionComponent
  },
  {
    path: 'listar-cancion',
    component: ListarCancionComponent
  },
  {
    path: '**',
    redirectTo: 'listar-cancion'
  }
];
