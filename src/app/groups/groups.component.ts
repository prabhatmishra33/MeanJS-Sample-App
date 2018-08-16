import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PostsService } from '../posts.service';
import { URLSearchParams } from '@angular/http';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit,OnChanges {
  @Input() grps
  
  constructor(private postService : PostsService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  ngOnChanges(){
    console.log(this.grps);
  }

  getAllUsers(){
    this.postService.getallUsers()
      .subscribe(
          res => { console.log(JSON.parse(res["_body"])) }
          ,err => console.log(err) 
        )
  }
  
}