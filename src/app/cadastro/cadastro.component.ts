import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CadastroServiceService } from './cadastro-service.service';
import { Empresa } from '../models/empresa';
import { HomePageService } from '../home-page/home-page.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, filter, scan } from 'rxjs/operators';
import { EmptyError } from 'rxjs';


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
  id:string;
  constructor(
    public cadastroService: CadastroServiceService,
    public homePageService: HomePageService,
    public route: ActivatedRoute,
    public router: Router,
    ) { }
    cnpjAction(cadastroForm:FormGroup){
      if(cadastroForm.get('cnpj').value.length > 12 ){
        this.spinner = true;
        this.cadastroService.validateCnpj(cadastroForm.get('cnpj').value).subscribe( dados => {
          console.log(dados)
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
      this.route.queryParams.subscribe(params => {
        if(params.id){
          this.homePageService.obterEmpresa(params.id).subscribe(empresa => {
            this.cadastroForm =  new FormGroup({
              id: new FormControl(empresa.id),
              cnpj: new FormControl(empresa.cnpj,Validators.required),
              nome: new FormControl(empresa.nome,Validators.required), 
              fantasia: new FormControl(empresa.fantasia,Validators.required),
              telefone: new FormControl(empresa.telefone,Validators.required), 
              cnae: new FormControl(empresa.cnae,Validators.required),
              logradouro: new FormControl(empresa.cidade,Validators.required),
              numero: new FormControl(empresa.numero,Validators.required),
              bairro: new FormControl(empresa.bairro,Validators.required),
              cep: new FormControl(empresa.cep,Validators.required),
              cidade: new FormControl(empresa.cidade,Validators.required),
              estado: new FormControl(empresa.estado,Validators.required),
              observacao : new FormControl(empresa.observacao),
              isChecked:new FormControl(empresa.observacao ? true : false),
        
            });
            this.buttonText = "Salvar";
          })
        }else{
          this.cadastroForm =  new FormGroup({
            id: new FormControl(''),
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
        }
      });    
    }
    onSubmit(empresa:Empresa){
      console.log(empresa)
      if(empresa.id === undefined || empresa.id == ''){
        this.homePageService.criarEmpresa(empresa).subscribe(
          dados => {
            console.log(dados);
            this.router.navigate(['/']);
          },
          erro => console.log(erro),
          );
        }else{
          this.homePageService.editarEmpresa(empresa.id,empresa).subscribe(
            dados => {
              console.log(dados);
              this.router.navigate(['/']);
            },
            erro => console.log(erro),
            );
      }
    }
  }
    