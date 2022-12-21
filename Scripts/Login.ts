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
        enter_btn.component = "Login";
        enter_btn.handler = "enter_btn_process";

        cc.find("Canvas/editbox_bg/Enter Button").getComponent(cc.Button).clickEvents.push(enter_btn);

        let back_btn = new cc.Component.EventHandler();
        back_btn.target = this.node;
        back_btn.component = "Login";
        back_btn.handler = "back_btn_process";

        cc.find("Canvas/editbox_bg/Back Button").getComponent(cc.Button).clickEvents.push(back_btn);
    }

    enter_btn_process() {
        let email = cc.find("Canvas/editbox_bg/Email EditBox").getComponent(cc.EditBox).string;
        let password = cc.find("Canvas/editbox_bg/Password EditBox").getComponent(cc.EditBox).string;
        firebase.auth().signInWithEmailAndPassword(email, password).then(
            ()=>{
                cc.director.loadScene("StageSelect");
            }
        ).catch(
            ()=>{
                alert('invalid email or password!');
            }
        );
    }
    back_btn_process(){
        cc.director.loadScene("Menu");
    }
    // update (dt) {}
}
