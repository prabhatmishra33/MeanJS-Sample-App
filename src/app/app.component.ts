import { Component, OnInit } from '@angular/core';
import { PostsService } from './posts.service';
import { URLSearchParams } from '@angular/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  grpArray=null;
  loggedInUserName='ram';
  usr=null;
  grpName="";
  groups=[];

  constructor(private postService : PostsService) { }

  ngOnInit(){
    this.getUsrGroups()
    //var loggedInUser = this.loggedInUserName; //will come from session
    
    
    //Setting up data for the users
    // this.postService.setupData()
    // .subscribe( res => {
    //   console.log(res)
    // },err => console.log(err) )
    //Creating groups 

    

  }

  getUsrGroups(){
    let params: URLSearchParams = new URLSearchParams();
    params.set('userName', this.loggedInUserName);
    this.postService.getUSersGrps(params)
        .subscribe( res => {this.grpArray=res['_body']
        this.usr=res['_body']; 
        this.usr = JSON.parse(this.usr)
        console.log(this.usr["memberOfGroups"]);
        this.groups=this.usr["memberOfGroups"];
        //this.partOfGroup();
        // console.log(usd._id);       
        // console.log(this.grpArray)
    },err => console.log(err) )

  }
  // //This function will return the group ids for which logged-In user is a member/admin
  // partOfGroup(){
  //       //Get the logged in user name to display the groups
  //       var loggedInUser = this.loggedInUserName; //will come from session
  //       let params: URLSearchParams = new URLSearchParams();
  //       params.set('userName', loggedInUser);
  //       this.postService.getUSersGrps(params)
  //           .subscribe( res => {this.grpArray=res['_body']
  //         console.log(this.grpArray)
  //       },err => console.log(err) )
  // }

  //Create Group add current user to the group
  createNewGroup(){
    let groupId;
    console.log(this.grpName);
    var grp ={
      groupName : this.grpName
    }
    //Grp Creation
    this.postService.createGroup(grp)
      .subscribe( res => {
        groupId = res['_body'];
        console.log("Grp created with groupId : "+groupId)
        //add usr to grp
        let countMemGrp;
        if(groupId!=null){
          console.log("groupId is not null")
                this.postService.countMemGrp(groupId.trim())
                .subscribe( res => {
                        countMemGrp = JSON.parse(res["_body"]);
                        console.log(typeof countMemGrp)
                        console.log(countMemGrp);
                        countMemGrp = countMemGrp['members'].length
                        console.log("Number of members present in the grp "+countMemGrp)
                        countMemGrp = countMemGrp+1
                        //return countMemGrp
                        console.log(this.usr._id)
                        var userId=this.usr._id //will get this from session
                        var insertToGrp={
                          grpId : groupId,
                          usrID : userId,
                          seqNo : countMemGrp
                        } 
                        console.log("adding user to group")
                              this.postService.addUserToGroup(insertToGrp)
                              .subscribe( res => {
                                console.log("add group to user")
                                console.log(res);
                                    let data = {
                                      name:this.loggedInUserName,
                                      grpId:groupId
                                    }
                                    this.postService.addGrpToUsr(data)
                                    .subscribe( res => { console.log(res)
                                      this.getUsrGroups()
                                      this.grpName="";
                                    },err => console.log(err))
                              },err => console.log(err))
                      
                    },err => console.log(err)
                  )
          }
    });
  }
}
