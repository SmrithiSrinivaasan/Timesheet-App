import { INavData } from '@coreui/angular';
import { environment } from '../environments/environment';

export const navItems: any[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'cui-dashboard',
    allowedRoles: [environment.Role.Admin, environment.Role.User],
  },
  {
    name: 'Projects',
    url: '/project',
    icon: 'icon-layers',
    allowedRoles: [environment.Role.Admin],
  },
  {
    name: 'Phases',
    url: '/phase',
    icon: 'fa-clipboard',
    allowedRoles: [environment.Role.Admin],
  },
  {
    name: 'Users',
    url: '/user',
    icon: 'icon-people',
    allowedRoles: [environment.Role.Admin],
  },
  {
    name: 'Entries',
    url: '/entry',
    icon: 'icon-note',
    allowedRoles: [environment.Role.Admin, environment.Role.User],
  },
];
