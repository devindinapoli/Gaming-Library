$(document).ready(function() {
  $('.ui.rating').rating({
    initialRating: 3,
    maxRating: 5
  });
  $("#modal1").click(function() {
    $(".modal1").modal("show");
  });
  $(".modal").modal({
    closable: true
  });

  $.get("/search?title=barbie", function(data) {
    console.log(data);
  });
});

$("#search").on("click", function(event) {
  event.preventDefault();
  var title = $("#gameSearch")
    .val()
    .trim();
  $.get("/search?title=" + title, function(data) {
    console.log(title);
    console.log(data);
  }).done(function (data) {
    var results = data[i].name;
  $("#gamedivs").empty();
    for (var i = 0; i < data.length; i++) {
      var gameDiv = $("<div class='card'>");
      $gameCard.append(
        "h3 class='gameHeadline'>" +
        "<span class='label label-primary'>" + articleCount +
        "</span>" + 
        "<strong> " + data[i].name + "</strong></h3>" + 
        "<span>" + data[i].summary + "</span>"
      );

      var gameSummary = data[i].summary
    }});
    
});
