import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar-inicio',
  templateUrl: './nav-bar-inicio.component.html',
  styleUrls: ['./nav-bar-inicio.component.scss']
})
export class NavBarInicioComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

  } 

  irParaLogin(): void {
    this.router.navigate(['/login'], { relativeTo: this.route.parent })
  }

  irParaMeuPerfil(): void {
    this.router.navigate(['/informacoes-pessoais'], { relativeTo: this.route.parent });
  }

  irParaMinhaComunidade(): void {
    const idNutri: string = String(localStorage.getItem('idNutri'));

    if (idNutri !== '' && idNutri !== null && idNutri !== undefined) {
      this.router.navigate(['/minha-comunidade', localStorage.getItem('idNutri')], { relativeTo: this.route.parent });
    }
  }

}