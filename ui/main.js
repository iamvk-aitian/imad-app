//Counter code
var button = document.getElementById('counter');
var counter = 0;
var span = document.getElementById('count');
button.onclick = function ()  {
        //make a request to the counter endpoint
        
        //capture the response and store it in a variable
        
        //render the variable in the correct span
        counter = counter + 1;
        
        span.innerHTML = counter.toString();
};
