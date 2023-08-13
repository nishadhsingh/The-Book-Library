let myLibrary = [];
let libsize = 0;
let container = document.querySelector(".container");


function Book(author, title, pages, isRead) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = isRead;
}
Book.prototype.toggleRead = function () { this.read = !this.read; }

let form = document.getElementById("form")



//add event listenr to to add book



//wire event listner to pass data to here
function addBookToLibrary(author, title, pages, isRead) {
    // do stuff here
    libsize = myLibrary.push(new Book(author, title, pages, isRead));
    // call drawlib
    drawLib();
}

addBookToLibrary('name','author',23,true);



function addToContanier(div)
{

    container.appendChild(div);
}

function redraw() {
    container.innerHTML = "";
}


//called when lib updated redradws container
function drawLib()
{
    redraw();
    myLibrary.forEach((Book,index) => {
        addToContanier(createCard(Book,index));
    });
}

// pass book and create prepopulated element
//TODO: add button to togglebook read with event listener 
function createCard(book, index) {
    let div = document.createElement("div");
    div.classList.add("card");
    let ptitle = document.createElement("p");
    ptitle.classList.add("bookTitle");
    ptitle.innerHTML="Title :" + book.title;


    let pbook = document.createElement("p");
    pbook.classList.add("bookString");
    pbook.innerText="Written By: " + book.author + "  Pages: " + book.pages;

    let pread = document.createElement("p");
    pread.classList.add("isRead"+index);
    if(book.read == true)
    {
        pread.innerText = "Read Already";
    }
    else
    {
        pread.innerText = "Not Yet Read";
    }
    


    let tbtn = document.createElement("button");
    tbtn.classList.add("toggle");
    tbtn.setAttribute("data-key", index);
    tbtn.innerHTML="toggleRead";
    tbtn.addEventListener("click",toggleRead,event);


    let dbtn = document.createElement("button");
    dbtn.classList.add("Deltoggle");
    dbtn.setAttribute("data-key", index);
    dbtn.innerHTML="delete";
    dbtn.addEventListener("click",deleteEntry,event);


    div.appendChild(ptitle);
    div.appendChild(pbook);
    div.appendChild(pread);
    div.appendChild(tbtn);
    div.appendChild(dbtn);
    return div;
}
form.addEventListener("submit",e=>{
    let frm = e.target;
    let formData = new FormData(frm);
    console.log(formData);

    let read = formData.get("read");
    let isread = false; 
    if(read != null)
    {
        isread = true;
    }
    addBookToLibrary(formData.get("name"),formData.get("author"),formData.get("page"),isread);
    e.preventDefault();
})


function toggleRead(event) { 
    let val = event.target;
    let index = val.getAttribute("data-key");
    let bok = myLibrary.at(index);
     bok.toggleRead();
    // myLibrary.splice(index,1);
    // myLibrary.push(bok)
    //drawLib();
    redraw();
    drawLib();
    console.log(myLibrary);
}
function deleteEntry(event) {
    let val = event.target;
    let index = val.getAttribute("data-key");
    let bok = myLibrary.at(index);
    if(index >=-1)
    {
        myLibrary.splice(index,1)
    }
    drawLib()
    console.log(index);
 }

