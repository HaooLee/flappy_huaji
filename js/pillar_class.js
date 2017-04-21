/**
 * Created by haoli on 2017/1/5.
 */
function Pillar(){
    this.width = CVSWIDTH / 10;
    this.height = null; //number
    this.left = null; //number
    this.top = null; //number
    this.id = null; // number
    this.location = null; //boolean true--> top false--> bottom
    //出错
    // this.reset = function(){
    //     this.height = getRandom(100, 300);
    //     this.left = CVSWIDTH;
    // }
}
Pillar.prototype.init = function(location, left, selfHeight, topHeight) { //如果不是上面的柱子就需要上面柱子的数据
    this.location = location;
    // this.left = CVSWIDTH;// 任何柱子不管上面下面 初始化的时候位置都应该在画布外面
    this.left = left;
    if (this.location) { //true 代表自己是上面的柱子
        this.height = selfHeight;
        this.top = 0;
    } else {  // fasle 代表下面的柱子 下面的柱子高度就要计算
        this.height = selfHeight;
        this.top = topHeight + 160;
    }
}
/*
Pillar.prototype.init = function(location, topHeight){ //如果不是上面的柱子就需要上面柱子的数据
    this.location = location;
    this.left = CVSWIDTH - 100;// 任何柱子不管上面下面 初始化的时候位置都应该在画布外面
    if( this.location ){ //true 代表自己是上面的柱子
        this.height = getRandom(100, 300);

        this.top = 0;
    } else {  // fasle 代表下面的柱子 下面的柱子高度就要计算
        this.height = CVSHEIGHT - topHeight - 120;
        this.top = topHeight + 120;
    }
};
*/
/**
 * @param min
 * @param max
 * @returns {number}
 */
function getRandom(min,max){
    return Math.round(Math.random() * max + min);
}