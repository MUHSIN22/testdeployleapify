import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'activity-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Therapists',
    icon: 'person-outline',
    link: '/pages/therapists',
  },
  {
    title: 'Courses',
    icon: 'book-outline',
    link: '/pages/courses'
  },
  { 
    title: 'Approved Therapists',
    icon: 'checkmark-circle-2-outline',
    link: '/pages/approved-therapists'
  },
  { 
    title: 'Rejected Therapists',
    icon: 'close-circle-outline',
    link: '/pages/rejected-therapists'
  }
];
