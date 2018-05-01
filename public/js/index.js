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
  });
});
