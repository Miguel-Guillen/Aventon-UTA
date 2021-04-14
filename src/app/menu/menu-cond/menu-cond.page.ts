import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu-cond',
  templateUrl: './menu-cond.page.html',
  styleUrls: ['./menu-cond.page.scss'],
})
export class MenuCondPage implements OnInit {

  constructor(private menu: MenuController, private route: Router) { }

  ngOnInit() {
  }

  logout(){
    localStorage.removeItem('sesionIniciada_C')
    this.route.navigate(['/login-conductor'])
  }

  closeMenu(){
    this.menu.close()
  }

}
