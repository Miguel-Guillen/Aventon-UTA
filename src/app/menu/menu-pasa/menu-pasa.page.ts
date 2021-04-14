import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu-pasa',
  templateUrl: './menu-pasa.page.html',
  styleUrls: ['./menu-pasa.page.scss'],
})
export class MenuPasaPage implements OnInit {

  constructor(private route: Router, private menu: MenuController) { }

  ngOnInit() {
  }
  
  logout(){
    localStorage.removeItem('sesionIniciada_P')
    this.route.navigate(['/login-pasa'])
  }

  closeMenu(){
    this.menu.close()
  }

}
