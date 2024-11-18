import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import Swal from 'sweetalert2';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-projectupdate',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './projectupdate.component.html',
  styleUrl: './projectupdate.component.scss'
})
export class ProjectupdateComponent {
  projectService = inject(ProjectService);

  @Input() project: Project = new Project();
  @Output() retorno = new EventEmitter<string>();


  update(): void {
    this.project.riskProject -= 1;
    this.projectService.update(this.project).subscribe({
      next: (message: string) => {
        Swal.fire('Sucesso', 'Projeto atualizado com sucesso!', 'success');
        this.retorno.emit(message);
      },
      error: (error) => {
        console.error('Erro ao atualizar o projeto:', error);
        Swal.fire('Erro', 'Falha ao atualizar o projeto.', 'error');
      }
    });
  }
}
