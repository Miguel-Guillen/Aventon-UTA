import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private menu: MenuController, private route: Router) { }

  ngOnInit() {
  }

  logout(){
    localStorage.removeItem('sesionIniciada')
    this.route.navigateByUrl('/login-admin')
  }

  closeMenu(){
    this.menu.close()
  }
}
