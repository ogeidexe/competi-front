import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CadastroServiceService } from './cadastro-service.service';
import { Empresa } from '../models/empresa';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  cadastroForm:FormGroup;
  spinner = false;
  errorShow = false;
  errorText:string;
  empresa:Empresa;
  buttonText:string;
  constructor(public cadastroServide: CadastroServiceService) { }
  cnpjAction(cadastroForm:FormGroup){
    if(cadastroForm.get('cnpj').value.length > 12 ){
      this.spinner = true;
      this.cadastroServide.validateCnpj(cadastroForm.get('cnpj').value).subscribe( dados => {
        this.empresa =  dados;
        if(this.empresa.atividade_principal[0].code != undefined){
          this.errorShow = false;
          cadastroForm.get('nome').setValue(this.empresa.nome);
          cadastroForm.get('fantasia').setValue(this.empresa.fantasia);
          cadastroForm.get('telefone').setValue(this.empresa.telefone);
          cadastroForm.get('cnae').setValue(String(this.empresa.atividade_principal[0].code).replace(/[^A-Z0-9]+/ig,""));
          cadastroForm.get('logradouro').setValue(this.empresa.logradouro);
          cadastroForm.get('numero').setValue(this.empresa.numero);
          cadastroForm.get('bairro').setValue(this.empresa.bairro);
          cadastroForm.get('cep').setValue(this.empresa.cep);
          cadastroForm.get('cidade').setValue(this.empresa.municipio);
          cadastroForm.get('estado').setValue(this.empresa.uf);
        } else {
          this.errorShow = true;
          this.errorText = "CNPJ invalido";
        }
        
        
      },erro => {
        if(erro.status == 0){
          this.errorShow = true;
          this.errorText = `
          Demasiado número de tentativas ou
          CNPJ não encontrado
          aguarde alguns minutos e tente novamente`;
          this.spinner = false;
          console.log(erro);
        }
      },() =>
      this.spinner = false
      )
    }
  }
  ngOnInit(): void {
    if(true){
      this.cadastroForm =  new FormGroup({
        cnpj: new FormControl('',Validators.required),
        nome: new FormControl('',Validators.required), 
        fantasia: new FormControl('',Validators.required),
        telefone: new FormControl('',Validators.required), 
        cnae: new FormControl('',Validators.required),
        logradouro: new FormControl('',Validators.required),
        numero: new FormControl('',Validators.required),
        bairro: new FormControl('',Validators.required),
        cep: new FormControl('',Validators.required),
        cidade: new FormControl('',Validators.required),
        estado: new FormControl('',Validators.required),
        observacao : new FormControl(''),
        isChecked:new FormControl(false)
      });
      this.buttonText = "Cadastro";
      
    }else{
      this.cadastroForm =  new FormGroup({
        cnpj: new FormControl('',Validators.required),
        nome: new FormControl('',Validators.required), 
        fantasia: new FormControl('',Validators.required),
        telefone: new FormControl('',Validators.required), 
        cnae: new FormControl('',Validators.required),
        logradouro: new FormControl('',Validators.required),
        numero: new FormControl('',Validators.required),
        bairro: new FormControl('',Validators.required),
        cep: new FormControl('',Validators.required),
        cidade: new FormControl('',Validators.required),
        estado: new FormControl('',Validators.required),
        observacao : new FormControl(''),
        isChecked:new FormControl(false)
      })
      this.buttonText = "Salvar";
    }
    
  }
  onSubmit(){
    console.log("ai")
  }
  
}
