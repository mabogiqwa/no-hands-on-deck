class Controls {
    constructor(){
        this.forward=false;
        this.left=false;
        this.right=false;
        this.reverse=false;
        //The properties above represent the different states of directional control

        this.#addKeyboardListeners();
        //addKeyboardListeners is a private method
    }

    #addKeyboardListeners() {
        //onkeydown is when there user interacts with the keyboard
        //directional keys
        document.onkeydown=(event)=>{ //Sets a listener for an keydown event
            switch(event.key){
                case "ArrowLeft":
                    this.left=true;
                    break;
                case "ArrowRight":
                    this.right=true;
                    break;
                case "ArrowUp":
                    this.forward=true;
                    break;
                case "ArrowDown":
                    this.reverse=true;
                    break;
            }
            console.table(this);
        }
        //onkeyup relates to when no key is being pressed
        document.onkeyup=(event)=>{
            switch(event.key){
                case "ArrowLeft":
                    this.left=false;
                    break;
                case "ArrowRight":
                    this.right=false;
                    break;
                case "ArrowUp":
                    this.forward=false;
                    break;
                case "ArrowDown":
                    this.reverse=false;
                    break;
            }
            console.table(this);
        }
    }
}