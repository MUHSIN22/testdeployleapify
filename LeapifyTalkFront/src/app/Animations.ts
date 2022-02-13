import {
  trigger,
  animate,
  transition,
  style,
  query
} from '@angular/animations';

export const fadeAnimation =
 trigger('fadeAnimation', [
  transition('* <=> *', [
    // Set a default  style for enter and leave
    query(':enter, :leave', [
      style({
        width: '100%',
        position: 'absolute',
        opacity: 0,
      }),
    ],{optional:true}),
    query(':enter', [
      animate('600ms ease', style({ opacity: 1,  })),
    ],{optional:true}),
  ]),
  
  
]);