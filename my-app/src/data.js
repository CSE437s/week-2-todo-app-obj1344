


function getAllTodos(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status ==200){
            var response = JSON.parse(this.responseText);
            displayTodos(response);
        }else if (this.readyState == 4) {
            console.log(this.responseText);
        }
    };
    xhttp.open("GET", "http://localhost:3000/?", true);
    xhttp.setRequestHeader("x-api-key", apiKey);
    xhttp.send();
}


function getTodo(id){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status ==200){
            var response = JSON.parse(this.responseText);
            console.log(response);
            return response;
        }else if (this.readyState == 4) {
            console.log(this.responseText);
        }
    };
    xhttp.open("GET", "http://localhost:3000/?"+id, true);
    xhttp.setRequestHeader("x-api-key", apiKey);
    xhttp.send();
}


function addTodo(text){
    var data = { text: text };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var response = JSON.parse(this.responseText);
            console.log(response);
            displayTodo(response);
            return response;
        }else if (this.readyState == 4) {
            console.log(this.responseText);
        }
    }
    xhttp.open("POST", "http://localhost:3000/?, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("x-api-key", apiKey);
    xhttp.send(JSON.stringify(data))
}


function updateTodo(id, text, completed){
    var data = { text: text, completed: completed };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState ==4 && this.status == 200){
            var response = JSON.parse(this.responseText);
            console.log(response);
            return response;
        }
        else if(this.readyState ==4){
            console.log(this.responseText);
        }
    }
    xhttp.open("PUT", "http://localhost:3000/?"+id, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("x-api-key", apiKey);
    xhttp.send(JSON.stringify(data));
}


function deleteTodo(id){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log("Deleted Successfully")
        }else if(this.status == 404){
            console.log("No such todo");
        }
    }
    xhttp.open("DELETE", "http://localhost:3000/?" +id, true);
    xhttp.setRequestHeader("x-api-key", apiKey);
    xhttp.send();
}



class Todo {
    constructor(res){
        this.id = res.id;
        this.text = res.text;
        this.user = res.user;
        this.completed = res.completed;
        this.created_at = res.created_at;
        this.updated_at = res.updated_at;
        this.index=null;
    }
    //Extra Credit 
    update(){
        var response = updateTodo(this.id, this.text, this.completed);
    }
    delete(){
        deleteTodo(this.id);
    }
    toHtml(){
        var container = $("<div class='item-container' id='"+this.id+"con'></div>");
        var deleteBtn = $("<div class='deleteBtn' id='"+this.id+"btn' >Delete</div>");
        var completed = $("<input type='checkbox' name='checkbox' class='checkBox' id='"+this.id+"box' />");
        var task = $("<h2 class='item' id='"+this.id+"txt'></h2>").text(this.text);
        if(this.completed){
            task.css("textDecoration", "line-through");
            container.css("backgroundColor", "#999999");
            completed.prop("checked",true);
        }
        container.append(completed);
        container.append(task);
        container.append(deleteBtn);
        return container;
    }
}


