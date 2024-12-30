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

        this.controls=new Controls();
    }

    /*Function that will reflect directional changes on canvas 
    based on user keyboard interaction*/
    update() {
        if (this.controls.forward){
            //this.y = this.y - 2;
            this.speed+=this.acceleration;
        }
        if (this.controls.reverse){
            this.speed-=this.acceleration;
        }
        if (this.speed > this.maxSpeed){
            this.speed=this.maxSpeed;
        }
        if (this.speed < (-this.maxSpeed/2)){
            this.speed=-this.maxSpeed/2;
        }
        if (this.speed > 0){
            this.speed-=this.friction;
        }
        if (this.speed < 0){
            this.speed+=this.friction;
        }
        this.y-=this.speed;
    }

    draw(ctx){
        ctx.beginPath();
        //draws path by connecting a set of points 
        ctx.rect(this.x-this.width/2, this.y-this.height/2,this.width,this.height);
        ctx.fill();
        //Fills the current path
    }
}