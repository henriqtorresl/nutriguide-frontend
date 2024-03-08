import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { NutricionistaService } from 'src/app/services/nutricionista-service/nutricionista.service';
import { UsuarioService } from 'src/app/services/usuario-service/usuario.service';
import Tabs from '../../shared/tabs/tabs.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formulario!: FormGroup

  tabs: Tabs[] = [
    {
      name: 'Informações Pessoais',
      key: 'a',
      isActive: true
    }
  ]

  key: string = 'a';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private usuarioService: UsuarioService,
    private nutricionistaService: NutricionistaService
  ) {}

  ngOnInit(): void {
    this.criarFormulario();
  }

  criarFormulario(): void {
    this.formulario = this.formBuilder.group({
      nome: [],
      email: []
    });
  }

  login(): void {
    const usuario = {
      nome: this.formulario.controls['nome'].value,
      email: this.formulario.controls['email'].value
    }

    this.authService.login(usuario).subscribe(
    (r) => {
      const token = r.token;
      const msg = r.msg;

      localStorage.setItem('token', token);
      localStorage.setItem('nome', usuario.nome);

      this.snackBar.open(msg, 'OK', {duration: 2500});
  
      this.usuarioService.getUserByName(usuario.nome)
      .pipe(take(1))
      .subscribe((user) => {

        localStorage.setItem('role', user.tipo_usuario);

        if(user.tipo_usuario === 'nutricionista') {

          this.nutricionistaService.getAll().subscribe((nutri) => {
            nutri.forEach((n) => {

              if (n.id_usuario === user.id_usuario) {
                localStorage.setItem('idNutri', n.id_nutricionista.toString());
                
                this.router.navigate(['/consultar-pacientes'])
              }
            });
          });
        } else {
          this.router.navigate(['/inicio']);
        }

      })
    },
    (e) => {
      const msg: string = e.error.msg;
      this.snackBar.open(msg, 'OK', {duration: 2500});
    })
  }

  cancelar(): void {
    this.router.navigate(['/inicio']);
  }

  abrirTab(key: string) {
    this.key = key;
  }

}