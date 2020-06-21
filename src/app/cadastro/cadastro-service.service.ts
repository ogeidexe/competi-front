import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Empresa } from '../models/empresa';

@Injectable({
  providedIn: 'root'
})
export class CadastroServiceService {

 
  baseURL = 'https://www.receitaws.com.br/v1/cnpj'

  constructor(private http: HttpClient) { }
  handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it   accordingly.
      console.error('An error occurred:',   errorResponse.error.message);
    } 
   else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        'Backend returned code ${errorResponse.status}, '+
        'body was: ${errorResponse.error}');
    }    // return an observable with a user-facing error message
    return throwError(
      'Error Occurred; please try again later.');
  };
  
  validateCnpj(cnpj):Observable<Empresa>{
    return this.http.jsonp<Empresa>(`${this.baseURL}/${cnpj}`,"callback") 
  }
}
