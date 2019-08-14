

function counter() {
  $("#textarea").on("keyup", function(event) {
    let counter = 140 - $(this).val().length;
    $("#counter").text(counter);

    if (counter < 0) {
      $("#counter").css("color", "red");
    } else {
      $("#counter").css("color", "#545149");
    }
  });
}




$(document).ready(function() {
  counter();
});