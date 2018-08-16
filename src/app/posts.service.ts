import { Injectable } from '@angular/core';
import { Http,URLSearchParams } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http:Http) { }

  getAllPosts() {
    return this.http.get('/posts');
    
  }

  saveUserDetails(params){
    return this.http.post('/api/SaveUser',params);
  }

  addUserToGroup(data){
    return this.http.post('/api/addUser', data);
  }

  removeUsrFromGrp(){
    var data={
      name:"abcName",
      address:"abcAddr"
    }
    return this.http.post('/api/remUsrFrmGrp',data);
  }

  createGroup(grpData){
    return this.http.post('/api/createGroup',grpData);
  }

  getUSersGrps(params:URLSearchParams){
    console.log(params);
    return this.http.get('/api/getUsrGrps',{  params });
  }

  addGrpToUsr(data){

    return this.http.post('/api/addGrpToUsr',data);
  }


  countMemGrp(groupId){
    console.log(groupId)
    return this.http.get('/api/memCountGRp/'+groupId);
  }

  setupData(){
    return this.http.get('/api/setupdata');
  }

  getallUsers(){
    return this.http.get('/api/allUsers');
  }

}
