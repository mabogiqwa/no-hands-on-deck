const canvas=document.getElementById("myCanvas");
//The above line of code retrieves the HTML element with attribute 'myCanvas'
canvas.width=210
//Above line of code sets width of canvas to 210

const ctx =canvas.getContext("2d");
/*Above line of code allows us to render 2D shapes on the canvas.
ctx variable represents this drawing context*/
const road=new Road(canvas.width/2,canvas.width*0.9);
const car=new Car(100,100,30,50);
/*The first two parameters represent the initial position of the car 
and the last two represent the dimensions of the car*/
car.draw(ctx);
//The draw method renders the 2D shape

function animate(){
    car.update();
    canvas.height=window.innerHeight;
    road.draw(ctx);
    //Above line of code sets the height of canvas to match height of visible browser length
    car.draw(ctx);
    requestAnimationFrame(animate); //Gives the illusion of movement by rendering ~60fps
}

animate();