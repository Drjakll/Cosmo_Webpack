import './text_node.less'; 


class Photo_Display extends HTMLElement {

    static get observedAttributes() {

        return ['photo_links', "aws_s3_url", "show_photos"];

    }

    Show_Photos = false;

    constructor() {

        super();
    }

    attributeChangedCallback(name, oldValue, newValue) {

        if (name === "show_photos") {

            this.Show_Photos = newValue === '0' ? false : true;

            this.render();

        }

    }

    connectedCallback() {

        this.render();

    }

    Assign_Events = () => {

        this.querySelector("#slide-left-button").addEventListener("click", (e) => {

            let length = this.photo_ids?.length || 1;

            this.current_index -= 1;
            this.current_index %= length;
            this.current_index += (this.current_index < 0 ? length : 0);

            location.assign(`#${this.photo_ids[this.current_index]}`)

        });

        this.querySelector("#slide-right-button").addEventListener("click", (e) => {

            let length = this.photo_ids?.length || 1;

            this.current_index += 1;
            this.current_index %= length;
            this.current_index += (this.current_index < 0 ? length : 0);

            location.assign(`#${this.photo_ids[this.current_index]}`);
        });

        this.querySelector("#photo-exit-button").addEventListener("click", (e) => {

            this.setAttribute("show_photos", '0');

        });

    }

    render() {

        let aws_s3_url = this.getAttribute('aws_s3_url') || "";
        let photo_links = this.getAttribute('photo_links') || "{}";

        photo_links = JSON.parse(photo_links);

        let htmlStr = '';

        this.photo_ids = [];

        this.current_index = 0;

        for (let key in photo_links) {

            htmlStr = htmlStr + `<div class="highlight-photo-wrapper" id="photo-${key}"><img src='${aws_s3_url}${photo_links[key].link}'/></div>`;

            this.photo_ids.push(`photo-${key}`);
        }

        this.innerHTML = `<div id="highlighted-photos" class="${this.Show_Photos ? "photo-display-show" : ""}">` +

            `<div id="photo-exit-button"></div>` +

            `<div id="photos-slider">` +

            `<div id="slide-left-button"> ${"<"} </div>` +

            (this.Show_Photos ? htmlStr : ``) +

            `<div id="slide-right-button"> ${">"}</div>` +

            `</div>`+

            `</div>`;

        this.Assign_Events();

    }
}

customElements.define('photo-display', Photo_Display);

class Text_Node extends HTMLElement {

    static get observedAttributes() {
        return ['text', 'photo_links', 'aws_s3_url'];
    }

    Show_Photos = 0;

    constructor() {

        super();

    }

    connectedCallback() {

        this.render();

        this.setAttribute("contenteditable", "false");

        let element = this.querySelector("#photo-sample");

        element.addEventListener("click", (e) => {

            let el = this.querySelector("photo-display");

            el.setAttribute("show_photos", "1");

        });

    }

    attributeChangedCallback(name, oldValue, newValue) {
        //this.render();
    }

    render() {

        let text = this.getAttribute('text') || "";
        let photo_links_str = this.getAttribute('photo_links') || "{}";
        let aws_s3_url = this.getAttribute('aws_s3_url') || "";

        let photo_links_obj = JSON.parse(photo_links_str);

        let keys = Object.keys(photo_links_obj);

        let first_photo_link = keys.length > 0 ? photo_links_obj[keys[0]].link : "";

        this.innerHTML = `<div id="text-node-wrapper">` +

                `<photo-display id="photo-display" photo_links='${photo_links_str}' show_photos=${this.Show_Photos} aws_s3_url="${aws_s3_url}"></photo-display>` +

                `<div id="photo-sample" style="background-image: url('${aws_s3_url}${first_photo_link}')"></div>` +

                `<div id="text-node">${text}</div>` +

            `</div>`;

    }
}

export default Text_Node;