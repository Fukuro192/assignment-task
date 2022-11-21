function registerOrLogin(action, errorKey){
    let user = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
    }
    console.log(JSON.stringify(user));
    fetch(
        '/auth/'+action+'/',
        {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "X-CSRFToken": document.getElementsByName('csrfmiddlewaretoken')[0].value,
                'Content-Type': 'application/json'
            }
        }
    )
    .then(response => {
        let oldAlert = document.getElementById('alert');
        if(oldAlert) oldAlert.remove();
        let alert = document.createElement('div');
        alert.id = "alert";
        alert.setAttribute('role', 'alert');
        if(response.status == 200){
            alert.className = "alert alert-success";
            response.json().then(result => {
                alert.textContent = "your token is: " + result.token;
            });
        }else{
            alert.className = "alert alert-danger";
            response.json().then(result => {
                alert.textContent = "Error: " + result[errorKey];
            });
        }
        let content = document.getElementById('content');
        content.insertBefore(alert, content.firstChild);
    });
}