//Use to drag elements around the screen

let Drag = function () {

    Drag.mousedown = false;

    this.child_location = { x: null, y: null };

    this.last_mouse_position = { x: null, y: null };

    Drag.child = null;

    this.init_child = (event, child) => {

        if (event.button !== 0) {
            return;
        }

        Drag.mousedown = true;

        Drag.child = child;

        Drag.child.style.cursor = "grabbing";
    }

    this.init_drag = (event) => {

        if (event.button !== 0 || !Drag.child) {
            return;
        }

        Drag.parent.style.cursor = "grabbing";

        Drag.parent.classList.add("unselectable-text");

        this.child_location.x = Drag.child.offsetLeft;
        this.child_location.y = Drag.child.offsetTop;

        this.last_mouse_position.x = event.clientX;
        this.last_mouse_position.y = event.clientY;

    };

    this.dragging = (event) => {

        if (!Drag.mousedown || !Drag.child) {
            return;
        }

        let difference = { x: event.clientX - this.last_mouse_position.x, y: event.clientY - this.last_mouse_position.y };

        this.child_location.x += difference.x;
        this.child_location.y += difference.y;

        Drag.child.style.left = `${this.child_location.x}px`;
        Drag.child.style.top = `${this.child_location.y}px`;

        this.last_mouse_position.x = event.clientX;
        this.last_mouse_position.y = event.clientY;
    };

    this.disable_drag = (event) => {

        if (event.button !== 0) {
            return;
        }

        Drag.mousedown = false;

        Drag.child.style.cursor = "";

        Drag.child = null;

        Drag.parent.style.cursor = "";

        Drag.parent.classList.remove("unselectable-text");
    };

};

export default Drag;