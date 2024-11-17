import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Project } from '../models/project';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() {}

    http = inject(HttpClient); //a estrutura pronta pra fazer requisições

    API = "http://localhost:8080/api/project";

    findByTitulo(pesquisa: string): Observable<Project[]>{
      let projetos = new HttpParams().set('nome', pesquisa);
      return this.http.get<Project[]>(this.API+"/findByTitulo", {params: projetos})
    }
  
    findAll(): Observable<Project[]>  {
      return this.http.get<Project[]>(this.API);
    }
  
    findById(id: number): Observable<Project>{
      return this.http.get<Project>(this.API+"/"+id);
    }
  
    save(project : Project): Observable<string>{
      return this.http.post<string>(this.API, project, {responseType: 'text' as 'json'});
    }
    
    update(project: Project): Observable<string>{
      const updatedProject = {
        nameProject: project.nameProject,
        budget: project.budget,
        description: project.description,
        riskProject: project.riskProject,
      };
      return this.http.put<string>(this.API+"/"+project.id, updatedProject, {responseType: 'text' as 'json'});
    }
  
    delete(id: number): Observable<string>{
      return this.http.delete<string>(this.API+"/"+id, {responseType: 'text' as 'json'});
    }
   
}
