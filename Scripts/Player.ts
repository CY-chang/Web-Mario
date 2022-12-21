// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import Goomba from "./Goomba";

const {ccclass, property} = cc._decorator;

@ccclass
export  class NewClass extends cc.Component {


    @property(cc.Node)
    Camera: cc.Node = null;

    @property(cc.Prefab)
    used_block_prefab: cc.Prefab = null;

    @property(cc.Prefab)
    coin_prefab: cc.Prefab = null;

    @property(cc.Prefab)
    mushroom_prefab: cc.Prefab = null;

    @property(cc.Prefab)
    goomba_prefab: cc.Prefab = null;


    @property(cc.Label)
    coin_label: cc.Label = null;

    @property(cc.Label)
    life_label: cc.Label = null;

    @property(cc.Label)
    score_label: cc.Label = null;

    @property(cc.Label)
    timer_label: cc.Label = null;
    
    @property({type:cc.AudioClip})
    bgm_stage1: cc.AudioClip = null;

    @property({type:cc.AudioClip})
    bgm_stage2: cc.AudioClip = null;

    @property({type:cc.AudioClip})
    jump_sound: cc.AudioClip = null;

    @property({type:cc.AudioClip})
    lose_life_sound: cc.AudioClip = null;

    @property({type:cc.AudioClip})
    coin_sound: cc.AudioClip = null;

    @property({type:cc.AudioClip})
    level_clear_sound: cc.AudioClip = null;

    @property({type:cc.AudioClip})
    power_down: cc.AudioClip = null;

    @property({type:cc.AudioClip})
    power_up: cc.AudioClip = null;

    @property({type:cc.AudioClip})
    goomba_killed: cc.AudioClip = null;

    @property({type:cc.SpriteFrame})
    idleFrame: cc.SpriteFrame = null;

    private anim: cc.Animation = null;

    private game_info_key : string = "";
    
    private life : number = 5;

    private score : number = 0;

    private coin : number = 0;

    private time_left : number = 100;


    private leftDown: boolean = false;

    private rightDown: boolean = false;

    private on_ground: boolean = true;
    
    private move_dir : number = 0;

    private player_speed : number = 300;

    private has_extra_health : boolean = false;

    private is_dead : boolean = false;

    private can_update_timer : boolean = true;

    private username : string = "";

    //private can_update_score : boolean = true;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.playBGM();

        // Add keydown event trigger
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        // Add keyup event trigger
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        // enable physical system
        cc.director.getPhysicsManager().enabled = true;

        cc.director.getCollisionManager().enabled = true;
        
        //console.log(firebase.auth().currentUser.uid);
        this.timer_label = cc.find("Canvas/Main Camera/timer_label/timer").getComponent(cc.Label);
        this.coin_label = cc.find("Canvas/Main Camera/coin_label/user_coin").getComponent(cc.Label);
        this.life_label = cc.find("Canvas/Main Camera/life_label/user_life").getComponent(cc.Label);
        this.score_label = cc.find("Canvas/Main Camera/score_label").getComponent(cc.Label);

        let database = firebase.database();
        let cur_user_uid = firebase.auth().currentUser.uid;

        database.ref('game_info').once('value',(snapshot)=>{
            /*let game_info_values = Object.values(snapshot.val());
            for(const game_info_value of game_info_values){
                if(game_info_value['uid'] == cur_user_uid){
                    this.life = game_info_value['life'];
                    this.coin = game_info_value['coin'];
                    this.score = game_info_value['score'];
                    this.time_left = game_info_value['time'];
                    
                }                
            }*/

            let game_info_keys = Object.keys(snapshot.val());
            for(const game_info_key of game_info_keys){
                console.log("test firebase");
                let game_info_value = snapshot.val()[game_info_key];
                if(game_info_value['uid'] == cur_user_uid){

                    this.life = game_info_value['life'];
                    if(this.life != null) this.life_label.string = "X" + this.life.toString();

                    this.coin = game_info_value['coin'];
                    this.score = game_info_value['score'];
                    this.time_left = game_info_value['time'];

                    this.game_info_key = game_info_key;
                    console.log(this.game_info_key);
                }                
            }
        });

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
    }

    start () {
        this.Camera.x = this.node.x;
        
        this.anim = this.getComponent(cc.Animation);

        let scene = cc.director.getScene(); 
        // goomba initialize
        if(scene.name == "Stage1"){
            /*let goomba = cc.instantiate(this.goomba_prefab);
            goomba.setPosition(-170,-200);
            cc.find("Canvas").addChild(goomba);
            let goomba2 = cc.instantiate(this.goomba_prefab);
            goomba2.setPosition(623,-200);
            cc.find("Canvas").addChild(goomba2);
            let goomba3 = cc.instantiate(this.goomba_prefab);
            goomba3.setPosition(-540,-200);
            cc.find("Canvas").addChild(goomba3);*/
        }
        else if(scene.name == "Stage2"){

        }
    }

    update (dt) {
        
        this.UpdateUI(dt);

        this.player_animation();
        
        this.node.x += this.player_speed * this.move_dir * dt;

        if(this.node.x <= -840) this.Camera.x = -840;
        else this.Camera.x = this.node.x;

        if(this.has_extra_health == false){
            this.node.scaleY = 2;
            if(this.move_dir > 0 ) this.node.scaleX = 2;
            else if(this.move_dir < 0 ) this.node.scaleX = -2;
        }
        else if(this.has_extra_health == true){
            this.node.scaleY = 3;
            if(this.move_dir > 0 ) this.node.scaleX = 3;
            else if(this.move_dir < 0 ) this.node.scaleX = -3;
        }

    }

    UpdateUI (dt){
        if(this.time_left != null && this.is_dead == false && this.can_update_timer == true){
            this.time_left -= dt;
            if(this.time_left <= 0 && this.is_dead == false){
                this.update_player_health(-2);
                this.is_dead = true;
            }
        }

        if(this.coin != null) this.coin_label.string = this.coin.toString();
        if(this.score != null) this.score_label.string = this.score.toString();
        if(this.time_left != null) this.timer_label.string = (Math.ceil(this.time_left)).toString();

        if(this.node.y <= -300 && this.is_dead == false){
            this.update_player_health(-2);
            this.is_dead = true;
        }
    }

    onKeyDown(event) {
        if(event.keyCode == cc.macro.KEY.left){
            this.leftDown = true;
            this.player_move(-1);
        }
        else if(event.keyCode == cc.macro.KEY.right){
            this.rightDown = true;
            this.player_move(1);
        }
        if(event.keyCode == cc.macro.KEY.space){
            if(this.on_ground){
                this.jump();
                cc.audioEngine.playEffect(this.jump_sound, false);
            }
        }
    }

    onKeyUp(event) {
        if(event.keyCode == cc.macro.KEY.left){
            this.leftDown = false;
            if(this.rightDown) this.player_move(1);
            else this.player_move(0);
        }
        else if(event.keyCode == cc.macro.KEY.right){
            this.rightDown = false;
            if(this.leftDown) this.player_move(-1);
            else this.player_move(0);
        }
    }

    player_move (dx) {
        this.move_dir = dx;
    }

    jump() {
        this.on_ground = false;
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 300);
    }


    update_player_health (health_change){
        if(health_change == 1){
            if(this.has_extra_health == false){
                this.has_extra_health = true;
                cc.audioEngine.playEffect(this.power_up, false);
            }
        }
        else if(health_change == -1){
            if(this.has_extra_health == true){
                this.has_extra_health = false;
                cc.audioEngine.playEffect(this.power_down, false);
            }
            else if(this.has_extra_health == false){
                this.player_died();
            }
        }
        else if(health_change <= -2){
            this.player_died();
        }
    }

    

    onBeginContact(contact, self, other){
        let collision_dir = contact.getWorldManifold().normal.y;
        if(collision_dir < 0) this.on_ground = true; // -1: 向下碰撞 1: 向上碰撞 
        //console.log(contact.getWorldManifold().normal.y);
        
        // 0: ground or used question box 1: unused question box
        if(other.node.name == "coin_block"){ 
            if(collision_dir == 1){
                this.coin += 1;
                this.score += 100;
                var block = cc.instantiate(this.used_block_prefab);
                block.setPosition(other.node.x, other.node.y);
                cc.find("Canvas").addChild(block);
                other.node.destroy();
                cc.audioEngine.playEffect(this.coin_sound, false);

                var coin_obj = cc.instantiate(this.coin_prefab);
                coin_obj.setPosition(other.node.x, other.node.y+30);
                cc.find("Canvas").addChild(coin_obj);
                this.scheduleOnce(function(){
                    coin_obj.destroy();
                } , 0.5);
            }
        }
        else if(other.node.name == "mushroom_block"){
            if(collision_dir == 1){
                var mushroom = cc.instantiate(this.mushroom_prefab);
                mushroom.setPosition(other.node.x, other.node.y+30);
                cc.find("Canvas").addChild(mushroom);

                var block = cc.instantiate(this.used_block_prefab);
                block.setPosition(other.node.x, other.node.y);
                cc.find("Canvas").addChild(block);
                other.node.destroy();
            }
        }
        else if(other.node.name == "mushroom"){
            console.log("touched mushroom");
            this.update_player_health(1);
            other.node.destroy();
            //變大
        }
        else if(other.node.name == "goomba"){
            this.score += 200;
            if(collision_dir == -1){
                other.node.name = "goomba_killed";
                other.node.height = 14;
                this.scheduleOnce( ()=> other.node.destroy(), 0.5);
                other.node.getComponent("Goomba").play_stomped_anim();
                cc.audioEngine.playEffect(this.goomba_killed, false);
                //console.log("goomba killed");
            }
            else{
                // 扣血
                other.node.destroy();
                this.update_player_health(-1);
            }
        }
        else if(other.node.name == "flag"){
            this.can_update_timer = false;
            this.score += Math.ceil(this.time_left);
            //this.can_update_score = false;
            // update firebase scoreboard 
            this.update_scoreboard();
            this.game_end();
            cc.audioEngine.playEffect(this.level_clear_sound, false);
            this.scheduleOnce( ()=> cc.director.loadScene("ScoreBoard"), 3);
        }
        else if(other.node.name == "flower"){
            this.update_player_health(-2);
        }
    }

    playBGM(){
        let scene = cc.director.getScene(); 
        if(scene.name == "Stage1")  cc.audioEngine.playMusic(this.bgm_stage1, true);
        else if(scene.name == "Stage2")  cc.audioEngine.playMusic(this.bgm_stage2, true);
    }

    stopBGM(){
        cc.audioEngine.stopMusic();
    }

    player_died(){
        //看 life是否只剩 1 決定切到哪個畫面
        // 存firebase 切scene
        let scene = cc.director.getScene();
        this.life -= 1;

        cc.audioEngine.playEffect(this.lose_life_sound, false);
        

        if(this.life <= 0){
            this.life = 5;
            this.coin = 0;
            this.score = 0;
            this.scheduleOnce( ()=> cc.director.loadScene("GameOver"), 2);
        }
        else{
            if(scene.name == "Stage1") this.scheduleOnce( ()=> cc.director.loadScene("GameStart1"), 3);
            else if(scene.name == "Stage2") this.scheduleOnce( ()=> cc.director.loadScene("GameStart2"), 3);
        }
        this.game_end();
    }

    game_end(){
        this.firebase_data_update();
        this.stopBGM();
        cc.director.getCollisionManager().enabled = false;
        cc.director.getPhysicsManager().enabled = false;
        this.player_speed = 0;
        // Close key control event trigger
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    firebase_data_update(){
        let database = firebase.database();

        let data = {
            life : this.life, // -1 or +0
            score : this.score, // update 
            time : 100, // no update
            coin : this.coin,  // update
            uid : firebase.auth().currentUser.uid,
        };
        database.ref('game_info/'+this.game_info_key).set(data);
    }

    update_scoreboard(){
        //TODO
        let database = firebase.database();

        let data = {
            score : this.score,
            name : this.username,
        }
        let key = database.ref('score_board').push(data).key;
    }

    player_animation(){
        if(this.on_ground){
            if(this.move_dir == 0){
                this.getComponent(cc.Sprite).spriteFrame = this.idleFrame;
                this.anim.stop();
            }
            else if(!this.anim.getAnimationState("player_walk").isPlaying) this.anim.play("player_walk");
        }
        else{
            if(!this.anim.getAnimationState("player_jump").isPlaying ) this.anim.play("player_jump");
        }
    }
}
