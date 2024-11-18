import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Project } from '../../../models/project';
import { ProjectService } from '../../../services/project.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Status } from '../../../enums/Status';
import { obterStatusPorValor } from '../../../enums/Status';
import { StatusDescricao } from '../../../enums/Status';
import { obterRiscoPorValor, Risco } from '../../../enums/Risco';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ProjectdetailsComponent } from '../projectdetails/projectdetails.component';
import { ProjectupdateComponent } from '../../projectupdate/projectupdate.component';
import { ProjectinfoComponent } from '../../projectinfo/projectinfo.component';

@Component({
  selector: 'app-projectlist',
  standalone: true,
  imports: [CommonModule, FormsModule, ProjectdetailsComponent, MdbModalModule, ProjectupdateComponent, ProjectinfoComponent],
  templateUrl: './projectlist.component.html',
  styleUrl: './projectlist.component.scss'
})
export class ProjectlistComponent {
  pesquisa: string = '';

  projectEdit!: Project;

  lista: Project[] = [];

  projectService = inject(ProjectService);

  modalRef!: MdbModalRef<any>;
  @ViewChild('modalProjectsDetails') modalProjectsDetails!: TemplateRef<any>;
  @ViewChild('modalProjecteUpdate') modalProjecteUpdate!: TemplateRef<any>;
  @ViewChild('modalprojectinfo') modalprojectinfo!: TemplateRef<any>;
  modalService = inject(MdbModalService);
  constructor() {
    this.findAll();
  }

  findByTitulo() {
    this.projectService.findByTitulo(this.pesquisa).subscribe({
      next: (lista) => {
        this.lista = lista;
      },
      error: (erro) => {
        alert('Deu erro');
      },
    });
  }

  findAll() {
    this.projectService.findAll().subscribe({
      next: (list) => {
        this.lista = list;
      },
      error: (erro) => {
        alert('Deu erro');
      },
    });
  }

  deleteById(project: Project) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar o projeto ' + project.nameProject + '?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.projectService.delete(project.id).subscribe({
          next: (mensagem) => {
            Swal.fire(mensagem, '', 'success');
            this.findAll();
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

  obterRiscoPorValorHtml (numero: number){
    const risco = obterRiscoPorValor(numero);
    return Risco[risco];
  }


  novo() {
    this.projectEdit = new Project();
    this.modalRef = this.modalService.open(this.modalProjectsDetails, {modalClass: "modal-lg"});
  }

  editar(projeto: Project) {
    this.projectEdit = Object.assign({}, projeto); 
    this.modalRef = this.modalService.open(this.modalProjecteUpdate,  {modalClass: "modal-lg"});
  }

  info(projeto: Project) {
    this.projectEdit = Object.assign({}, projeto); 
    this.modalRef = this.modalService.open(this.modalprojectinfo,  {modalClass: "modal-lg"});
  }

  retornoForm(mensagem: string) {

      this.modalRef.close(); 
    Swal.fire({ 
      title: mensagem,
      icon: 'success',
    });

    this.findAll();
  }
}
