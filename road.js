//Feature addition: Add a curved road
class Road{
    constructor(x,width,laneCount=4){
        this.x=x;
        this.width=width;
        this.laneCount=laneCount;

        this.left=x-width/2;
        this.right=x+width/2;

        const infinity=1000000;
        this.top=-infinity;
        this.bottom=infinity;
    }

    getLaneCenter(laneIndex){
        const laneWidth=this.width/this.laneCount;
        return this.left+laneWidth/2+Math.min(laneIndex,this.laneCount-1)*laneWidth;
    }

    draw(ctx){
        ctx.lineWidth=5;
        ctx.strokeStyle="white";

        for(let i=0; i <= this.laneCount; i++){
            const x=lerp(this.left,this.right,i/this.laneCount);

            if(i>0 && i<this.laneCount){
                ctx.setLineDash([20,20]);
            } else {
                ctx.setLineDash([]);
            }
            ctx.beginPath();
            ctx.moveTo(this.left,this.top);
            ctx.lineTo(this.left,this.bottom);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(x,this.top);
            ctx.lineTo(x,this.bottom);
            ctx.stroke();
        }
    }
}

function lerp(A,B,t){
    return A+(B-A)*t;
}