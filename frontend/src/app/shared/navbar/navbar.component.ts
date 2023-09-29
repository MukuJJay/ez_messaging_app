import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  @Output() dashboardVariant = new EventEmitter<string>();
  activeIndex: number = Number(localStorage.getItem('activeNavbarIndex')) || 0;
  isClickedIndex: number = NaN;
  toggleBtnActive: boolean = false;

  setActiveClass(i: number): void {
    this.activeIndex = i;
    localStorage.setItem('activeNavbarIndex', i.toString());
  }

  icons = {
    topIcons: [
      { name: 'chat', i: 'fa fa-commenting' },
      { name: 'contacts', i: 'fa fa-users' },
      { name: 'logout', i: 'fa fa-sign-out' },
    ],
    bottomIcons: [
      { name: 'settings', i: 'fa fa-gear' },
      { name: 'user', i: 'fa fa-user-circle-o', status: 'online' },
    ],
  };

  triggerAction(name: string): void {
    switch (name) {
      case 'logout':
        this.logout();
        break;
      case 'contacts':
        this.contacts();
        break;
      case 'chat':
        this.chat();
        break;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('activeDashboardVariant');
    localStorage.removeItem('activeNavbarIndex');
    location.reload();
  }
  contacts() {
    this.dashboardVariant.emit('contacts');
    localStorage.setItem('activeDashboardVariant', 'contacts');
  }
  chat() {
    this.dashboardVariant.emit('chat');
    localStorage.setItem('activeDashboardVariant', 'chat');
  }
  toggleLowerIcons(bool: boolean): void {
    if (bool) this.dashboardVariant.emit('menubar');
    else this.toggleBtnActive = bool;
  }
}
