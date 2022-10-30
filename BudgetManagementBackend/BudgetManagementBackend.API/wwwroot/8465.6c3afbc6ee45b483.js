"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8465],{8465:(w,l,s)=>{s.r(l),s.d(l,{ProfilePageModule:()=>N});var u=s(9808),t=s(4182),r=s(6359),m=s(4108),e=s(2096),f=s(977),g=s(361);function d(o,a){1&o&&(e.TgZ(0,"ion-row")(1,"ion-col",5)(2,"span"),e._uU(3,"First name must contain at least 1 character."),e.qZA()()())}function p(o,a){1&o&&(e.TgZ(0,"ion-row")(1,"ion-col",5)(2,"span"),e._uU(3,"Last name must contain at least 1 character."),e.qZA()()())}function h(o,a){1&o&&(e.TgZ(0,"ion-row")(1,"ion-col",5)(2,"span"),e._uU(3,"Email must be in a valid format."),e.qZA()()())}function P(o,a){1&o&&(e.TgZ(0,"ion-row")(1,"ion-col",5)(2,"span"),e._uU(3,"Username must contain at least 1 character."),e.qZA()()())}const Z=[{path:"",component:(()=>{class o{constructor(i,n,c){this.authService=i,this.transactionService=n,this.loadingCtrl=c}ngOnInit(){this.userForm=new t.cw({firstName:new t.NI("",t.kI.required),lastName:new t.NI("",t.kI.required),email:new t.NI("",[t.kI.required,t.kI.email]),username:new t.NI("",t.kI.required)}),this.userSub=this.authService.user.subscribe(i=>{this.userId=i.userId,this.userForm.get("firstName").setValue(i.firstName),this.userForm.get("lastName").setValue(i.lastName),this.userForm.get("email").setValue(i.email),this.userForm.get("username").setValue(i.username)}),this.transactionSub=this.transactionService.balance.subscribe(i=>{this.balance=i})}onUpdateProfile(){this.userForm.invalid||this.loadingCtrl.create({message:"Updating transaction..."}).then(i=>{i.present(),this.authService.updateProfile(this.userId,this.userForm.value).subscribe(n=>{console.log(n),i.dismiss(),this.userForm.markAsUntouched()})})}ngOnDestroy(){this.userSub&&this.userSub.unsubscribe(),this.transactionSub&&this.transactionSub.unsubscribe()}}return o.\u0275fac=function(i){return new(i||o)(e.Y36(f.e),e.Y36(g.p),e.Y36(r.HT))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-profile"]],decls:51,vars:11,consts:[["slot","start"],["defaultHref","/home"],[3,"formGroup","ngSubmit"],["lines","none"],["src","../../../assets/img/user.png","alt","user","width","200",2,"margin","0 auto"],["sizeSm","6","offsetSm","3"],["position","floating"],["type","text","required","","formControlName","firstName"],[4,"ngIf"],["type","text","required","","formControlName","lastName"],["type","text","required","","formControlName","email"],["type","text","required","","formControlName","username"],[3,"disabled"],["type","submit","color","primary","expand","block",3,"disabled"]],template:function(i,n){1&i&&(e.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",0),e._UZ(3,"ion-back-button",1),e.qZA(),e.TgZ(4,"ion-title"),e._uU(5,"Profile"),e.qZA()()(),e.TgZ(6,"ion-content")(7,"form",2),e.NdJ("ngSubmit",function(){return n.onUpdateProfile()}),e.TgZ(8,"ion-grid")(9,"ion-row")(10,"ion-col")(11,"ion-item",3),e._UZ(12,"img",4),e.qZA()()(),e.TgZ(13,"ion-row")(14,"ion-col",5)(15,"ion-item")(16,"ion-label",6),e._uU(17,"First name:"),e.qZA(),e._UZ(18,"ion-input",7),e.qZA()()(),e.YNc(19,d,4,0,"ion-row",8),e.TgZ(20,"ion-row")(21,"ion-col",5)(22,"ion-item")(23,"ion-label",6),e._uU(24,"Last name:"),e.qZA(),e._UZ(25,"ion-input",9),e.qZA()()(),e.YNc(26,p,4,0,"ion-row",8),e.TgZ(27,"ion-row")(28,"ion-col",5)(29,"ion-item")(30,"ion-label",6),e._uU(31,"Email:"),e.qZA(),e._UZ(32,"ion-input",10),e.qZA()()(),e.YNc(33,h,4,0,"ion-row",8),e.TgZ(34,"ion-row")(35,"ion-col",5)(36,"ion-item")(37,"ion-label",6),e._uU(38,"Username:"),e.qZA(),e._UZ(39,"ion-input",11),e.qZA()()(),e.YNc(40,P,4,0,"ion-row",8),e.TgZ(41,"ion-row")(42,"ion-col",5)(43,"ion-item",12)(44,"ion-label"),e._uU(45),e.ALo(46,"number"),e.qZA()()()(),e.TgZ(47,"ion-row")(48,"ion-col",5)(49,"ion-button",13),e._uU(50," Edit profile "),e.qZA()()()()()()),2&i&&(e.xp6(7),e.Q6J("formGroup",n.userForm),e.xp6(12),e.Q6J("ngIf",n.userForm.get("firstName").invalid&&n.userForm.get("firstName").touched),e.xp6(7),e.Q6J("ngIf",n.userForm.get("lastName").invalid&&n.userForm.get("lastName").touched),e.xp6(7),e.Q6J("ngIf",n.userForm.get("email").invalid&&n.userForm.get("email").touched),e.xp6(7),e.Q6J("ngIf",n.userForm.get("username").invalid&&n.userForm.get("username").touched),e.xp6(3),e.Q6J("disabled",!0),e.xp6(2),e.hij("Current balance: ",e.xi3(46,8,n.balance,"1.2-2")," RSD"),e.xp6(4),e.Q6J("disabled",n.userForm.invalid||!n.userForm.touched))},directives:[r.Gu,r.sr,r.Sm,r.oU,r.cs,r.wd,r.W2,t._Y,t.JL,t.sg,r.jY,r.Nd,r.wI,r.Ie,r.Q$,r.pK,r.j9,t.Q7,t.JJ,t.u,u.O5,r.YG],pipes:[u.JJ],styles:[""]}),o})()}];let b=(()=>{class o{}return o.\u0275fac=function(i){return new(i||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[[m.Bz.forChild(Z)],m.Bz]}),o})(),N=(()=>{class o{}return o.\u0275fac=function(i){return new(i||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[[u.ez,t.u5,r.Pc,b,t.UX]]}),o})()}}]);