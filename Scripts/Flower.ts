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
    @property(cc.Prefab)
    tube_prefab: cc.Prefab = null;

    private anim: cc.Animation = null;
    // onLoad () {}

    start () {
        var tube = cc.instantiate(this.tube_prefab);
        tube.setPosition(this.node.x,this.node.y);
        cc.find("Canvas").addChild(tube);

        let action : cc.Action;
        var seq = cc.sequence(cc.moveBy(2, 0, 80), cc.moveBy(0.25, 0, 0), cc.moveBy(2, 0, -80), cc.moveBy(1.5, 0, 0));
        action = cc.repeatForever(seq);

        this.node.runAction(action);

        this.anim = this.getComponent(cc.Animation);
    }

    update (dt) {
        if(!this.anim.getAnimationState("flower_move").isPlaying) this.anim.play("flower_move");
    }
}
