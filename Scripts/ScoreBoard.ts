// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}


    start () {
        this.scheduleOnce(this.show_scoreboard, 2);

        let back_btn = new cc.Component.EventHandler();
        back_btn.target = this.node;
        back_btn.component = "ScoreBoard";
        back_btn.handler = "back_btn_process";

        cc.find("Canvas/Back Button").getComponent(cc.Button).clickEvents.push(back_btn);
    }

    back_btn_process(){
        this.scheduleOnce( ()=> cc.director.loadScene("StageSelect"), 1);
    }

    show_scoreboard(){
        let database = firebase.database();
        database.ref('score_board').once('value',(snapshot)=>{
            //console.log(snapshot.val());
            let score_values = Object.values(snapshot.val());

            let score_array = [];
            for(const score_value of score_values){
                score_array.push(score_value);
            }
            score_array.sort(this.cmp);
            console.log(score_array);
            console.log(score_array.length);
            let show_number = 5;
            if(score_array.length < 5) show_number = score_array.length;

            for(let i = 1; i <= show_number; i++){
                let name_path = "Canvas/label" + i + "/name";
                let score_path = "Canvas/label" + i + "/name/score";

                console.log(typeof name_path);
                console.log(name_path);
                cc.find(score_path).getComponent(cc.Label).string = score_array[i-1]['score']; 
                cc.find(name_path).getComponent(cc.Label).string = score_array[i-1]['name'].toUpperCase(); 
            }
            
        });
    }

    cmp(a, b) {
        if(a['score'] <= b['score']) return 1;
        else return -1;
    }

    // update (dt) {}
}
