// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        let enter_btn = new cc.Component.EventHandler();
        enter_btn.target = this.node;
        enter_btn.component = "Signup";
        enter_btn.handler = "enter_btn_process";

        cc.find("Canvas/editbox_bg/Enter Button").getComponent(cc.Button).clickEvents.push(enter_btn);

        let back_btn = new cc.Component.EventHandler();
        back_btn.target = this.node;
        back_btn.component = "Signup";
        back_btn.handler = "back_btn_process";

        cc.find("Canvas/editbox_bg/Back Button").getComponent(cc.Button).clickEvents.push(back_btn);

    }
    enter_btn_process() {
        var database = firebase.database();
        let username = cc.find("Canvas/editbox_bg/Username EditBox").getComponent(cc.EditBox).string;
        let email = cc.find("Canvas/editbox_bg/Email EditBox").getComponent(cc.EditBox).string;
        let password = cc.find("Canvas/editbox_bg/Password EditBox").getComponent(cc.EditBox).string;
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
            ()=>{
                
                //console.log(firebase.auth().currentUser.uid);
                let data = {
                    user: username,
                    email : email,
                    password : password,
                    uid : firebase.auth().currentUser.uid,
                };
                let key = database.ref('player_info').push(data).key;
                cc.director.loadScene("StageSelect");
            }
        ).catch(
            (err)=>{
                //create_alert('error',err.message);
                console.log(err.message);
            }
        );
    }
    back_btn_process(){
        cc.director.loadScene("Menu");
    }
    // update (dt) {}
}
