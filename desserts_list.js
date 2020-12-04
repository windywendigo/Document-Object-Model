// VARIABLES
let button_add = document.querySelector(".button_add");
let input = document.querySelector(".input_text");
let list = document.querySelector(".list");
let button_erase = document.querySelector(".button_erase");
let list_array;



// LISTENERS
button_add.addEventListener("click", add_dessert);
button_erase.addEventListener("click", erase_everything);
window.addEventListener("keypress", add_enter);
list.addEventListener("click", cross_dessert);
list.addEventListener("click", erase_dessert);
list.addEventListener("contextmenu", replace_dessert);
window.addEventListener("DOMContentLoaded", print_local_storage);




// FUNCTIONS
    // Add
function add_enter(e) {
    if (e.key == "Enter") {
        add_dessert();
    }
}

function add_dessert() {    
    let list_items = document.createElement("li");
    list_items.classList.add("list_items", "animated", "zoomIn");
    list_items.innerHTML = `<i class="fas fa-times"></i><span class="item_text">${input.value}</span>`;
    save_local_storage();
    list.appendChild(list_items);
    input.value = "";
}



    // Line through
function cross_dessert(e) {

    if (e.target.classList.contains("item_text")) {
        list_array = JSON.parse(localStorage.getItem("keyword"));
        e.target.classList.toggle("line_through");
        }

        for (i = 0; i < list_array.length; i++) {

            if (e.target.textContent == list_array[i].text && e.target.classList.contains("line_through")) {
                list_array[i].line_through = true;

            } else if (e.target.textContent == list_array[i].text) {
                list_array[i].line_through = false;
            }
        }
        
        localStorage.setItem("keyword", JSON.stringify(list_array));
}



    // Replace
function replace_dessert(e) {
    e.preventDefault();
    let new_text = prompt(`You want to replace ${e.target.textContent.toLowerCase()} with...`);

        

    if ((new_text != null || new_text != "") && e.target.classList.contains("item_text")) {
        let list_items = document.querySelectorAll("li");
        list_items = Array.from(list_items);
        list_array = JSON.parse(localStorage.getItem("keyword"));

        for (i = 0; i < list_array.length; i++) {

            if (e.target.textContent == list_array[i].text) {
                list_array[i].text = new_text;
                localStorage.setItem("keyword", JSON.stringify(list_array));
            }
        }

        e.target.textContent = new_text;
    }
}



    // Erase
function erase_dessert(e) {
    let list_items = document.querySelectorAll("li");
    list_items = Array.from(list_items);

    if (e.target.classList.contains("fas")) {
        erase_local_storage(e);
        e.target.parentElement.classList.remove("zoomIn");
        e.target.parentElement.classList.add("zoomOut");

        e.target.parentElement.addEventListener("animationend", () => {
            e.target.parentElement.remove();
        });
    }
}


    // Erase everything
function erase_everything() {
    if (list_array != null || list_array != undefined) {
        let list_items = document.querySelectorAll("li");
        list_items = Array.from(list_items);
        list_array = JSON.parse(localStorage.getItem("keyword"));
        
        for (i = 0; i < list_items.length; i++) {
            list_array.splice(0, 1);
            list_items[i].remove();
        }
        
        localStorage.setItem("keyword", JSON.stringify(list_array));
    }
}



    // Print from Local Storage
function print_local_storage() {
    if (JSON.parse(localStorage.getItem("keyword")) == null) {
        list_array = [];
        localStorage.setItem("keyword", JSON.stringify(list_array));

    } else {
        list_array = JSON.parse(localStorage.getItem("keyword"));

        for (i = 0; i < list_array.length; i++) {

            if (list_array[i].line_through) {
            let list_items = document.createElement("li");
            list_items.classList.add("list_items", "animated", "zoomIn");
            list_items.innerHTML = `<i class="fas fa-times"></i><span class="item_text line_through">${list_array[i].text}</span>`;
            input.value = "";
            list.appendChild(list_items);

            } else {
                let list_items = document.createElement("li");
                list_items.classList.add("list_items", "animated", "zoomIn");
                list_items.innerHTML = `<i class="fas fa-times"></i><span class="item_text">${list_array[i].text}</span>`;
                input.value = "";
                list.appendChild(list_items);
            }
        }
    }
}



    // Save in Local Storage
function save_local_storage() {
    class Item_Array {
        constructor(text, line_through) {
            this.text = text;
            this.line_through = line_through;
        }
    }

    list_array = JSON.parse(localStorage.getItem("keyword"));
    list_array.push(new Item_Array(input.value, false));
    localStorage.setItem("keyword", JSON.stringify(list_array));
}




    // Erase from Local Storage
function erase_local_storage(e) {
    let list_items = document.querySelectorAll("li");
    list_items = Array.from(list_items);
    list_array = JSON.parse(localStorage.getItem("keyword"));
    
    for (i = 0; i < list_array.length; i++) {
        if (list_array[i].text == e.target.parentElement.textContent) {
            list_array.splice(i, 1);
        }
    }

    localStorage.setItem("keyword", JSON.stringify(list_array));
}