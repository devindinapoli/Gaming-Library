$(document).ready(function() {
  $.get("/user", function(data) {
    console.log(data);
  });
});
