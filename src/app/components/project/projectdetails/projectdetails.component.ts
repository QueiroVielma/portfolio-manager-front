import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms'
import { ProjectService } from '../../../services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../../models/project';
import Swal from 'sweetalert2';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { obterRiscoPorValor } from '../../../enums/Risco';

@Component({
  selector: 'app-projectdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, CommonModule],
  templateUrl: './projectdetails.component.html',
  styleUrl: './projectdetails.component.scss'
})
export class ProjectdetailsComponent {

  projectService = inject(ProjectService);
  userService = inject(UserService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  users: User[] = [];

  tituloComponente: string = 'Novo Projeto';
  @Input() project: Project = new Project(); 
  @Output() retorno = new EventEmitter<string>();

  constructor() {
    this.loadUsers();
    const id = this.activatedRoute.snapshot.params['id']; 
    if (id) {
      this.tituloComponente = 'Editar Projeto';
      this.findById(id);
    }
    console.log(this.project.expectedEndDate)
  }

  loadUsers(): void {
    this.userService.findAll().subscribe(
      (users: User[]) => {
        this.users = users.filter(user => user.positionUser === 2);
      },
      (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
    );
  } 

  findById(id: number): void {
    this.projectService.findById(id).subscribe({
      next: (project) => {
        this.project = project;
  
        // Converte para um objeto Date, caso esteja em string
        if (this.project.expectedEndDate) {
          this.project.expectedEndDate = new Date(this.project.expectedEndDate);
        }
  
        if (this.project.riskProject !== undefined) {
          this.project.riskProject = obterRiscoPorValor(this.project.riskProject);
        }
      },
      error: () => {
        Swal.fire('Erro', 'Falha ao carregar o projeto.', 'error');
      }
    });
  }

  create(): void {
    this.projectService.save(this.project).subscribe({
      next: (message) => {
        Swal.fire('Sucesso', message, 'success');
        this.retorno.emit(message);
        this.router.navigate(['/projects']);
      },
      error: () => {
        Swal.fire('Erro', 'Falha ao salvar o projeto.', 'error');
      }
    });
  }
}
