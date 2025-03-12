import { Component } from '@angular/core';
import { AuthenticateService } from '../services/auth.service';
import { CrudService } from '../services/crud.service';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { MessageService } from '../services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    perfil: any = {
      nome: null,
      profissao: null,
      nome_usuario: null,
      idioma: null,
      localidade: null,
      data_inicio: null,
      biografia: null,
      estatisticas: {
        curtidas: 0,
        seguidores: 0,
        amigos: 0,
      },
      postagens:[
        {
          texto: 'aoba meus fio',
          data: '12/03/2025',
          foto: 'data:image/jpeg;base64,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',
          nome: 'Miguelito',
          nome_usuario: '@ElMiguelito',
        },
        {
          texto: 'el panarero com el pão plim plim...',
          data: '12/03/2025',
          foto: 'data:image/jpeg;base64,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',
          nome: 'Miguelito',
          nome_usuario: '@ElMiguelito',
        },
        {
          texto: 'efwu9prhgpwqeghwpethgwp9rthgwptuhgwtjrhgwprtuhpojfgwprtiwjrtiohgwrth',
          data: '30/03/2025',
          foto: 'data:image/jpeg;base64,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',
          nome: 'Miguelito',
          nome_usuario: '@ElMiguelito',
        },
      ]
    };

    constructor(){}

}
