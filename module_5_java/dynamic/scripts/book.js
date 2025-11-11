books = [{id:"B0001",name:"The great gatsby",pd:'2022-06-15',country:"USA",price:15.99},
         {id:"B0002",name:"To Kill a Mockingbird",pd:'2022-07-05',country:"USA",price:12.50},
         {id:"B0003",name:"Pride and Prejudice",pd:'2022-06-30',country:"England",price:10.99},
         {id:"B0004",name:"1984",pd:'2020-08-20',country:"UK",price:14.75},
         {id:"B0005",name:"The Catcher in the Rye",pd:"2023-07-20",country:"USA",price:13.25}];

document.getElementById("bookForm").addEventListener("submit", function(e) {
        e.preventDefault(); // stops the page reload
        console.log("Form submitted without refresh!");
    });

function loadPage() { // called when page is loaded
    globalThis.mode = "create"; //initialize global mode variable (used later in createUpdateBook function)
    setTimeout(renderBooksTable, 100);  //calls renderBooksTable after 100 milliseconds
}

function renderBooksTable() { //renders the books table
    let tbody = document.getElementById("booksTable").tBodies[0]; //get the tbody element of the books table
    tbody.innerHTML = "";  //clear existing table body content
    let i = 0; //counter for book index
    for (let book of books) { //iterate over each book in the books array
        i += 1; //increment book index
        const row = tbody.insertRow(-1); //insert a new row at the end of the table body
        for (key in book) { //iterate over each key in the book object
            const temp = row.insertCell(-1); //insert a new cell at the end of the current row
            temp.textContent = book[key]; //set the cell's text content to the value of the current key
        }
        temp = row.insertCell(-1); //insert a new cell for action links (manual creates 2 links)
        temp.innerHTML = `<a onclick="updateBook(${i})" href="#">Update</a> | <a onclick="deleteBook(${i}) "href="#">Delete</a>`; //adds 2 links and calls respective functions

    }
}
function createUpdateBook(){ //creates or updatas based on mode (defualt is create)
    if (mode == "create"){
        Bid = document.getElementById("Bid").value; //get values from form
        Bname = document.getElementById("Bname").value;
        Bpd = document.getElementById("Bpd").value;
        Bcountry = document.getElementById("Bcountry").value;
        Bprice = document.getElementById("Bprice").value;

        for (i = 0; i < books.length; i++){ //checks if book with same id already exists
            console.log(books[i].id);
            if(books[i].id == Bid){
                break  //if found, loop is exited (position is stored in i)
            }
        }
        if (i == books.length){ //if not found adds it to book array
            const book = {id:Bid,name:Bname,pd:Bpd,country:Bcountry,price:Bprice};
            books.push(book);
            renderBooksTable(); //re-renders the table
        } else { //if found, switches to update mode
            alert("Mode: Update");
            mode = "update";
            return updateBook(books[i]); //gets books data and fills the form
            return false;
        }
        return false;
    } else if (mode == "update"){ //in update mode, saves the changes made to the book
        Bname = document.getElementById("Bname").value;
        Bpd = document.getElementById("Bpd").value;
        Bcountry = document.getElementById("Bcountry").value;
        Bprice = document.getElementById("Bprice").value;
        
        for (i = 0; i < books.length; i++){ //finds position of updated book
            console.log(books[i].id);
            if(books[i].id == Bid){
                break
            }
        }
        books[i] = {id:Bid,name:Bname,pd:Bpd,country:Bcountry,price:Bprice}; //saves book in array
        renderBooksTable(); //re-renders the table
        mode = "create"; //goes back to defualt
        return false; //always return false to prevent form submission (page reloads when submitted causes all changes to be lost)
    }
    return false; //just in case
    
}

function updateBook(index){ 
    alert("Mode: Update , Please change required values and recreate");
    book = books[index - 1];
    document.getElementById("Bid").value = book.id;
    document.getElementById("Bname").value = book.name;
    document.getElementById("Bpd").value = book.pd;
    document.getElementById("Bcountry").value = book.country;
    document.getElementById("Bprice").value = book.price;
    return false;   
}
function deleteBook(position){ //deletes book at given position
    books.splice(position - 1,1);
    renderBooksTable();
}
