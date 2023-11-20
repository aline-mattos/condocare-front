import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { User } from '../../model/User'
import { TokenService } from 'src/app/services/tokenService/token.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup
  showErrorMessage: boolean = false

  name?: string
  apartment?: string
  block?: string
  email?: string
  password?: string
  confirmPassword?: string

  // control error messages
  nameError: boolean = false
  apartmentError: boolean = false
  blockError: boolean = false
  emailError: boolean = false
  passwordError: boolean = false
  confirmPasswordError: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private tokenService: TokenService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      apartment: ['', Validators.required],
      block: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/),
        ],
      ],
      confirmPassword: ['', Validators.required],
    })
  }

  onSubmit() {
    this.clearAllErrors()

    Object.values(this.registerForm.controls).forEach((control) => {
      control.markAsTouched();
    })

    if (
      this.registerForm.invalid ||
      this.registerForm.get('password')?.value !==
        this.registerForm.get('confirmPassword')?.value
    ) {
      this.showErrorMessage = true;
      this.confirmPasswordError = true;
      return;
    } else {
      const formData = this.registerForm.value;

      var user = new User()
      user.id = ""
      user.name = formData.name
      user.apartment = formData.apartment
      user.block = formData.block
      user.type = "RESIDENT"
      user.email = formData.email
      user.password = formData.password
      user.token = ""
      
      this.http.post('http://localhost:8080/users', user).subscribe(
        (response) => {
          var user = response as User

          if(user.token == undefined || user.token == null){
            console.error('Token vazio.')
            return
          }

          this.tokenService.saveToken(user.token)

          if(user.type == "RESIDENT") {
            this.router.navigate(['/home-auth']);
          } else {
            this.router.navigate(['/home-admin']);
          }
        },
        (error) => {
          console.error('Erro ao salvar dados', error);
        }
      )
    }
  }

  //error treatment
  clearAllErrors() {
    this.nameError = false;
    this.apartmentError = false;
    this.blockError = false;
    this.emailError = false;
    this.passwordError = false;
    this.confirmPasswordError = false;
    this.showErrorMessage = false;
  }

  clearError(fieldName: string) {
    switch (fieldName) {
      case 'name':
        this.nameError = false;
        break;
      case 'apartment':
        this.apartmentError = false;
        break;
      case 'block':
        this.blockError = false;
        break;
      case 'email':
        this.emailError = false;
        break;
      case 'password':
        this.passwordError = false;
        break;
      case 'confirmPassword':
        this.confirmPasswordError = false;
        break;
      default:
        break;
    }
  }
}
