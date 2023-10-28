// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //

  let saveBtn = $(".saveBtn");
  saveBtn.attr("type", "button");

  saveBtn.on("click", function (event) {
    // event.preventDefault();

    let timeSlotId = $(this).parent().attr("id");
    console.log(timeSlotId); ///////////////// Test
    
    let textContent = $("#" + timeSlotId).children(".description").val();
    console.log(textContent); ///////////////// Test

    localStorage.setItem("" + timeSlotId, textContent);
  });
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //

  // Get current hour from Day.js here (variable shown on next line) and save it to a variable
  let currentHour;
  let timeSlotContainer = $("#timeSlots");
  let timeSlotList = timeSlotContainer.find("[id]").map(function () {
    return this.id;
  }).get();
  console.log(timeSlotList);  ///////////////// Test

  for (let i = 0; i < timeSlotList.length; i++) {
    // Work day planner starts at 9:00
    let timeSlotHour = i + 9;
    let timeSlot = timeSlotList[i];
    let timeSlotId = $("#" + timeSlot);

    // Change to past
    if (timeSlotHour < currentHour) {
      if (timeSlotId.hasClass("present")) {
        timeSlotId.removeClass("present");
        timeSlotId.addClass("past");
      }
      else if (timeSlotId.hasClass("future")) {
        timeSlotId.removeClass("future");
        timeSlotId.addClass("past");
      }
    }
    // Change to future
    else if (timeSlotHour > currentHour) {
      if (timeSlotId.hasClass("past")) {
        timeSlotId.removeClass("past");
        timeSlotId.addClass("future");
      }
      else if (timeSlotId.hasClass("present")) {
        timeSlotId.removeClass("present");
        timeSlotId.addClass("future");
      }
    }
    // Change to present
    else {
      if (timeSlotId.hasClass("past")) {
        timeSlotId.removeClass("past");
        timeSlotId.addClass("present");
      }
      else if (timeSlotId.hasClass("future")) {
        timeSlotId.removeClass("future");
        timeSlotId.addClass("present");
      }
    }
  }

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //



  // TODO: Add code to display the current date in the header of the page.

/*   let currentDay = $("#currentDay");
  // Get date from Day.js here and save it to a variable
  currentDay.text("variable"); */
});
