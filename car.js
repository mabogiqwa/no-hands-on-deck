class Car{
    constructor(x,y,width,height){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        this.controls=new Controls();
    }

    draw(ctx){
        ctx.beginPath();
        //draws path by connecting a set of points 
        ctx.rect(this.x-this.width/2, this.y-this.height/2,this.width,this.height);
        ctx.fill();
        //Fills the current path
    }
}