//submit username/password to login
var submit = document.getElementById("submit_btn");
submit.onclick = function(){
  //make a request to server and send the name
  //Create a request
        var request = new XMLHttpRequest();
        
        //capture the response and store it in a variable
        request.onreadystatechange = function(){
        if(request.readystate === XMLHttpRequest.DONE){
            //take some action
            if(request.status === 200){
                console.log('user logged in successfully');
            }
            else if(request.status === 403){
                alert('username/password are incorrect');
            }
            else if(request.status === 500){
                alert('something went wrong in the server');
            }
        }
        //Not done yet
        };
    //Make a reuest
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    console.log(username);
    console.log(password);
    request.open('POST', 'http://vishalkrishan4542.imad.hasura-app.io/login', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username: username, password: password}));
  
};
