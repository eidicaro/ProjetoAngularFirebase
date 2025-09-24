import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  usuario: any = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  message: any;

  constructor(
    public apiservice: ApiService,
    private router: Router 
  ){}

  registrar() {
    this.apiservice.post('usuario/registrar', this.usuario).subscribe({
      // manda as infos do baguio para a rota
      next: (resp: any) => {
        alert('Usuário registrado com sucesso!');
        localStorage.setItem('user_name', this.usuario.name);
        // guarda o nome no localstorage para usar dps
        this.router.navigate(['/posts']);
        // manda para a rota do post dps do alert
      },
      error: (err) => {
        // Se já existir, tenta logar
        if (err.status === 422) {
          this.apiservice.post('usuario/login', {
            // puxa a rota de login para tentar logar se der erro no registro
            email: this.usuario.email,
            password: this.usuario.password
            // verifica se as infos bate, com algo do banco
          }).subscribe({
            next: (loginResp: any) => {
              alert('Login realizado com sucesso!');
              localStorage.setItem('user_name', loginResp.name);
              this.router.navigate(['/posts']);
            },
            error: () => {
              alert('Erro ao logar. Verifique suas credenciais.');
            }
          });
        } else {
          alert('Erro inesperado ao registrar usuário.');
          // se tudo der errado joga pra cá
        }
      }
    });
  }
  }

