import { Component, OnInit } from '@angular/core';
import { HomePageService } from './home-page.service';
import { Empresa } from '../models/empresa';
import { EmptyError } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  empresas:Empresa[];
  constructor(public homePageService: HomePageService) { }
  
  editaEmpresa(){

  }

  listaEmpresas(){
    this.homePageService.obterEmpresas().subscribe(empresas =>{
      this.empresas =  empresas;
    }, error =>{  
       console.log(error)
    });
  }

  removeEmpresa(empresa:Empresa){
    this.homePageService.removerEmpresa(empresa.id).subscribe( body => {
     console.log(body.message);
     this.listaEmpresas();
    }, 
     error =>{
      console.log(error)
      this.listaEmpresas();
    } 
       
    )
  }

  atualizaEmpresa(){

  }

  obtemEmpresaPorId(){

  }
  ngOnInit(): void {
    this.listaEmpresas();
  }

}
