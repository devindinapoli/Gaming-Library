$(document).ready(function() {
  $.get("/user", function(data) {
    console.log(data);
    $(".header").html("<h3>" + data.name + "</h3>");
  });
});
