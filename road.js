//Feature addition: Add a curved road
class Road{
    constructor(x,width,laneCount=3){
        this.x=x; //Sets the x-coordinate of the road's center
        this.width=width; //Sets the width of the road
        this.laneCount=laneCount; //Sets the number of lanes

        this.left=x-width/2; //Stores the x-coordinate of the left edge of the road
        this.right=x+width/2; //Stores the x-coordinate of the right edge of the road

        const infinity=1000000; //Defines a large value(infinity) to simulate a long road
        this.top=-infinity; //Sets the top boundary of the road to -infinity (extending far upward)
        this.bottom=infinity; //Sets the bottom boundary of the road to infinity (extending far downward)

        const topLeft={x: this.left, y: this.top};
        const topRight={x: this.right, y: this.top};
        const bottomLeft={x:this.left, y: this.bottom};
        const bottomRight={x: this.right, y: this.bottom};

        this.borders=[
            [topLeft,bottomLeft],
            [topRight,bottomRight]
        ];
    }

    getLaneCenter(laneIndex){
        const laneWidth=this.width/this.laneCount; //Computes the width of each lane
        return this.left+laneWidth/2+Math.min(laneIndex,this.laneCount-1)*laneWidth; //Calculates the center of the lane
    }

    draw(ctx){
        ctx.lineWidth=5; //Sets line width for drawing
        ctx.strokeStyle="white";

        //Loops through the lane boundaries
        for(let i=1; i <= this.laneCount-1; i++){
            const x=lerp(this.left,
                this.right,
                i/this.laneCount
            ); //Calculates the x-coordinate of the lane boundary using linear interpolation

            /*
            if(i>0 && i<this.laneCount){ //Checks if boundary is not leftmost or rightmost edge
                ctx.setLineDash([20,20]); //Sets dash lines for inner lane dividers
            } else {
                ctx.setLineDash([]); //Removes dashed lines for outer edges
            }
            */

            ctx.setLineDash([20,20]);
            ctx.beginPath();
            ctx.moveTo(x,this.top); 
            ctx.lineTo(x,this.bottom); 
            ctx.stroke();
        }

        ctx.setLineDash([]);
        this.borders.forEach(border=>{
                ctx.beginPath(); 
                ctx.moveTo(border[0].x, border[0].y);
                ctx.lineTo(border[1].x, border[1].y);
                ctx.stroke();
            });
    }
}
