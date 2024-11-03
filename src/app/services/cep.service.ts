import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endereco } from '../models/endereco';

@Injectable({
  providedIn: 'root'
})
export class CepService {
  constructor(private http: HttpClient) { }

  getEnderecoByCep(cep: string): Observable<Endereco> {
    return this.http.get<Endereco>(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
