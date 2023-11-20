import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { User } from '../../model/User'
import { TokenService } from 'src/app/services/tokenService/token.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup
  showErrorMessage = false

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private tokenService: TokenService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/),
        ],
      ],
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.clearErrorMessages();

      const formData = this.loginForm.value;

      this.authenticateUser(formData.email, formData.password);
    } else {
      this.showErrorMessage = true;
    }
  }

  authenticateUser(email: string, password: string) {
    this.http
      .post('http://localhost:8080/login', { email, password })
      .subscribe(
        (user: User) => {

          if (user.token === undefined || user.token === null) {
            console.error('Token vazio.');
            return;
          }

          this.tokenService.saveToken(user.token);

          if (user.type === 'RESIDENT') {
            this.router.navigate(['/home-auth']);
          } else if (user.type === 'ADMIN') {
            this.router.navigate(['/home-admin']);
          } else {
            console.error('Tipo de usuário não reconhecido.')
          }
          
        },
        (error) => {
          console.error('Erro na autenticação:', error);
          this.showErrorMessage = true;
        }
      )
  }

  clearErrorMessages() {
    this.showErrorMessage = false;
  }
}
