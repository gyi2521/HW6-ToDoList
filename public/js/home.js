function render(html) {
    $("#result").html("");
    $("#result").html(html);
}
$(function () {
    const getToDoList = () => {
        $.ajax({ url: "/api/toDo", method: "GET" })
            .then(function (data) {
                let html = "";
                data.forEach(e => html += `<li><input type='checkbox'>${e}<button>x</button></li>`);
                render(html);
            });
    };
    getToDoList();

    const theAjaxCall = () => {
        const newTask = {
            action: $('#inputTask').val().trim()
        };
        $.ajax({ url: '/api/toDo', method: 'POST', data: newTask })
            .then(function (data) {
                $('#inputTask').val('');
                getToDoList();
            });
    };
    $('#btnSubmit').on("click", theAjaxCall);


    $('.remove').on('click', function () {
        
        var $li = $(this).closest('li');        
        $.ajax(
            { 
                url: "/api/toDo" + $(this).attr('data-id'), 
                method: "DELETE",
                success: function() {
                    $li.remove();
                }
            })
    });
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

