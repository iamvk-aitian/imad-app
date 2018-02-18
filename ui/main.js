//Counter code
var button = document.getElementById("counter");
var counter = 0;

button.onclick = function(){
        //Create a request
        var request = new XMLHttpRequest();
        
        //capture the response and store it in a variable
        request.onreadystatechange = function(){
        if(request.readystate === XMLHttpRequest.DONE){
            //take some action
            if(request.status === 200){
                var counter = request.responseText;
                var span = document.getElementById("count");
                span.innerHTML = counter.toString();
            }
        }
        //Not done yet
        };
    //Make a reuest
    request.open('GET', 'http://vishalkrishan4542.imad.hasura-app.io/counter', true);
    request.send(null)
};
