import {baseUrl} from "./baseUrl.js";

const loginData = JSON.parse(localStorage.getItem("loginData"));
if(!loginData || loginData.email !== 'user@empher.com')
{
    alert("User Not Logged In");
    window.location.href = "index.html";
}

let availablebtn = document.getElementById("available");
availablebtn.addEventListener("click",function(){
    fetch(`${baseUrl}/books`)
    .then((res)=>res.json())
    .then((data)=>{
        const avBooks = data.filter(avb => avb.isAvailable == true);
        console.log(avBooks);
        displayAvBooks(avBooks);
    })
    .catch((err)=>{
        alert("Something went wrong");
        console.log(err);
    })
})

let borrowbtn = document.getElementById("borrow");
borrowbtn.addEventListener("click",function(){
    fetch(`${baseUrl}/books`)
    .then((res)=>res.json())
    .then((data)=>{
        const boBooks = data.filter(bob => bob.isAvailable == true);
        console.log(boBooks);
        displayReBooks(boBooks);
    })
    .catch((err)=>{
        alert("Something went wrong");
        console.log(err);
    })
})

function displayAvBooks(arr){
    let cont = document.getElementById("cont");
    cont.innerHTML = "";
    arr.map((ele,i)=>{
        let card = document.createElement("div");

        let title = document.createElement("h4");
        title.textContent = `${ele.title}`;

        let author = document.createElement("p");
        author.textContent = `Author: ${ele.author}`;

        let category = document.createElement("p");
        category.textContent = `Category: ${ele.category}`;

        let availabilityStatus = document.createElement("p");
        availabilityStatus.textContent = `Availability Status: ${ele.isAvailable?"Available":"Borrowed"}`;

        let borrowedDays = document.createElement("p");
        borrowedDays.textContent = `Borrowed Days: ${ele.borrowedDays}`;

    
            let boBtn = document.createElement("button");
            boBtn.textContent = "Borrow Book";
            boBtn.addEventListener("click",function(){
                if(confirm("Are you sure to Verify?"))
                {
                    alert("Clicked");
                }
            });
            
        card.append(title, author, category, availabilityStatus, borrowedDays, boBtn);
        cont.append(card);
    });
}

function displayReBooks(arr){
    let cont = document.getElementById("cont");
    cont.innerHTML = "";
    arr.map((ele,i)=>{
        let card = document.createElement("div");

        let title = document.createElement("h4");
        title.textContent = `${ele.title}`;

        let author = document.createElement("p");
        author.textContent = `Author: ${ele.author}`;

        let category = document.createElement("p");
        category.textContent = `Category: ${ele.category}`;

        let availabilityStatus = document.createElement("p");
        availabilityStatus.textContent = `Availability Status: ${ele.isAvailable?"Available":"Borrowed"}`;

        let borrowedDays = document.createElement("p");
        borrowedDays.textContent = `Borrowed Days: ${ele.borrowedDays}`;

            let reBtn = document.createElement("button");
            reBtn.textContent = "Review Book";
            reBtn.addEventListener("click",function(){
                if(confirm("Are you sure to Verify?"))
                {
                    alert("Clicked");
                }
            });
        card.append(title, author, category, availabilityStatus, borrowedDays, reBtn);
        cont.append(card);
    });
}