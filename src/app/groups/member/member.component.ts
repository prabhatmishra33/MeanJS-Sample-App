import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit,OnChanges  {
  @Input() members
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    //console.log(this.members);
  }

}
