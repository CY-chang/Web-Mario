// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    flower_prefab: cc.Prefab = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        /*var flower = cc.instantiate(this.flower_prefab);
        flower.setPosition(this.node.x,this.node.y-10);
        this.node.height = 8;
        this.node.width = 4;
        cc.find("Canvas").addChild(flower);
        this.node.parent = flower;*/
    }

    // update (dt) {}
}
