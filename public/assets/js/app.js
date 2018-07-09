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

$(".scraper").click(function(event) {
    event.preventDefault();
    $.ajax(`/scrape`, {
        type: "GET"
    }).then(function() {
        console.log("scraped got yo articles")
        
        
    });
});

});