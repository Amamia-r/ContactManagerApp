import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  private router = inject(Router);
  private accountService = inject(AccountService);

  model = { username: '', password: '' }
  passwordMismatch = false;

  checkPasswordMatch(confirmPassword: string) {
    this.passwordMismatch = this.model.password !== confirmPassword;
  }

  register() {

    if (this.passwordMismatch) return;

    this.accountService.register(this.model).subscribe({
      next: _ => {
        this.router.navigateByUrl('/menu')
      },
      error: error => console.log(error)
    })

  }


  registered() {
    this.router.navigateByUrl('');
  }

}
