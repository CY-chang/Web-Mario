// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
//import {Player} from "./Player"


const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    player: cc.Prefab = null;

    private anim: cc.Animation = null;
    // LIFE-CYCLE CALLBACKS:



    //private player: Player = null;

    private can_attack: boolean = true;

    private can_be_attacked: boolean = true;

    private whole_attack_time: number = 4;
    
    private jump_time: number = 0.75;
    
    private dash_time: number = 1.5;
    
    private drop_time: number = 0.75;

    private idle_time: number = 1;

    private speed_x: number = 0;

    private speed_y: number = 0;
    // onLoad () {}

    start () {
        /*let action : cc.Action;
        var seq = cc.sequence(cc.moveBy(3, 240, 0), cc.moveBy(3, -240, 0));
        action = cc.repeatForever(seq);

        this.node.runAction(action);*/
        cc.director.getPhysicsManager().enabled = true;
        //this.player = cc.find("Canvas/Player").getComponent(Player);



        this.can_attack = false;

        

        this.speed_y = 70;
        

        // 跳起快到慢 往左或往右衝刺 落下慢到快 靜止s.jump_time);
        this.scheduleOnce( ()=> {this.speed_y = 0; this.speed_x = 80}, this.jump_time);

        this.scheduleOnce( ()=> {this.speed_x = 0; this.speed_y = -50}, this.jump_time + this.dash_time);

        //this.scheduleOnce( ()=> this.speed_y = 0, this.jump_time + this.dash_time + this.drop_time);
        this.anim = this.getComponent(cc.Animation);
    }
    update (dt) {
        if(this.node.name == "goomba_killed"){
            this.node.name = "downwarded_goomba";
            this.node.y -= 12;
        }
        this.node.x += dt * this.speed_x;
        this.node.y += dt * this.speed_y;

        if(this.speed_y != 0) this.speed_y -= 0.1;
    }

    play_stomped_anim(){
        this.anim.play("goomba_stomped");
    }

    onBeginContact(contact, self, other){
        if(other.node.name == "ground_collider"){
            if(this.speed_y < 0){
                this.speed_y = 0;
                this.scheduleOnce( () => this.can_attack = true, this.idle_time);
            }
            else if(this.speed_y > 0) this.speed_y = 0;
        }
    }
}
