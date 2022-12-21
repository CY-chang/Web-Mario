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
    user_label: cc.Label = null;

    @property(cc.Label)
    coin_label: cc.Label = null;

    @property(cc.Label)
    life_label: cc.Label = null;

    @property(cc.Label)
    score_label: cc.Label = null;

    @property({type:cc.AudioClip})
    bgm: cc.AudioClip = null;

    private username : string = "";
    
    private life : number = 5;

    private score : number = 0;

    private coin : number = 0;

    private uid_to_username_updated : boolean = false;


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //cc.audioEngine.stopMusic();
        let database = firebase.database();
        let cur_user_uid = firebase.auth().currentUser.uid;
        database.ref('player_info').once('value',(snapshot)=>{
            //console.log(snapshot.val());
            let user_info_values = Object.values(snapshot.val());
            for(const user_info_value of user_info_values){
                if(cur_user_uid == user_info_value['uid']){
                    this.username = user_info_value['user'];
                    console.log(this.username);
                }
            }
            //console.log(user_info_keys);
        });
        database.ref('game_info').once('value',(snapshot)=>{
            let game_info_values = Object.values(snapshot.val());
            console.log(game_info_values);
            let found_user = false;
            for(const game_info_value of game_info_values){
                if(game_info_value['uid'] == cur_user_uid){
                    found_user = true;
                    this.life = game_info_value['life'];
                    this.coin = game_info_value['coin'];
                    this.score = game_info_value['score'];
                }                
            }
            if(found_user == false){
                let data = {
                    life : 5,
                    score : 0,
                    time : 100,
                    coin : 0,
                    uid : cur_user_uid,
                };
                let key = database.ref('game_info').push(data).key;
            }
        }); 

        this.playBGM();
    }

    start () {
        let stage1_btn = new cc.Component.EventHandler();
        stage1_btn.target = this.node;
        stage1_btn.component = "StageSelect";
        stage1_btn.handler = "load_stage1_scene";

        let stage2_btn = new cc.Component.EventHandler();
        stage2_btn.target = this.node;
        stage2_btn.component = "StageSelect";
        stage2_btn.handler = "load_stage2_scene";

        let score_board_btn = new cc.Component.EventHandler();
        score_board_btn.target = this.node;
        score_board_btn.component = "StageSelect";
        score_board_btn.handler = "load_scoreboard_scene";

        cc.find("Canvas/Stage1").getComponent(cc.Button).clickEvents.push(stage1_btn);
        cc.find("Canvas/Stage2").getComponent(cc.Button).clickEvents.push(stage2_btn);
        cc.find("Canvas/Scoreboard").getComponent(cc.Button).clickEvents.push(score_board_btn);

        this.user_label = cc.find("Canvas/user_label/user_name").getComponent(cc.Label);
        this.coin_label = cc.find("Canvas/coin_label/user_coin").getComponent(cc.Label);
        this.life_label = cc.find("Canvas/life_label/user_life").getComponent(cc.Label);
        this.score_label = cc.find("Canvas/score_label/user_score").getComponent(cc.Label);
    }

    load_stage1_scene(){    
        this.scheduleOnce( ()=> cc.director.loadScene("GameStart1"), 1);
    }

    load_stage2_scene(){        
        this.scheduleOnce( ()=> cc.director.loadScene("GameStart2"), 1);
    }
    load_scoreboard_scene(){
        this.scheduleOnce( ()=> cc.director.loadScene("ScoreBoard"), 1);
    }
    update (dt) {
        this.user_label.string = this.username.toUpperCase();
        this.coin_label.string = "X" + this.coin.toString();
        this.life_label.string = "X" + this.life.toString();
        this.score_label.string = this.score.toString();
        
        // TODO!
        /*if((this.username!="" && this.username!=null) && this.uid_to_username_updated==false){
            this.uid_to_username_updated = true;
            let database = firebase.database();
            let cur_user_uid = firebase.auth().currentUser.uid;
            
            let data = {
                uid : cur_user_uid,
                username : this.username, 
            };
            let key = database.ref('uids_and_names').push(data).key;
        }*/
    }

    playBGM(){
        cc.audioEngine.playMusic(this.bgm, true);
    }
}
