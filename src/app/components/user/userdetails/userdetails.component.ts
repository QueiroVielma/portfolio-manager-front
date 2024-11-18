import { Component, Inject, inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { UserlistComponent } from '../userlist/userlist.component';

@Component({
  selector: 'app-userdetails',
  standalone: true,
  imports: [FormsModule, MdbFormsModule, UserlistComponent],
  templateUrl: './userdetails.component.html',
  styleUrl: './userdetails.component.scss'
})
export class UserdetailsComponent {
  user: User = new User();
  userService = inject(UserService);
  constructor() {}

  createUser() {
    this.userService.save(this.user).subscribe({
      next: () => {
        Swal.fire('Usuário cadastrado com sucesso!', '', 'success');
        this.user = new User(); 
      },
      error: (err) => {
        console.error('Erro ao salvar usuário:', err);
        Swal.fire('Erro ao cadastrar o usuário!', '', 'error');
      }
    });
  }
}
