//Counter code
var button = document.getElementById('counter');
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
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }
        //Not done yet
        };
    //Make a reuest
    request.open('GET', 'http://vishalkrishan4542.imad.hasura-app.io/counter', true);
    request.send(null);
};
//submit name

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
                //carpture the list of names and render it in list
                var names = request.response.Text;
                name = JSON.parse(names);
                var list = '';
                for(var i=0; i<names.length;i++){
                    list += '<li>' + names[i] + '</li>';
                }
                var ul = document.getElementById('namelist');
                ul.innerHTML = list;
            }
        }
        //Not done yet
        };
    //Make a reuest
    var nameInput = document.getElementById("name");
    var name = nameInput.value;
    request.open('GET', 'http://vishalkrishan4542.imad.hasura-app.io/submit-name?name=' + name, true);
    request.send(null);
  
};
