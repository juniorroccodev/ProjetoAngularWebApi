import { PessoasService } from './../../pessoas.service';
import { Pessoa } from './../../Pessoa';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css'],
})



export class PessoasComponent implements OnInit {

  //variavel para representar o formulario.
  formulario: any;
  tituloFormulario: string;
  pessoas: Pessoa[];
  nomePessoa: string;
  pessoaId: number;


  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false;

  modalRef: BsModalRef;

    constructor(private pessoasService: PessoasService,
      private modalService: BsModalService) {}

    ngOnInit(): void {

      this.pessoasService.Pegartodos().subscribe(resultado => {
        this.pessoas = resultado;
      });

  }

  ExibirFormularioCadastro(): void{
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    this.tituloFormulario = 'Nova Pessoa';
    this.formulario = new FormGroup({
      nome: new FormControl(null),
      cpf: new FormControl(null),
      email: new FormControl(null),
      telefone: new FormControl(null),
      sexo: new FormControl(null),
      dataNascimento: new FormControl(null)
    });

  }

  ExibirFormularioAtualizacao(pessoaId: number): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

    this.pessoasService.PegarPeloId(pessoaId).subscribe((resultado) => {
      this.tituloFormulario = `Atualizar ${resultado.nome}`;

      this.formulario = new FormGroup({
        pessoaId: new FormControl(resultado.pessoaId),
        nome: new FormControl(resultado.nome),
        cpf: new FormControl(resultado.cpf),
        email: new FormControl(resultado.email),
        telefone: new FormControl(resultado.telefone),
        sexo: new FormControl(resultado.sexo),
        dataNascimento: new FormControl(resultado.dataNascimento)
      });
  });

  }
  //Metodo salvar no Banco de Dados
  EnviarFormulario(): void{
    const pessoa : Pessoa = this.formulario.value;

    if(pessoa.pessoaId > 0){
      this.pessoasService.AtualizarPessoa(pessoa).subscribe((resultado) =>{
        this.visibilidadeFormulario = false;
      this.visibilidadeTabela = true;
      alert('Pessoa atualizada com sucessso');
      this.pessoasService.Pegartodos().subscribe((registros) => {
        this.pessoas = registros
      });
      });


  }  else {
    this.pessoasService.SalvarPessoa(pessoa).subscribe((resultado) => {
      this.visibilidadeFormulario = false;
      this.visibilidadeTabela = true;
      alert('Pessoa cadastrada com sucessso');
      this.pessoasService.Pegartodos().subscribe((registros) => {
        this.pessoas = registros
      });
    });
  }
}

  Voltar(): void{
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }

  ExibirConfirmacaoExclusao(pessoaId: number, nomePessoa: string, conteudoModal: TemplateRef<any>): void{
    this.modalRef = this.modalService.show(conteudoModal);
    this.pessoaId = pessoaId;
    this.nomePessoa = nomePessoa;
  }

  ExcluirPessoa(pessoaId: number){
    this.pessoasService.ExcluirPessoa(pessoaId).subscribe(resultado => {
      this.modalRef.hide();
      alert('Pessoa excluida com sucesso');
      this.pessoasService.Pegartodos().subscribe(registros => {
        this.pessoas = registros;
      });
    });
  }

}
