$(init);

function init() {
  $("#myDay").text(moment().format("dddd, MMMM Do"));

  pastPresentFuture();
  setInterval(pastPresentFuture, 60000);

  $(".time-block").each(function() {
    let blockId = $(this).attr("id");
    $("#" + blockId + " textarea").text(localStorage.getItem(moment().format("DDDYYYY") + blockId));
  });

  $(".saveBtn").on("click", handleSave);
}

function pastPresentFuture() {
  $(".time-block").each(function() {
    let setHour = parseInt($(this).attr("id").replace("hour-", ""));
    let currentHour = parseInt(moment().format("H"));
    $(this).removeClass("past present future");
    if (setHour < currentHour) {
      $(this).addClass("past");
    } else if (setHour > currentHour) {
      $(this).addClass("future");
    } else {
      $(this).addClass("present");
    }
  });
}

function handleSave(event) {
  let hourPlan = $(this).parent().attr("id");
  localStorage.setItem(moment().format("DDDYYYY") + hourPlan, $("#" + hourPlan + " textarea").val());
}