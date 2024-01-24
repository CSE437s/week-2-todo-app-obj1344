function main(){
    getAllTodos();
    $("#addTodo").submit(function(event) { 
        event.preventDefault();
        createNewTask(); });
}


function displayTodos(todoArray){
    todoArray.forEach(element => {
        var  elementTodo = new Todo(element);
        render(elementTodo, false);
    });
    var deletes = $(".deleteBtn");
    for(var i =0; i<deletes.length; ++i){
        var del = deletes[i];
        del.addEventListener('click', deleteClicked);
    }

    var boxes = $(".checkBox");
    for(var j = 0; j < boxes.length; ++j){
        var box = boxes[j];
        box.addEventListener('change', checkBoxChanged);
    }

};

function displayTodo(response){
    var elementTodo = new Todo(response);
    render(elementTodo, true);
    var deletes = $(".deleteBtn");
    for(var i =0; i<deletes.length; ++i){
        var del = deletes[i];
        del.addEventListener('click', deleteClicked);
    }

    var boxes = $(".checkBox");
    for(var j = 0; j < boxes.length; ++j){
        var box = boxes[j];
        box.addEventListener('change', checkBoxChanged);
    }

}



function render(elementTodo, isNew){
    var elementHtml = elementTodo.toHtml();
    if(isNew){
        $("#todoListContainer").prepend(elementHtml);
    }
    else{
        $("#todoListContainer").append(elementHtml);
    }
    
}



function deleteClicked(){
    var elementId =this.id;
    var id = stripId(this.id);
    $("#"+elementId ).parent().remove();
    deleteTodo(id);
}



function stripId(elementId){
    return elementId.substring(0, elementId.length-3);
}



function checkBoxChanged(){
    console.log("HI");
    var id = stripId(this.id);
    var text = $("#"+id+"txt").text();
    if(this.checked){
        $("#"+id+"txt").css("textDecoration", "line-through");
        $("#"+id+"con").css("backgroundColor", "#999999");
        
    }
    else{
        $("#"+id+"txt").css("textDecoration", "none");
        $("#"+id+"con").css("backgroundColor", "#1a3c40");
    }
    updateTodo(id, text, this.checked);

}



function createNewTask(){
    var input = $("#taskField");
    var taskText = input.val();
    if(taskText == ""){
        alert("Invalid Input");
        return;
    }
    addTodo(taskText);
    input.val("");
}



main();