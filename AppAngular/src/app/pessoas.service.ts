import { Pessoa } from './Pessoa';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//Configuração do cabeçalho da aquisição Http
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',

  }),
};

@Injectable({
  providedIn: 'root',
})
export class PessoasService {
  url = 'https://localhost:7172/api/pessoas';

  constructor(private http: HttpClient) { }

  Pegartodos(): Observable<Pessoa[]>{ // Conjunto de dados que emite notifição para o Angular
    return this.http.get<Pessoa[]>(this.url);
  }
  PegarPeloId(pessoaId: number): Observable<Pessoa> {
    const apiUrl = `${this.url}/${pessoaId}`;
    return this.http.get<Pessoa>(apiUrl);
  }

  SalvarPessoa(pessoa: Pessoa): Observable<any> {
    return this.http.post<Pessoa>(this.url, pessoa, httpOptions); //Enserindo uma pessoa ao BD, um dado tipo pessoa, e opções do cabeçalho http
  }

  AtualizarPessoa(pessoa: Pessoa): Observable<any> {
    return this.http.put<Pessoa>(this.url, pessoa, httpOptions); //Atualizar uma pessoa, mandando informação do tipo pessoa
  }

  ExcluirPessoa(pessoaId: number): Observable<any> {
    const apiUrl = `${this.url}/${pessoaId}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }
}
