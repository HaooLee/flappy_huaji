/**
 * Created by haoli on 2017/1/5.
 */
function Bird(){
    this.width;//定下就不变了
    this.height;//定下就不变了
    this.top; // 小鸟跳动改变的只有这个值
    this.left;//定下就不变了
    this.speed;
    this.timer; //这个用来保存当前小鸟飞的定时器的句柄
    this.aa;
}
Bird.prototype.init = function(width, height, top, left){
    this.width = width;
    this.height = height;
    this.top = top;
    this.left = left;
    this.speed = 0;
};
Bird.prototype.jump = function () {
    this.speed = -15;
}
Bird.prototype.drop = function(){
    var content = this;
    this.timer = setInterval(function(){
        //Bird.call(this, );
        if(!gameOver){
            content.speed += 1.5;
            content.top += content.speed;
        }

        // if(content.top > 580 || content.top < -40){
        //     gameOver = true;
        // }
    }, 25);
};