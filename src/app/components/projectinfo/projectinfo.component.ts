import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import Swal from 'sweetalert2';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { obterStatusPorValor, StatusDescricao } from '../../enums/Status';

@Component({
  selector: 'app-projectinfo',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, CommonModule],
  templateUrl: './projectinfo.component.html',
  styleUrl: './projectinfo.component.scss'
})
export class ProjectinfoComponent {
  projectService = inject(ProjectService);
  userService = inject(UserService);

  @Input() project: Project = new Project();
  @Output() retorno = new EventEmitter<string>();

  
  selectedUsers: User[] = [];
  allUsers: User[] = [];

  constructor(){
    this.loadUsers();
  }
  

  obterRiscoPorValorHtml(riskValue: number): string {
    switch (riskValue) {
      case 1: return 'Baixo';
      case 2: return 'Médio';
      case 3: return 'Alto';
      default: return 'Desconhecido';
    }
  }

  proseguir(confirmation: boolean) {  
    Swal.fire({
      title: 'Tem certeza que deseja alteraro status do projeto ' + this.project.nameProject + '?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.projectService.projectProgress(confirmation, this.project.id).subscribe({
          next: (mensagem) => {
            Swal.fire(mensagem, '', 'success');
          },
          error: (erro) => {
            alert('Deu erro');
          },
        });
      }
    });   
  } 

  obterStatusPorValorHtml (numero: number){
    const status = obterStatusPorValor(numero);
    return StatusDescricao[status];
  }

  // Carregar todos os usuários
  loadUsers(): void {
    this.userService.findAll().subscribe(
      (users: User[]) => {
        this.allUsers = users;
      },
      (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
    );
  }

  // Obter nome do usuário pelo ID
  getUserNameById(userId: number): string {
    const user = this.allUsers.find(u => u.id === userId);
    return user ? user.name : 'Usuário não encontrado';
  }

  isUserSelected(userId: number): boolean {
    return this.selectedUsers.some(user => user.id === userId);
  }

  // Alterna a seleção de um usuário
  toggleUserSelection(user: User, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked; // Obtém o estado do checkbox
  
    if (isChecked) {
      // Adiciona o usuário ao array de selecionados
      this.selectedUsers.push(user);
    } else {
      // Remove o usuário do array de selecionados
      this.selectedUsers = this.selectedUsers.filter(u => u.id !== user.id);
    }
  }

  // Método para salvar os usuários selecionados
  salvarUsuarios(): void {
    if (this.selectedUsers.length === 0) {
      Swal.fire('Selecione ao menos um usuário!', '', 'warning');
      return;
    }

    const userIds = this.selectedUsers.map(user => user.id);
    console.log(userIds)
    this.projectService.attributeMembersById(this.project.id, userIds).subscribe({
      next: () => {
        Swal.fire('Usuários salvos com sucesso!', '', 'success');
      },
      error: () => {
        Swal.fire('Erro ao salvar usuários!', '', 'error');
      },
    });
  }
}
