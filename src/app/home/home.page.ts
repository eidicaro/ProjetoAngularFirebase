import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthenticateService } from '../services/auth.service';
import { CrudService } from '../services/crud.service';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { MessageService } from '../services/message.service';
import { Router } from '@angular/router';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {

  funcionario:any = {
    nome: null,
    pais:null,
  }

  constructor(
    public apiService: APIService
  ) {
    this.carregarFuncionarios();
  }

  ngOnInit(): void {
    // executa ao iniciar o componente
  }

  ngAfterViewInit(): void {
    // executa quando a view já foi renderizada
  }

  carregarFuncionarios() {
    this.apiService.get('usuarios')
      .subscribe((funcionarios) => {
        console.log(funcionarios);
      });
  }

  cadastrar() {
    this.apiService.post('usuarios', this.funcionario)
      .subscribe((funcionarios) => {
        console.log(funcionarios);
      });
  }
}
