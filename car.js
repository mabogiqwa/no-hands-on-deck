class Car{
    constructor(x,y,width,height){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        this.speed=0;
        this.acceleration=0.2;
        this.maxSpeed=3;
        this.friction=0.05;
        this.angle=0;

        this.sensor=new Sensor(this);
        this.controls=new Controls();
    }

    /*Function that will reflect directional changes on canvas 
    based on user keyboard interaction*/
    update() {
        this.#move();
        this.sensor.update();
    }

    #move(){
        if (this.controls.forward){
            this.speed+=this.acceleration; //Increase speed when moving forward
        }
        if (this.controls.reverse){
            this.speed-=this.acceleration; //Decrease speed when moving in reverse
        }
        if (this.speed > this.maxSpeed){
            this.speed=this.maxSpeed; //Limit maximum forward speed
        }
        if (this.speed < (-this.maxSpeed/2)){
            this.speed=-this.maxSpeed/2; //Ensures that maximum speed for reverse
        }
        if (this.speed > 0){
            this.speed-=this.friction; //Applies friction to reduce forward speed
        }
        if (this.speed < 0){
            this.speed+=this.friction; //Applies friction to reduce reverse speed gradually
        }
        if (Math.abs(this.speed) < this.friction){
            this.speed=0;
        }
        if (this.controls.left){
            this.angle+=0.03;
        }
        if (this.controls.right){
            this.angle-=0.03;
        }

        this.x-=Math.sin(this.angle)*this.speed;
        this.y-=Math.cos(this.angle)*this.speed;
    }

    draw(ctx){
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(-this.angle);

        ctx.beginPath();
        //draws path by connecting a set of points 
        ctx.rect(-this.width/2,-this.height/2,this.width,this.height);
        ctx.fill();
        //Fills the current path

        ctx.restore();

        this.sensor.draw(ctx);
    }
}