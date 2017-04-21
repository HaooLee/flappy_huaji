/**
 * Created by haoli on 2017/1/7.
 */
function Cloud(){
    this.width = null;
    this.height = null;
    this.left = null;
    this.top = null;
    this.opacity = null;//待定 说不定用不用
    this.leftMoveSpeed = null; //后面定义个方法 赋值2-5的随机数


}
Cloud.prototype.init = function(){
    //云的图大小 200*150
    this.width = getRandom(50, 150);
    this.height = this.width * 150 / 200;
    this.left = getRandom(0, CVSWIDTH); // 云应该随机出现 left值应该是canvas的宽度 到 0 或者 -this.width
    this.top = getRandom(0, 200);
    this.opacity = null;//待定 说不定用不用
    this.leftMoveSpeed = getRandom(0.5, 3); //后面定义个方法 赋值2-5的随机数
};
Cloud.prototype.move = function(){
    if(this.left > -this.width){
        this.left -= this.leftMoveSpeed;
    }else {
        this.reset();
    }
};
Cloud.prototype.reset = function(){//这个方法用来当云出了画布 吧left变为CVSWIDTH 并改变大小
    this.init();
    this.left = CVSWIDTH;

};
