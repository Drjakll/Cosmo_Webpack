

function Drag_Scroll() {
    this.mousedown = false;
    this.start_X = null;
    this.start_Y = null;
    this.speed = 1;
    this.scrollLeft = null;
    this.scrollTop = null;
    
    Drag_Scroll.pageX = null;
    Drag_Scroll.pageY = null;
    
    Drag_Scroll.update_pageXY = (e) => {
        Drag_Scroll.pageX = e.pageX;
        Drag_Scroll.pageY = e.pageY;
    };

    this.init_drag = (event, element)=>{
        
        if(event.button !== 0)
            return;
        
        this.mousedown = true;
        this.start_X = Drag_Scroll.pageX - element.offsetLeft;
        this.start_Y = Drag_Scroll.pageY - element.offsetTop;
        
        element.style.cursor = "grabbing";

        this.scrollLeft = element.scrollLeft;
        this.scrollTop = element.scrollTop;

    };
    
    this.disable_drag = (event, element)=>{
        
        if(event.button !== 0)
            return;
        
        this.mousedown = false;
        
        element.style.cursor = "";

        element.classList.remove("unselectable-text");
    };
    
    this.move_drag = (event, element)=>{
        
        if(!this.mousedown){
            return;
        }

        let end_Y = Drag_Scroll.pageY - element.offsetTop;
        let end_X = Drag_Scroll.pageX - element.offsetLeft;
        let move_x = (end_X - this.start_X) * this.speed;
        let move_y = (end_Y - this.start_Y) * this.speed;

        element.scrollTop = this.scrollTop - move_y;        
        element.scrollLeft = this.scrollLeft - move_x;
        
        element.classList.add("unselectable-text");

    };
}

export default Drag_Scroll;