import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  cadastroForm:FormGroup;
  checked:boolean;
  constructor() { }

  ngOnInit(): void {
    if(true){
      this.cadastroForm =  new FormGroup({
        cnpj: new FormControl('works'),
        logradouro: new FormControl(''),
        numero: new FormControl(''),
        bairro: new FormControl(''),
        cep: new FormControl(''),
        cidade: new FormControl(''),
        estado: new FormControl(''),
        Observação : new FormControl(''),
      })
    }else{
      this.cadastroForm =  new FormGroup({
        cnpj: new FormControl(''),
        logradouro: new FormControl(''),
        número: new FormControl(''),
        bairro: new FormControl(''),
        cep: new FormControl(''),
        cidade: new FormControl(''),
        estado: new FormControl(''),
        Observação : new FormControl(''),
      })
    }
    
  }
  onSubmit(){
    console.log("ai")
  }

}
