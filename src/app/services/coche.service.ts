import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import{CocheI}from 'src/models/coche';

@Injectable({
  providedIn: 'root'
})
export class CocheService {
  api_url = 'http://localhost:4000'
  base_path = `${this.api_url}/coches/`
  base_path2 = `${this.api_url}/coche/`

  constructor(private http: HttpClient) {}
  
  getAllCoche(): Observable<{coche:CocheI[]}>{
    return this.http.get<{coche:CocheI[]}>(this.base_path)
  }


  getOneCoche(id: number): Observable<{coche:CocheI[]}>{
    return this.http.get<{coche:CocheI[]}>(`${this.base_path2}${id}`)
  }

  createCoche(data: any):Observable<CocheI>{
    return this.http.post<CocheI>(this.base_path2, data)
    // return this.http.post<CocheI>(this.base_path_django, data)
  }

  updateCoche(id: number, data: CocheI): Observable<CocheI> {
    return this.http.put<CocheI>(`${this.base_path2}${id}`, data);
    // return this.http.put<CocheI>(`${this.base_path_django}${id}`, data);
  }

  deleteCoche(id: number): Observable<CocheI> {
    return this.http.delete<CocheI>(`${this.base_path2}${id}`);
    // return this.http.delete<CocheI>(`${this.base_path_django}${id}`);
  }
}
