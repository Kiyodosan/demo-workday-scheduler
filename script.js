// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () { ///////////////// Might need to change to $(document).ready(function () {}) to the beginning of this function
  let saveBtn = $(".saveBtn");
  saveBtn.attr("type", "button");

  // When the save button is clicked, text input is saved in local storage.
  saveBtn.on("click", function () {
    let timeSlotId = $(this).parent().attr("id");
    // console.log(timeSlotId); ///////////////// Test
    
    let textContent = $("#" + timeSlotId).children(".description").val();
    // console.log(textContent); ///////////////// Test

    localStorage.setItem("" + timeSlotId, JSON.stringify(textContent));
  });

  // Save dayjs to a variable and use it to change time slot color based on current time.
  // https://www.youtube.com/watch?v=50cDIUKlQ8g
  const dayJsObj = dayjs();
  // console.log(dayJsObj.format("MMMM DD"));  ///////////////// Test

  let currentHour = dayJsObj.format("H");
  let timeSlotContainer = $("#timeSlots");
  // Put every time slot into an array
  let timeSlotList = timeSlotContainer.find("[id]").map(function () {
    return this.id;
  }).get();
  // console.log(timeSlotList);  ///////////////// Test

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

  // Get all local storage IDs and values to place the value in each time slot based on the matching ID.
  let keyIdList = [];
  for (let i = 0; i < localStorage.length; i++) {
    keyIdList.push(localStorage.key(i));
  }
  // console.log(keyIdList); ///////////////// Test

  let keyValueList = getAllStorage();
  keyValueList.reverse();
  // console.log(keyValueList); ///////////////// Test

  for (let i = 0; i < keyIdList.length; i++) {
    if (timeSlotList.includes(keyIdList[i])) {
      $("#" + keyIdList[i]).children(".description").val(keyValueList[i]);
    }
  }

  // Get all values from local storage and put them in an array.
  // https://stackoverflow.com/questions/17745292/how-to-retrieve-all-localstorage-items-without-knowing-the-keys-in-advance
  function getAllStorage() {
    let values = [];
    let keys = Object.keys(localStorage);
    let i = keys.length;
  
    while (i--) {
      values.push(JSON.parse(localStorage.getItem(keys[i])));
    }
  
    return values;
  }

  // Show current day of the week in the header using dayjs.
  let dayId = $("#currentDay");
  let currentDay = dayJsObj.format("dddd, MMMM D");
  dayId.text(currentDay);
});
