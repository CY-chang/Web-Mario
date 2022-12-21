// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({type:cc.AudioClip})
    bgm: cc.AudioClip = null;

    start(){
        let login_btn = new cc.Component.EventHandler();
        login_btn.target = this.node;
        login_btn.component = "Menu";
        login_btn.handler = "load_login_scene";

        let signup_btn = new cc.Component.EventHandler();
        signup_btn.target = this.node;
        signup_btn.component = "Menu";
        signup_btn.handler = "load_signup_scene";

        cc.find("Canvas/Log in").getComponent(cc.Button).clickEvents.push(login_btn);
        cc.find("Canvas/Sign up").getComponent(cc.Button).clickEvents.push(signup_btn);
        
        this.playBGM();
    }

    load_login_scene(){
        cc.log("button login pressed");
        cc.director.loadScene("Login");
    }

    load_signup_scene(){
        cc.log("button signup pressed");
        cc.director.loadScene("SignUp");
    }

    playBGM(){
        cc.audioEngine.playMusic(this.bgm, true);
    }
    // update (dt) {}
}
