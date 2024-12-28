import {baseUrl} from "./baseUrl.js";

const loginData = JSON.parse(localStorage.getItem("loginData"));
if(!loginData || loginData.email !== 'admin@empher.com')
{
    alert("Admin Not Logged In.");
    window.location.href = "index.html";
}

window.onload = () =>{
    getData();
}

let form = document.getElementById("form");
form.addEventListener("submit", function(){
    event.preventDefault();
    let title = form.title.value;
    let author = form.author.value;
    let category = form.category.value;
    let bookobj = {title, author, category, isAvailable: true, borrowedDays: null, isVerified: false};
    fetch(`${baseUrl}/books`,{
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(bookobj)
    })
    .then(()=>{
        alert("Book Added Successfully!");
        form.reset();
        getData();
    })
    .catch((err)=>{
        alert("Something went wrong");
        console.log(err);
    })
});

function getData(){
    fetch(`${baseUrl}/books`)
    .then((res)=>res.json())
    .then((data)=>displayBooks(data))
    .catch((err)=>{
        alert("Something went wrong");
        console.log(err);
    })
}

function displayBooks(arr){
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

        let verifyBtn = document.createElement("button");
        verifyBtn.textContent = "Verify Book";
        if(ele.isVerified == true)
        {
            verifyBtn.classList.add("verified");
        }
        else
        {
            verifyBtn.classList.add("pending");
        }
        verifyBtn.addEventListener("click",function(){
            if(confirm("Are you sure to Verify?"))
            {
                verifyFnc(ele);
            }
        });

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete Book";
        deleteBtn.addEventListener("click",function(){
            if(confirm("Are you sure to Delete?"))
            {
                deleteFnc(ele);
            }
        })
        card.append(title, author, category, availabilityStatus, borrowedDays, verifyBtn, deleteBtn);
        cont.append(card);
    });
}

function verifyFnc(ele){
    let updatedBookObj = {...ele, isVerified: true};
    fetch(`${baseUrl}/books/${ele.id}`,{
        method: "PATCH",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(updatedBookObj)
    })
    .then(()=>{
        alert("Book Verified Successfully!");
        getData();
    })
    .catch((err)=>{
        alert("Something went wrong");
        console.log(err);
    })
}

function deleteFnc(ele){
    fetch(`${baseUrl}/books/${ele.id}`,{
        method: "DELETE",
    })
    .then(()=>{
        alert("Book Deleted Successfully!");
        getData();
    })
    .catch((err)=>{
        alert("Something went wrong");
        console.log(err);
    })
}