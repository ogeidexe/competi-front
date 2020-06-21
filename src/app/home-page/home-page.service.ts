import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Empresa } from '../models/empresa';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

 
  baseURL = 'http://172.17.0.4:8000/api'

  constructor(private http: HttpClient) { }
  
  obterEmpresas():Observable<Empresa[]>{
    return this.http.get<Empresa[]>(`${this.baseURL}/empresas`) 
  }
  
  obterEmpresa(id):Observable<Empresa>{
    return this.http.get<Empresa>(`${this.baseURL}/empresa/${id}`)
  }

  removerEmpresa(id):Observable<Empresa>{
    return this.http.delete<Empresa>(`${this.baseURL}/empresa/${id}`)
  }
  
  criarEmpresa(empresa:Empresa):Observable<Empresa>{
    empresa.cidade =  empresa.municipio;
    empresa.estado =  empresa.uf;
    return this.http.post<Empresa>(`${this.baseURL}/empresa`, empresa)
  }
  
  editarEmpresa(id, empresa: Empresa):Observable<Empresa>{
    return this.http.put<Empresa>(`${this.baseURL}/empresa/${id}`,empresa)
  }
}
