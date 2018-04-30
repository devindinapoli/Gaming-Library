$(document).ready(function() {
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
