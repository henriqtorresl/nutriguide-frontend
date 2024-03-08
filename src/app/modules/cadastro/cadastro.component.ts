import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import Tabs from '../../shared/tabs/tabs.component';
import UsuarioNutricionista from 'src/app/interfaces/UsuarioNutricionista';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {

  tabs: Tabs[] = [
    {
      name: 'Informações Pessoais',
      key: 'a',
      isActive: true
    },
    {
      name: 'Informações Sobre o Nutri',
      key: 'b',
      isActive: false
    }
  ];

  key: string = 'a';

  formulario!: FormGroup;

  msgBotaoCadastrar!: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.criarFormulario();
  }

  criarFormulario(): void {
    this.formulario = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      sexo: ['', Validators.required],
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]],
      telefone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\)\s\d{4,5}-\d{4}$/)]],
      dataNascimento: ['', Validators.required],
      formacao: ['', Validators.required],
      especialidade: ['', Validators.required],
      regiao: ['', Validators.required],
      redeSocial: ['', Validators.required]
    });
  }

  cadastro(): void {
    const usuario = {
      nome: this.formulario.controls['nome'].value,
      cpf: this.formulario.controls['cpf'].value,
      email: this.formulario.controls['email'].value,
      sexo: this.formulario.controls['sexo'].value,
      cep: this.formulario.controls['cep'].value,
      telefone: this.formulario.controls['telefone'].value,
      dataNascimento: this.formulario.controls['dataNascimento'].value,
      formacao: this.formulario.controls['formacao'].value,
      especialidade: this.formulario.controls['especialidade'].value,
      regiao: this.formulario.controls['regiao'].value,
      redeSocial: this.formulario.controls['redeSocial'].value
    }

    const usuarioNutricionista: UsuarioNutricionista = {
      id_usuario: 0,
      cpf: usuario.cpf,
      nome_usuario: usuario.nome,
      email: usuario.email,
      sexo: usuario.sexo,
      telefone: usuario.telefone,
      cep: usuario.cep,
      data_nascimento: usuario.dataNascimento,
      tipo_usuario: 'nutricionista',
      id_nutricionista: 0,
      regiao: usuario.regiao,
      faculdade: usuario.formacao,
      especialidade: usuario.especialidade,
      redesocial: usuario.redeSocial
    }

    this.authService.cadastro(usuarioNutricionista).subscribe(
      (r) => {
        const msg = r.msg;
  
        this.snackBar.open(msg, 'OK', {duration: 2500});
    
        this.router.navigate(['/login']);
      },
      (e) => {
        const msg: string = e.error.msg;
        this.snackBar.open(msg, 'OK', {duration: 2500});
      })
  }

  desabilitarBotao(): boolean {
    if (this.formulario.invalid) {
      this.msgBotaoCadastrar = 'Preencha todos os campos corretamente!';

      return true;
    } else {
      this.msgBotaoCadastrar = '';

      return false;
    }
  }

  cancelar(): void {
    this.router.navigate(['/inicio']);
  }

  abrirTab(key: string) {
    this.key = key;
  }

}