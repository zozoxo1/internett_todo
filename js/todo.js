const API_URL = "http://localhost:4000/api/";

function getHoverStatusText(status) {

    if(status === "open") {
        return "Klicken um den Status auf 'In Bearbeitung' zu setzen";
    }

    if(status === "doing") {
        return "Klicken um den Status auf 'Fertig' zu setzen";
    }

    if(status === "done") {
        return "Klicken um den Eintrag zu löschen";
    }

    return "Klicken um den Status auf 'In Bearbeitung' zu setzen";

}

// TODO check params
// add param to buttons
function addTodo(title, due, status, id) {
    var todo_list = document.getElementById('tasks');
    var new_entry = document.createElement('li');
    new_entry.className = status;

    // add todo note
    var todo_text = document.createElement('p');
    todo_text.innerText = title;

    // add due time + format due time
    due_tmp = new Date(due);
    due_tmp.setTime(due_tmp.getTime() + due_tmp.getTimezoneOffset()*60*1000 );
    const due_options = { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    due_tmp = due_tmp.toLocaleDateString('de-DE', due_options);

    const due_text_svg = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clock" width="15" height="15" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><desc>Download more icon variants from https://tabler-icons.io/i/clock</desc><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><circle cx="12" cy="12" r="9"></circle><polyline points="12 7 12 12 15 15"></polyline></svg>';

    var due_text = document.createElement('p');
    due_text.className = 'due_time';
    due_text.innerHTML = due_text_svg + ' <span>' + due_tmp + "</span>";

    // add hover div
    var hover_div = document.createElement('div');
    var hover_div_text = document.createElement('p');
    hover_div_text.innerText = getHoverStatusText(status);

    var seperator = document.createElement('hr');

    hover_div.appendChild(hover_div_text);
    hover_div.setAttribute('class', 'task_action');

    hover_div.addEventListener('click', () => {
        var parent = hover_div.parentElement;

        if(parent.classList.contains("done")) {
            $.ajax({
                type: "DELETE",
                url: API_URL + "todos/" + id,
                contentType: "application/json",
                success: function(res, status) {
                    console.log("Element erfolgreich entfernt");
                    parent.remove();
                },
                error: function(res, status) {
                    console.log(res);
                }
            });
        } else if(parent.classList.contains("doing")) {
            $.ajax({
                type: "PUT",
                url: API_URL + "todos/" + id,
                contentType: "application/json",
                data: JSON.stringify({ status: "done" }),
                success: function(res) {
                    console.log(res);
                    parent.classList = ['done'];
                    hover_div_text.innerText = getHoverStatusText("done");
                },
                error: function(res, status) {
                    console.log(res);
                }
            });
        } else {
            $.ajax({
                type: "PUT",
                url: API_URL + "todos/" + id,
                contentType: "application/json",
                data: JSON.stringify({ status: "doing" }),
                success: function(res) {
                    console.log(res);
                    parent.classList = ['doing'];
                    hover_div_text.innerText = getHoverStatusText("doing");
                },
                error: function(res, status) {
                    console.log(res);
                }
            });
        }
    });

    // append childs to li
    new_entry.appendChild(hover_div);
    new_entry.appendChild(todo_text);
    new_entry.appendChild(seperator);
    new_entry.appendChild(due_text);

    // add list element to list
    todo_list.appendChild(new_entry);

}

function addEntryListener() {
    var inputField = document.getElementById('todo_form_input');
    var dateField = document.getElementById('todo_form_due_picker');

    if(inputField.value === '') {
        return;
    }

    if(dateField.value === '') {
        return;
    }

    let entry = {
        title: inputField.value,
        due: dateField.value + 'Z',
        status: 'open'
    };

    // make request to add todo entry
    $.ajax({
        type: "POST",
        url: API_URL + "todos",
        contentType: "application/json",
        data: JSON.stringify(entry),
        success: function(res) {
            console.log(res);
            addTodo(res.title, res.due, res.status, res["_id"]);
        },
        error: function(res, status) {
            console.log(res);
        }
    });

    inputField.value = '';
    dateField.value = '';

}

/**
 * Funktion zum füllen der Todo Liste.
 * Sendet ein Get request und bei erfolgt, wird die Liste gefüllt
 */
function fillTodo() {
    $.ajax({
        type: "GET",
        url: API_URL + "todos",
        contentType: "application/json",
        success: function(res) {
            var todo_list = res;

            // add todos to frontend
            for(var i = 0; i < todo_list.length; i++) {
                console.log(todo_list[i]);
                addTodo(todo_list[i].title, todo_list[i].due, todo_list[i].status, todo_list[i]["_id"]);
            }
        },
        error: function(res, status) {
            console.log(res);
        }
    });
}

function init() {
    fillTodo();

    var submitForm = document.getElementById('todo_form');
    submitForm.addEventListener('submit', addEntryListener);
}

document.addEventListener('DOMContentLoaded', init);