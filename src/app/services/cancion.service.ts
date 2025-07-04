import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CancionService {

  baseUri = 'https://backend-94q3.onrender.com/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Método para agregar una canción
  agregarCancion(data: any): Observable<any> {
    const url = `${this.baseUri}/agregar`;
    return this.http.post(url, data)
      .pipe(catchError(this.errorManager));
  }

  // Método para obtener a todos las canciones
  getCanciones(): Observable<any> {
    const url = `${this.baseUri}/canciones`; // <-- Asegúrate de que este sea el endpoint correcto
    return this.http.get(url)
      .pipe(catchError(this.errorManager));
  }

  // Método para obtener un solo una cancion por su ID
  getCancion(id: any): Observable<any> {
    const url = `${this.baseUri}/cancion/${id}`;
    return this.http.get(url, { headers: this.headers })
      .pipe(
        map((res: any) => res || {}),
        catchError(this.errorManager)
      );
  }

  // Método para actualizar una cancion
  actualizarCancion(id: any, data: any): Observable<any> {
    const url = `${this.baseUri}/actualizar/${id}`;
    return this.http.put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorManager));
  }

  // Método para eliminar una cancion
  eliminarCancion(id: any): Observable<any> {
    const url = `${this.baseUri}/eliminar/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .pipe(catchError(this.errorManager));
  }

  // Manejador de errores
  private errorManager(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = error.error.message;
    } else {
      // Error del lado del servidor
      errorMessage = `Error: ${error.status} \nMensaje: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
