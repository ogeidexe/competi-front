import { Component, OnInit } from '@angular/core';
import { HomePageService } from './home-page.service';
import { Empresa } from '../models/empresa';

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

  removeEmpresa(){

  }

  atualizaEmpresa(){

  }

  obtemEmpresaPorId(){

  }
  ngOnInit(): void {
    this.listaEmpresas();
  }

}
