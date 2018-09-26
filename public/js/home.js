function render(html) {
    $("#result").html("");
    $("#result").html(html);
}
$(function () {
    const displayToDoList = () => {
        $.ajax({ url: "/api/toDo", method: "GET" })
            .then(function (data) {
                let html = "";
                console.log(data);
                data.forEach(e => html += `<li task-id='${e.itemId}'><input type='checkbox' class='update' ${e.done?'checked':''}>${e.task}<button class='remove'>x</button></li>`);
                render(html);
            });
    };
   

    const saveToDoList = () => {
        const newTask = {
            done: false,
            task: $('#inputTask').val().trim()
        };
        $.ajax({ url: '/api/toDo', method: 'POST', data: newTask })
            .then(function (data) {
                $('#inputTask').val('');
                $('#inputTask').focus();
                displayToDoList();
            });
    };
    $('#btnSubmit').on("click", saveToDoList);


    $(document).on('click', '.remove',function () {

        let li = $(this).closest('li');        
        $.ajax({ url: "/api/toDo/" + li.attr('task-id'), method: "DELETE"})
            .then(function(data){
                //li.remove();
                displayToDoList();
            })
    });

    $(document).on('click', '.update',function () {
        let li = $(this).closest('li');    
        const updatedTask = {
            itemId:  li.attr('task-id'),
            done: $(this).is(':checked')
        };
            
        $.ajax({ url: "/api/toDo" , method: "PUT", data: updatedTask})
            .then(function(data){
                displayToDoList();
            })
    });

    displayToDoList();
})


//from youtube
// $(function (){
//     var $tasks = $('#inputTask');
//     $.ajax({
//         type: 'GET',
//         url: '/api/toDo',
//         success: function(tasks) {
//             //console.log('success', orders)
//             $.each(tasks, function(i, task) {
//                 $tasks.append(`<li>mytask</li>`)
//             });
//         }
//     });
// });

// $('#add-order').on('click',function() {
//     var order = {
//         action: $('#inputTask').val(''),  
//     }
// })

// $.ajax({
//     type:'POST',
//     url: '/api/orders',
//     data: order,
//     success: function(newTask) {
//         $orders.append(`<li>name:  + order.name</li>`)
//     },
//     error: function() {
//         alert('error saving task');
//     }
// })

//Didn't use at all
// const runToDoQuery = function () {
//     // The AJAX function uses the URL of our API to GET the data associated with it (initially set to localhost)
//     $.ajax({ url: "/api/toDo", method: "GET" })
//       .then(function(toDoList) {
//         renderList('#displayToDo', toDoList);
//       });
//   }

