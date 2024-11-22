function login()
{
    const form_login = document.getElementById("form-login");
    form_login.addEventListener("submit", (event) => {
        event.preventDefault();
        let user = {
            Username: form_login.username.value,
            Password:form_login.password.value
        };
        const get_user = JSON.parse(localStorage.getItem(form_login.username.value))
        if (get_user)
        {
            if (get_user.Username === user.Username && get_user.Password === user.Password)
            {
                alert("Login Successful!");
                window.location.href = "../index.html"
            } 
            else 
            {
                alert("invalid Email or Password");
            }
        } 
        else
        {
            alert("invalid Email or Password");
        }
    });
}

function register()
{
    const form_register = document.getElementById("form-register");
    form_register.addEventListener("submit", (event) => {
        event.preventDefault();
        let newUser = {
            Username: form_register.username.value,
            Email: form_register.email.value,
            Password:form_register.password.value
        };
        const get_user = JSON.parse(localStorage.getItem(form_register.username.value))
        if (get_user)
        {
            if (get_user.Username === newUser.Username)
            {
                alert("Username already existed!");
            } 
        }
        else 
        {
            localStorage.setItem(form_register.username.value, JSON.stringify(newUser))
            alert("Register Successful!");
            window.location.href = "../html/login.html"
        }
    });
}
const body = document.getElementById("form-login");
if (body)
{
    login();
}
else
{
    register();
}