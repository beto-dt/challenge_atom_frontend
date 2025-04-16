import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpBaseService {
  protected apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Realiza una petición GET
   * @param endpoint Ruta relativa del endpoint
   * @param params Parámetros de consulta opcionales
   * @param headers Cabeceras HTTP opcionales
   */
  get<T>(endpoint: string, params?: any, headers?: HttpHeaders): Observable<T> {
    const options = {
      params: this.buildParams(params),
      headers
    };

    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, options);
  }

  /**
   * Realiza una petición POST
   * @param endpoint Ruta relativa del endpoint
   * @param body Cuerpo de la petición
   * @param headers Cabeceras HTTP opcionales
   */
  post<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, body, { headers });
  }

  /**
   * Realiza una petición PUT
   * @param endpoint Ruta relativa del endpoint
   * @param body Cuerpo de la petición
   * @param headers Cabeceras HTTP opcionales
   */
  put<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`, body, { headers });
  }

  /**
   * Realiza una petición DELETE
   * @param endpoint Ruta relativa del endpoint
   * @param headers Cabeceras HTTP opcionales
   */
  delete<T>(endpoint: string, headers?: HttpHeaders): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}`, { headers });
  }

  /**
   * Convierte un objeto de parámetros en HttpParams
   */
  private buildParams(params?: any): HttpParams {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key].toString());
        }
      });
    }

    return httpParams;
  }
}
