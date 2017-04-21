/**
 * Created by haoli on 2017/1/5.
 */
window.onload = function(){
    var cvs = document.getElementById("canvas");
    var cvsBg = document.getElementById("canvasBg");
    var start = document.getElementById("start");
    var stop = document.getElementById("stop");
    var restart = document.getElementById("restart")
    var ctx2 = cvsBg.getContext('2d');
    var ctx = cvs.getContext('2d');
    // var CVSWIDTH  = cvs.width;
    // var CVSHEIGHT = cvs.height;
    window.CVSWIDTH  = cvs.width;//上面的报错 所以这样写了
    window.CVSHEIGHT = cvs.height;
    window.PILLARNUM = 4;//需要几根柱子
    window.gameOver = false;
    console.log(CVSWIDTH, CVSHEIGHT);
    var pillars = [];
    var clouds = [];
    var gameOverStr = "";
        var pillarImg = new Image();
        pillarImg.src = "img/pillar.png";
        var bgImg = new Image();
        bgImg.src = "img/bg.jpg";
        var cloudImg = new Image();
        cloudImg.src = "img/cloud.png";
        var cloudImg2 = new Image();
        cloudImg2.src = "img/cloud1.png";
        var birdImg = new Image();
        birdImg.src = "img/bird_right.png";
        var birdImg2 = new Image();
        birdImg2.src = "img/bird2.png";
        var birdImg3 = new Image();
        birdImg3.src = "img/bird3.png";
        var birdImg4 = new Image();
        birdImg4.src = "img/bird4.png";
        var birdBg = [birdImg2,birdImg3,birdImg4];
        for(var x in bgImg){
            console.log(x);
        }
    var bird; // 鸟的对象放在全局
    var count = 0; //用来爆粗当前过了多少关
    createCloud();//由于云需要在开局就开始绘制 所以不放在startGame函数里面了
    start.onclick = function(){
         this.style.visibility = "hidden";
         stop.style.visibility = "visible";
        //游戏准备时间
        createPillars();//调用时间函数创建上下两个柱子
        bird = createBird();
        gameStart(pillars); //游戏开始的时候吧创建好的装着柱子对象的数组传进去
        //其实不用传 定义在全局
    };
    //创建小鸟的函数
    function createBird(){
        var bird = new Bird();
        bird.init(40, 40, 200, 120, 1);//小鸟的信息初始化一下
        return bird;
    }
    //创建柱子的函数
    function createPillars(){
         var rdm;
        for(var i = 0; i < PILLARNUM * 2; i++){
            var pillar = new Pillar();
            var initLeft = CVSWIDTH + Math.floor(i / 2) * (CVSWIDTH + 80) / PILLARNUM;//第一次初始化的时候他的左边位置应该在哪
            if(i % 2 === 0){
                rdm = getRandom(100, 300);
               // console.log(rdm);
                pillar.init(true, initLeft, rdm);//传入true代表当前柱子是上面的柱子
                // topHeight = pillar.height; //第一次进来肯定在这 吧当前柱子位置记录下来 方便计算下面柱子的坐标
            } else {
                pillar.init(false, initLeft, CVSHEIGHT - rdm - 160, rdm );//初始化的时候必须传入上面柱子的位置
            }
                pillars.push(pillar);
        }
    }
    function createCloud() {
        for(var i = 0; i < 5; i++){
            var cloud = new Cloud();
            cloud.init();
            clouds.push(cloud);
        }
    }

    //背景渲染
    (function(){
        ctx2.clearRect(0, 0, CVSWIDTH, CVSHEIGHT);
        ctx2.drawImage(bgImg, 0, 0);
        for (var i = 0; i < clouds.length; i++){
            ctx2.drawImage(cloudImg,clouds[i].left, clouds[i].top, clouds[i].width, clouds[i].height);
            clouds[i].move();
           // console.log(clouds[i].left);
        }
        //setTimeout(arguments.callee, 30)
        requestAnimationFrame(arguments.callee);
    })();//背景渲染函数


    //游戏场景渲染的函数
   function gameStart(pillars) {
       bird.drop();
       draw(pillars);//场景渲染
       ctx.font = "bold 22px 微软雅黑";
       // ctx.shadowOffsetX = 3;
       // ctx.shadowOffsetY = 3;
       // ctx.shadowColor = "#000";
       ctx.textAlign=" center ";
       ctx.fillStyle = "yellow";
       function draw(arr) {
           // var date = Date.now();
           ctx.clearRect(0, 0, CVSWIDTH, CVSHEIGHT);
           for (var i = 0; i < pillars.length; i++) {
               ctx.drawImage(pillarImg, pillars[i].left, pillars[i].top, pillars[i].width, pillars[i].height);
           }
           ctx.drawImage(birdImg, bird.left, bird.top, bird.width, bird.height);
           ctx.fillText("少侠当前是第" + (count / 2) + "关" , CVSWIDTH / 2 - 80, CVSHEIGHT/6);
           ctx.save();
           ctx.font = "bold 42px 微软雅黑";
           ctx.fillStyle = "#D923FF";
           ctx.fillText(gameOverStr,CVSWIDTH / 2 - 140 , CVSHEIGHT / 4 );
           ctx.restore();
           // setTimeout(arguments.callee, 60 / 1000);
           requestAnimationFrame(arguments.callee);
       }// 场景渲染函数

       stop.onclick = function () {
           if(!gameOver){
               if (this.innerHTML == "‖") {
                   clearInterval(timer);
                   clearInterval(bird.timer)
                   this.innerHTML = "▶";
               } else {
                   timer = setInterval(pillarMove, 16);
                   bird.drop();
                   this.innerHTML = "‖";
               }
           }
           return false;
       };

       window.onkeydown = window.onmousedown = function(ev){
           var ev = ev || event;//先写上 说不定后边要用
           //console.log("click");
           bird.jump();
       };

       //启动超级变换形态！！ ！
       //启动setInterval.......
       var timer = setInterval(pillarMove, 10);
       function pillarMove() {
           for (var i = 0; i < pillars.length; i++) {
                   pillars[i].left -= 1;
               //进行关卡位置判断
               if(Math.floor(pillars[i].left) + 80 == 120){
                   count++;//表示当前是多少关
                   if(count > 3){
                        //mark一下 后期添加闯关难度  闯关越多 难度增加 可能调用init
                   }
               }
               // console.log(pillars[i].left)
               //在这里进行碰撞检测
               if(pillars[i].location){ //只用上面的柱子和小鸟进行判断  不然会出一万个bug
                   if(pillars[i].left < bird.left + bird.width && pillars[i].left +  pillars[i].width > bird.left){
                       //证明当前小鸟在柱子的范围内 然后对小鸟的高度才进行判断
                       if(bird.top < pillars[i].height - 5 || bird.top + bird.height > pillars[i].height + 176){//这里进行小鸟个柱子是否碰撞 数字5是留个误差
                    //进来了代表游戏结束了
                          // if(bird.top < pillars[i].height - 5){//这个if判断可有可无 强迫症不能容忍错位
                          //     bird.top = pillars[i].height - 5;
                          // } else{
                          //     bird.top = pillars[i].height + 176 - bird.height ;
                          // }
                           gameOver = true;
                           clearInterval(timer);
                           clearInterval(bird.timer)
                           cloudImg = cloudImg2;
                           birdImg = birdBg[getRandom(0, birdBg.length-1)];
                           gameOverStr = "菜逼！ 游戏结束！！";
                           restart.style.visibility = "visible";
                           restart.onclick = function () {
                               location.reload(false);
                           }
                       }
                   }
               }
               if (pillars[i].left < -80) {//证明当前这个柱子到画布外面去了 需要把它初始化一下

                   if(pillars[i].location) {
                       var rdm = getRandom(100, 300);
                       pillars[i].init(true, CVSWIDTH, rdm );//传入true代表当前柱子是上面的柱子
                   }else {
                       pillars[i].init(false, CVSWIDTH, CVSHEIGHT - rdm - 160, rdm );//初始化的时候必须传入上面柱子的位置
                   }
                   // console.log( pillars.length);
                   // // pillars.shift();
                   //  delete pillars[i];
                   // }
                   // if(pillars.length < 8  &&  pillars[0].left ===  280 || pillars[0].left ===  560){
                   //     createPillars();
                   // }
                   // if(pillars.length / 2 < 4){
                   //这里取数组里面left值最大的那个和一个值作比较  如果小于这个值证明距离够了 可以创建一个了
                   //或者使用计数器 计算第一个柱子移动了多少距离
                   //
               }
           }
       }
   }
}//onload

