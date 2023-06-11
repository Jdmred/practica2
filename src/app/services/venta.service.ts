import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VentaI } from 'src/models/venta';
@Injectable({
  providedIn: 'root'
})
export class VentaService {
  api_url = 'http://localhost:4000'
  base_path = `${this.api_url}/ventas/`
  base_path2 = `${this.api_url}/venta/`

  constructor(private http: HttpClient) { }

  getAllVenta(): Observable<{venta:VentaI[]}>{
    return this.http.get<{venta:VentaI[]}>(this.base_path)
  }

  getOneVenta(id: number): Observable<{venta:VentaI[]}>{
    return this.http.get<{venta:VentaI[]}>(`${this.base_path2}${id}`)
  }

  createVenta(data: any):Observable<VentaI>{
    return this.http.post<VentaI>(this.base_path2, data)
    // return this.http.post<VentaI>(this.base_path_django, data)
  }

  updateVenta(id: number, data: VentaI): Observable<VentaI> {
    return this.http.put<VentaI>(`${this.base_path2}${id}`, data);
    // return this.http.put<VentaI>(`${this.base_path_django}${id}`, data);
  }

  deleteVenta(id: number): Observable<VentaI> {
    return this.http.delete<VentaI>(`${this.base_path2}${id}`);
    // return this.http.delete<VentaI>(`${this.base_path_django}${id}`);
  }
}
