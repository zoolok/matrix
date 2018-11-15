
c = document.getElementById('c');
ctx= c.getContext('2d');

var h = c.height = window.innerHeight;
var w = c.width = document.body.clientWidth;

var particles = [];

var opts = { // опции
    minRadius: 1,
    maxRadius: 2,
    bgc:"#fff",
    counts:100,
    defaultSpeed:0.05,
    addedSpeed: 0,
    distance: 160
};

/*****************************************************************/
draw = function (Xpos, Ypos, radius){ // объект точки

    this.color = opts.bgc;

    Xpos ? this.Xpos = Xpos: this.Xpos = Math.random() * w;
    Ypos ? this.Ypos  = Ypos: this.Ypos = Math.random() * h;

    this.directionAngle = Math.floor(Math.random()*360);
    this.speed = opts.defaultSpeed + Math.random()+opts.addedSpeed;

    radius ?  this.radius = radius : this.radius = opts.minRadius + Math.random()*opts.maxRadius;

    this.dx = Math.cos(this.directionAngle) * this.speed;
    this.dy = Math.sin(this.directionAngle) * this.speed;

    this.border = function () { // проверяем выпадение точки за границы
        if(this.Xpos <= 0 || this.Xpos >= w){
            this.dx *= -1;
        }
        if(this.Ypos <= 0 || this.Ypos >= h){
            this.dy *= -1;
        }

        this.Xpos > w ? this.Xpos = w : this.Xpos;
        this.Ypos > h ? this.Ypos = h : this.Ypos;
        this.Xpos < 0 ? this.Xpos = 0 : this.Xpos;
        this.Ypos < 0 ? this.Ypos = 0 : this.Ypos;
    };

    this.update = function () {// перемещаем точку
        this.border();
        this.Xpos += this.dx;
        this.Ypos += this.dy;
    };

    this.drawDot = function(){ //рисуем точку
        ctx.beginPath();
        ctx.arc(this.Xpos, this.Ypos, this.radius, 0, Math.PI*2);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
};

/*****************************************************************/

function arrDot(){ // заполняем массив точками с их параметрами

    for(var i = 0;i < opts.counts; i++) {
        particles.push(new draw());
        console.log(particles);
    }
}
arrDot(); // заполняем массив с точками

/*****************************************************************/

arrDraw = function (){ // функция отрисовки точек и линий
    ctx.clearRect(0, 0, w, h);

    for(var j = 0;j < opts.counts; j++) {
        particles[j].update();
        particles[j].drawDot();
    }
    for (var i = 0; i < particles.length; i++){
        linkPoints(particles[i], particles);
    }
};

/*****************************************************************/

checkDistance = function(x1, y1, x2, y2){ // функция вычисления  расстояния между точками
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

/*****************************************************************/

linkPoints = function(point1, hubs){ // функция соединения линиями точек
    for (var i = 0; i < hubs.length; i++) {
         distance = checkDistance(point1.Xpos, point1.Ypos, hubs[i].Xpos, hubs[i].Ypos); //  вычисляем расстояние между точками

            opacity = 1 - distance / opts.distance;

         if (opacity > 0) {
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = 'rgba(255,255,255,' + opacity + ')';
            ctx.beginPath();
            ctx.moveTo(point1.Xpos, point1.Ypos);
            ctx.lineTo(hubs[i].Xpos, hubs[i].Ypos);
            ctx.closePath();
            ctx.stroke();
        }
    }
};

/*****************************************************************/

c.addEventListener("click", function(e){
    particles.push( new draw(e.pageX, e.pageY, '5') );
    console.log(particles.length);
    console.log(e.pageX, e.pageY);
});

setInterval(arrDraw,0); // запускаем отрисовку


