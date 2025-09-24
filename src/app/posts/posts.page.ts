import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {
  posts: any[] = [];
  newPost: any = {
    user_name: '', // será preenchido pelo negocio do localstorage
    description: '',
    content: '',
    picture: ''
  };

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.newPost.user_name = localStorage.getItem('user_name') || 'Anônimo'; // preenche o nome do localstorage
    this.loadPosts(); //chama a função para carregar 
  }

  loadPosts() {
    this.apiService.get('posts').subscribe((res: any) => this.posts = res);
    // carrega os todos os posts da tabela
  }

  addPost() {
    if (!this.newPost.content) return;

    this.apiService.post('posts', this.newPost).subscribe(() => {
      this.newPost.content = '';
      this.newPost.description = '';
      this.newPost.picture = '';
      // joga as infos do post
      this.loadPosts();
      // recarrega os posts dps de mandar pro banco
    });
  }
}