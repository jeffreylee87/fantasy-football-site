$(document).ready(function () {
    //saves the article and puts it in the saved area
$(".save-btn").click(function(event) {
    event.preventDefault();
    const button = $(this);
    const id = button.attr("id");
    $.ajax(`/save/${id}`, {
        type: "PUT"
    }).then(function() {
        console.log("Article Saved");
        const alert = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
        Your article has been saved!!!! 
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>`
        button.parent().append(alert);
    });
});

//removes the article from the saved area
$(".delete-btn").click(function(event) {
    event.preventDefault();
    const button = $(this);
    const id = button.attr("data");
    $.ajax(`/remove/${id}`, {
        type: "PUT"
    }).then(function() {
        console.log("Article Removed");
    });
    //ask if there is a more efficient way
    location.reload();
});

//scrapes articles, need to update this
$(".scraper").click(function(event) {
    event.preventDefault();
    $.ajax(`/scrape`, {
        type: "GET"
    }).then(function() {
        console.log("scraped got yo articles")
        location.reload();
        
        
    });
});

});



//posts the data to the database on the click, then closes modal
$("#save-note").click(function (event) {
    event.preventDefault();
    const id = $(this).attr('data');
    const noteText = $('#note-input').val().trim();
    $('#note-input').val('');
    $.ajax(`/articles/${id}`, {
        type: "POST",
        data: { 
            body: noteText
        }
    }).then(function (data) {
        console.log("note has posted");
        // console.log(data)
        // $('.articles-available').append($(`<li class='list-group-item'>${data.note.body}<button type='button' class='btn btn-danger btn-sm float-right btn-deletenote' data='${data._id}'>X</button></li>`));
    })
    $('#note-modal').modal('toggle');
});

//opens the note button with the id and populate note info if exists

$(".note-btn").click(function (event) {
    event.preventDefault();
    const id = $(this).attr("data");
    $('#article-id').text(id);
    $('#save-note').attr('data', id);
    $.ajax(`/articles/${id}`, {
        type: "GET"
    }).then(function (data) {
        console.log(data);
        $('.articles-available').empty();
        if (data.hasOwnProperty("note")){
            // for (let i in data.note) {
            //     console.log(data.note)
                $('.articles-available').append($(`<li class='list-group-item'>${data.note.body}<button type='button' class='btn btn-danger btn-sm float-right deleteNote' data='${data.note._id}'><i class="fas fa-poo"></i></button></li>`));
            //   }
            // data.note.forEach(i => {
            //     $('.articles-available').append($(`<li class='list-group-item'>${i.body}<button type='button' class='btn btn-danger btn-sm float-right btn-deletenote' data='${i._id}'>X</button></li>`));
            // })
        }
        else {
            $('.articles-available').append($(`<li class='list-group-item'>No notes for this article yet</li>`));  
        }
    })
    $('#note-modal').modal('toggle');
});

//deletes the note 
$(document).on('click', '.deleteNote', function (){
    event.preventDefault();
    console.log($(this).attr("data"))
    const id = $(this).attr("data");
    console.log(id);
    $.ajax(`/note/${id}`, {
        type: "DELETE"
    }).then(function () {
        $('#note-modal').modal('toggle');
    });
});