import { Component, OnInit } from '@angular/core';
import {faStar} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-companion-profile',
  templateUrl: './companion-profile.component.html',
  styleUrls: ['./companion-profile.component.css']
})
export class CompanionProfileComponent implements OnInit {
  faStar = faStar

  companionDetails:any = [
    {
      title: "Number of Ratings",
      detail: 3
    },
    {
      title: "Number of Reviews",
      detail: 3
    },
    {
      title: "Listens to",
      detail: 'over 18'
    },
    {
      title: "Languages",
      detail: 'English'
    },
    {
      title: "Listener Since",
      detail: 'Feb 18, 2022'
    },
    {
      title: "Last Active ",
      detail: 'in last week'
    },
    {
      title: "Gender",
      detail: "Male "
    },
    {
      title: "Progress Path",
      detail: 'Step 2'
    },
    {
      title: "Cheers",
      detail: '2,739'
    },
    {
      title: "People Helped",
      detail: '9'
    },
    {
      title: "Chats",
      detail: '49'
    },
    {
      title: "Group Support Chats",
      detail: '0'
    },
    {
      title: "Listener Group Chats ",
      detail: '0'
    },
    {
      title: "Forum Posts",
      detail: '0'
    },
    {
      title: 'Forum Upvotes',
      detail: '0'
    }
  ]
  constructor() { } 

  ngOnInit(): void {
    const halfList:number = Math.round(this.companionDetails.length / 2)
    this.companionDetails = [this.companionDetails.splice(0,halfList),this.companionDetails.splice(-halfList)]
  }

}
