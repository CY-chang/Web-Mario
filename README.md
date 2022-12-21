# Software Studio 2022 Spring Assignment 2

### Scoring

|**Basic Component**|**Score**|**Check**|
|:-:|:-:|:-:|
|Membership Mechanism|10%|Y|
|Complete Game Process|5%|Y|
|Basic Rules|45%|Y|
|Animations|10%|Y|
|Sound Effects|10%|Y|
|UI|10%|Y|

|**Advanced Component**|**Score**|**Check**|
|:-:|:-:|:-:|
|Leaderboard|5%|Y|
|Offline multi-player game|5%|N|
|Online multi-player game|15%|N|
|Others [name of functions]|1-15%|N|

---

## Basic Components Description : 
1. World map : 
遊戲截圖:
![](https://i.imgur.com/7DjJuSF.png)
有正確物理性質，碰撞，背景與鏡頭會隨著玩家位置改變而跟著變動，有兩個地圖(stage1 跟 stage2)

2. Player :
有合理的碰撞，左右鍵控制左右移動，空白鍵則為跳
碰到敵人會扣血(詳細扣血機制在enemies會解釋)
玩家超出遊戲界線(ex: 掉到洞裡)會直接死亡
死亡後會回到起始點


3. Enemies : 
敵人有合理碰撞機制
兩種敵人: goomba 跟 flower

goomba:
![](https://i.imgur.com/I9kGnFS.png)

goomba會左右移動，玩家踩到它頭上可以將其擊殺。
若從其他方向接觸到他，則玩家會扣一格血
(如果玩家血量還夠的話，則goomba也會死亡)
也就是如果先前有吃到加血量的蘑菇(變大)，從其他方位碰到他可以將其擊殺，但自己也會扣一格血(恢復成小的狀態)。 但若玩家為小的型態時碰撞到則會死亡。


flower:
![](https://i.imgur.com/4cochau.png)

flower會從管子鑽出並上下移動，無法將其擊殺(只能避開)。
接觸到flower時玩家會直接死亡(不論玩家此時型態為大或小)



4. Question Blocks : 
有兩種question block，一種可以得到金幣(加分)，另一種會跑出紅色香菇，若玩家吃到可以變大(加一條血)，但此效果不能疊加，也就是若玩家此時型態為大的，再吃到一次香菇不會另外加血，一樣是維持大的狀態。而變大時的碰撞範圍也會跟著變大(碰撞範圍與玩家圖像範圍差不多大)。


5. Animations : 
馬力歐的跑跟跳都有animation
敵人animation: goomba被踩到時會扁掉(大型態的馬力歐若用左右碰撞形式將其擊殺不會有animation，goomba會直接死亡並消失)，flower在移動時嘴巴會開合開合。
![](https://i.imgur.com/e0pezqh.png)


6. Sound effects : 
兩個關卡與選單時的BGM皆不相同。
玩家的跳與死亡也都有音效。
其他音效: 碰撞到coin block時的金幣音效，踩扁goomba時的音效，吃到紅色香菇變大時的升級音效，變成小型態馬力歐時的音效(downgrade)，遊戲通關時的音效。
(雖然ppt寫說sound effect不能停止BGM，但demo影片中似乎在遊戲通關或時玩家死亡時，BGM都會停止，所以我就照著demo影片來做了)


7. UI :
![](https://i.imgur.com/6wzBnB2.png) 最右邊的數字為分數

玩家的血量與分數與獲得金幣數都可以在firebase上寫入跟讀取。
timer也能正常運作，每次進入遊戲前都會設成100秒，若跑完時玩家還沒通關，那麼玩家會直接死亡。
血量: 一開始會有五個生命，若全部用完，則分數歸零，並跳到game over的畫面(分數不會寫入scoreboard)。
分數: 擊殺goomba或是碰到coin block都會加分(200 and 100)，通關時的剩餘時間也會加到分數上。

## Advanced Component Description : 

scoreboard:
![](https://i.imgur.com/cNMx7B1.png)
只在玩家通關時把分數寫進scoreboard並跳到scoreboard的頁面，並顯示出前五名的用戶名稱與分數
點選右下角的按鈕可以回到選關頁面。

選關頁面也有按鍵讓玩家跳到scoreboard的頁面
![](https://i.imgur.com/ILDOfwb.png)


# Firebase page link

webmario-43382.firebaseapp.com
