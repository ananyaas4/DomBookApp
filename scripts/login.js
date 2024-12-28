let form = document.getElementById("form");
form.addEventListener("submit", function(){
    event.preventDefault();
    let email = form.email.value;
    let password = form.password.value;
    if(email=="admin@empher.com" && password=="empher@123")
    {
        alert("Logged in as Admin.");
        window.location.href = "admin.html";
    }
    else if(email=="user@empher.com" && password=="user@123")
    {
        alert("Logged in as User.");
        window.location.href = "books.html";
    }
    else{
        alert("Invalid Email or Password");
    }
});