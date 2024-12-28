let form = document.getElementById("form");
form.addEventListener("submit", function(){
    event.preventDefault();
    let email = form.email.value;
    let password = form.password.value;
    let userobj = {email,password};
    if(email=="admin@empher.com" && password=="empher@123")
    {
        alert("Logged in as Admin.");
        window.location.href = "admin.html";
        localStorage.setItem("loginData",JSON.stringify(userobj));
    }
    else if(email=="user@empher.com" && password=="user@123")
    {
        alert("Logged in as User.");
        window.location.href = "books.html";
        localStorage.setItem("loginData",JSON.stringify(userobj));
    }
    else{
        alert("Invalid Email or Password");
    }
});