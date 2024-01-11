const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.querySelector(".event-date"),
  eventsContainer = document.querySelector(".events"),

  popup = document.getElementById("popup"),
  popupEventTitle = document.getElementById("popup-event-title"),
  popupEventTime = document.getElementById("popup-event-time"),
  popupEventRole = document.getElementById("popup-event-role"),
  popupEventNotes = document.getElementById("popup-event-notes"),
  popupEventRoom = document.getElementById("popup-event-room"),
  closePopupButton = document.getElementById("close-popup"),
  confirmationPopup = document.getElementById("confirmation-popup"),

  confirmDeleteButton = document.getElementById("confirm-delete"),
  cancelDeleteButton = document.getElementById("cancel-delete"),
  modifyButton = document.getElementById("modify-event"),
  deleteButton = document.getElementById("delete-event"),
  modifyEventForm = document.getElementById("modify-event-form"),
  newTitleInput = document.getElementById("new-title"),
  newTimeInput = document.getElementById("new-time"),
  newRoleInput = document.getElementById("new-role"),
  newNotesInput = document.getElementById("new-notes"),
  newRoomInput = document.getElementById("new-room"),
  cancelButton = document.getElementById('cancel-modify'),

  addEventBtn = document.querySelector(".add-event"),
  addEventWrapper = document.querySelector(".add-event-wrapper "),
  addEventCloseBtn = document.querySelector(".close "),
  addEventTitle = document.querySelector(".event-name "),
  addEventRole = document.querySelector(".add-role"),
  addEventNotes = document.querySelector(".event-notes"),
  addEventRoom = document.querySelector(".event-room"),
  addEventSubmit = document.querySelector(".add-event-btn ");

  const mainButton = document.getElementById('mainButton');
  const subButtons = document.getElementById('subButtons');
  const caret = document.querySelector('.caret');
  const roomOptionsPopup = document.getElementById('roomOptionsPopup');
  const addRoomPopup = document.getElementById('addRoomPopup');
  const deleteRoomButton = document.getElementById('deleteRoom');

  const containerCalendar = document.querySelector('.rectangle-1');
  const containerSearch = document.querySelector('.rectangle-2');
  const containerView = document.querySelector('.rectangle-3');
  const searchBookingsButton = document.querySelector('.search-bookings');
  const homepageButton = document.querySelector('.homepage-button');
  

//--------------------------------------------------------Search Button------------------------------------



homepageButton.addEventListener('click', function() {
  containerCalendar.style.display = 'block';  
  containerSearch.style.display = 'none';  
  containerView.style.display = 'none';
  rectangle4.style.display = 'none'
});

searchBookingsButton.addEventListener('click', function() {
  containerCalendar.style.display = 'none';
  containerView.style.display = 'none';
  rectangle4.style.display = 'none';
  containerSearch.style.display = 'block';
});
document.getElementById('clearSearchButton').addEventListener('click', function() {
  // Clear input and select fields
  document.getElementById('searchByName').value = '';
  document.getElementById('searchByMonth').selectedIndex = 0;
  document.getElementById('searchByDay').selectedIndex = 0;
  document.getElementById('searchByYear').selectedIndex = 0;
  document.getElementById('searchByRoom').selectedIndex = 0;
  
  // Clear search results
  const resultsContainer = document.getElementById('searchResults');
  resultsContainer.innerHTML = '';
});

// Event listener for the search button
document.getElementById('searchButton').addEventListener('click', function() {
  // Retrieve values from search fields
  const nameSearch = document.getElementById('searchByName').value.trim().toLowerCase();
  const roomSearch = document.getElementById('searchByRoom').value;
  const monthSearch = document.getElementById('searchByMonth').value;
  const daySearch = document.getElementById('searchByDay').value;
  const yearSearch = document.getElementById('searchByYear').value;
  
  // Filter events based on search criteria
  const filteredEvents = eventsArr.flatMap(event =>
    event.events.filter(booking => {
      const matchName = nameSearch ? booking.title.toLowerCase().includes(nameSearch) : true;
      const matchRoom = roomSearch ? booking.room === roomSearch : true;
      const matchDate = (monthSearch && daySearch && yearSearch) ? 
        (event.month === parseInt(monthSearch) && event.day === parseInt(daySearch) && event.year === parseInt(yearSearch)) : true;
      return matchName && matchRoom && matchDate;
    })
  );

  // Show the search results container and display the results
  const searchResultsContainer = document.getElementById('searchResults');
  searchResultsContainer.innerHTML = ''; 
  if (filteredEvents.length > 0) {
    filteredEvents.forEach(booking => {
      const bookingElement = document.createElement('div');
      bookingElement.className = 'booking-detail';
      bookingElement.innerHTML = `
        <h3>${booking.title}</h3>
        <p>Date: ${event.month}/${event.day}/${event.year}</p>
        <p>Time: ${booking.time}</p>
        <p>Room: ${booking.room}</p>
        <p>Notes: ${booking.notes}</p>
      `;
      searchResultsContainer.appendChild(bookingElement);
    });
  } else {
    searchResultsContainer.innerHTML = '<p>No matching bookings found.</p>';
  }
 
});

function populateYearDropdown() {
  const currentYear = new Date().getFullYear();
  const yearSelect = document.getElementById('searchByYear');
  for (let i = currentYear; i > currentYear - 100; i--) {
    let option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    yearSelect.appendChild(option);
  }
}

// Function to populate the month dropdown
function populateMonthDropdown() {
  const monthSelect = document.getElementById('searchByMonth');
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  months.forEach((month, index) => {
    let option = document.createElement('option');
    option.value = index + 1; // Assuming your event.month is 1-indexed (1 for January, 2 for February, etc.)
    option.textContent = month;
    monthSelect.appendChild(option);
  });
}

// Function to populate the day dropdown
function populateDayDropdown() {
  const daySelect = document.getElementById('searchByDay');
  for (let i = 1; i <= 31; i++) { // Simple version, does not account for different number of days in each month
    let option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    daySelect.appendChild(option);
  }
}

  populateYearDropdown();
  populateMonthDropdown();
  populateDayDropdown();

  // -------------------------------------------------------------------------Side Menu Bar ------------------------------------------------------------------

  // Function to close the popups
  function closePopups() {
    document.querySelectorAll('.room-popup').forEach(function(popup) {
      popup.classList.add('hidden');
    });
  }

  // Event listeners for close buttons
  document.querySelectorAll('.close-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      closePopups();
      document.getElementById('deleteRoom').style.display = 'block';
      document.getElementById('checkBookings').style.display = 'block';
      document.getElementById('modifyRoom').style.display = 'block';
      document.getElementById('modifiedRoomName').style.display = 'none';
      document.getElementById('saveModifiedRoomName').style.display = 'none';
    });
  });

  mainButton.addEventListener('click', function() {
    subButtons.classList.toggle('hidden');
    caret.classList.toggle('caret-rotate');
  });


  let selectedRoomButton;

  document.querySelectorAll('.roomnum').forEach(function(button) {
    button.addEventListener('click', function() {
      selectedRoomButton = this; 
      roomOptionsPopup.classList.remove('hidden');
      
    });
  });

  deleteRoomButton.addEventListener('click', function() {
    if (selectedRoomButton) {
      selectedRoomButton.remove();
      closePopups();
    }
  });

 
  const addRoomButton = document.querySelector('.add-room-button');
  
  addRoomButton.addEventListener('click', function() {
    addRoomPopup.classList.remove('hidden');
  });


  function updateRoomDropdown() {
    // Clear existing options
    const eventRoomSelect = document.querySelector('.event-room');
    const searchRoomSelect = document.getElementById('searchByRoom');
    const newRoomSelect = document.getElementById('new-room'); // Added new room select
  
    eventRoomSelect.innerHTML = '<option value="" disabled>Select a Room</option>';
    searchRoomSelect.innerHTML = '<option value="" disabled selected>Select a Room</option>';
    newRoomSelect.innerHTML = '<option value="" disabled selected>Select a Room</option>'; // Reset new room select
  
    // Load rooms from localStorage and update the dropdowns
    let rooms = JSON.parse(localStorage.getItem('rooms')) || [];
    rooms.forEach(room => {
      // Create option for event room dropdown
      let eventRoomOption = document.createElement('option');
      eventRoomOption.value = eventRoomOption.textContent = room;
      eventRoomSelect.appendChild(eventRoomOption);
  
      // Create option for search room dropdown
      let searchRoomOption = document.createElement('option');
      searchRoomOption.value = searchRoomOption.textContent = room;
      searchRoomSelect.appendChild(searchRoomOption);
  
      // Create option for new room dropdown
      let newRoomOption = document.createElement('option');
      newRoomOption.value = newRoomOption.textContent = room;
      newRoomSelect.appendChild(newRoomOption); // Add option to new room select
    });
  }
  

  function addRoom(roomNumber) {
    // Create a new room button
    const newRoomButton = document.createElement('button');
    newRoomButton.textContent = roomNumber;
    newRoomButton.className = 'roomnum';
    newRoomButton.addEventListener('click', function() {
      selectedRoomButton = this;
      roomOptionsPopup.classList.remove('hidden');
    });
    subButtons.insertBefore(newRoomButton, addRoomButton);
    saveRoomToLocalStorage(roomNumber);
    updateRoomDropdown();
  }

  function deleteRoom(roomNumber) {
    deleteRoomFromLocalStorage(roomNumber);
    document.querySelectorAll('.roomnum').forEach(button => {
      if (button.textContent === roomNumber) {
        button.remove();
      }
    });
    updateRoomDropdown();
  }

  document.getElementById('addRoomForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const roomNumber = document.getElementById('roomNumber').value;
    addRoom(roomNumber);
    addRoomPopup.classList.add('hidden');
    document.getElementById('roomNumber').value = '';
    });

    deleteRoomButton.addEventListener('click', function() {
      if (selectedRoomButton) {
        deleteRoom(selectedRoomButton.textContent);
        closePopups();
      }
  });

document.getElementById('modifiedRoomName').style.display = 'none';
document.getElementById('saveModifiedRoomName').style.display = 'none';

  document.getElementById('modifyRoom').addEventListener('click', function() {
    // Show the input field for modifying the room name
    document.getElementById('deleteRoom').style.display = 'none';
    document.getElementById('checkBookings').style.display = 'none';
  
    // Show the input field and save button
    const modifiedRoomNameInput = document.getElementById('modifiedRoomName');
    modifiedRoomNameInput.style.display = 'block';
    modifiedRoomNameInput.value = selectedRoomButton.textContent;
    document.getElementById('saveModifiedRoomName').style.display = 'block';
  
    // Hide the Modify button itself
    this.style.display = 'none';
  });

  function modifyRoomName(oldRoomName, newRoomName) {
    let rooms = JSON.parse(localStorage.getItem('rooms')) || [];
    rooms = rooms.map(room => room === oldRoomName ? newRoomName : room);
    localStorage.setItem('rooms', JSON.stringify(rooms));
  }
  
  document.getElementById('saveModifiedRoomName').addEventListener('click', function() {
    const modifiedRoomNameInput = document.getElementById('modifiedRoomName');
    const newRoomName = modifiedRoomNameInput.value;
  
    if (selectedRoomButton && newRoomName) {
      const oldRoomName = selectedRoomButton.textContent;
      selectedRoomButton.textContent = newRoomName;
  
      modifyRoomName(oldRoomName, newRoomName);
      updateRoomDropdown();
  
      modifiedRoomNameInput.style.display = 'none';
      document.getElementById('deleteRoom').style.display = 'block';
      document.getElementById('checkBookings').style.display = 'block';
      document.getElementById('modifyRoom').style.display = 'block';
      document.getElementById('modifiedRoomName').style.display = 'none';
      this.style.display = 'none';
    }
  });
  

  function saveRoomToLocalStorage(roomNumber) {
    let rooms = JSON.parse(localStorage.getItem('rooms')) || [];
    rooms.push(roomNumber);
    localStorage.setItem('rooms', JSON.stringify(rooms));
  }
  function deleteRoomFromLocalStorage(roomNumber) {
    let rooms = JSON.parse(localStorage.getItem('rooms')) || [];
    rooms = rooms.filter(function(room) {
      return room !== roomNumber;
    });
    localStorage.setItem('rooms', JSON.stringify(rooms));
  }

  function loadRoomsFromLocalStorage() {
    let rooms = JSON.parse(localStorage.getItem('rooms')) || [];
    rooms.forEach(function(roomNumber) {
      // Create a button for each room and add it to the menu
      const roomButton = document.createElement('button');
      roomButton.textContent = roomNumber;
      roomButton.className = 'roomnum';
      roomButton.addEventListener('click', function() {
        selectedRoomButton = this;
        roomOptionsPopup.classList.remove('hidden');
      });
      subButtons.insertBefore(roomButton, addRoomButton); 
    });
  }
  loadRoomsFromLocalStorage();
  updateRoomDropdown();

  


  // ------------------------------------------------ Calender starts here -----------------------------------------------------------

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];



const eventsArr = [];
getEvents();
console.log(eventsArr);

//function to add days in days with class day and prev-date next-date on previous month and next month days and active on today
function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = months[month] + " " + year;

  let days = "";

  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    //check if event is present on that day
    let event = false;
    eventsArr.forEach((eventObj) => {
      if (
        eventObj.day === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        event = true;
      }
    });
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      activeDay = i;
      getActiveDay(i);
      updateEvents(i);
      if (event) {
        days += `<div class="day today active event">${i}</div>`;
      } else {
        days += `<div class="day today active">${i}</div>`;
      }
    } else {
      if (event) {
        days += `<div class="day event">${i}</div>`;
      } else {
        days += `<div class="day ">${i}</div>`;
      }
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }
  daysContainer.innerHTML = days;
  addListner();
  populateTimeDropdowns();
}
function populateTimeDropdowns() {
  const hourDropdowns = document.querySelectorAll('.event-time-from-hour, .event-time-to-hour');
  const minuteDropdowns = document.querySelectorAll('.event-time-from-minute, .event-time-to-minute');

  for (let i = 1; i <= 12; i++) {
    let hourOption = document.createElement('option');
    hourOption.value = i;
    hourOption.textContent = i;
    hourDropdowns.forEach(dropdown => dropdown.appendChild(hourOption.cloneNode(true)));
  }

  for (let i = 0; i < 60; i += 5) { // Increment by 5 minutes
    let minuteOption = document.createElement('option');
    minuteOption.value = i;
    minuteOption.textContent = i < 10 ? '0' + i : i;
    minuteDropdowns.forEach(dropdown => dropdown.appendChild(minuteOption.cloneNode(true)));
  }
}
function populateTimeDropdownsModify() {
  const hourDropdownsModify = document.querySelectorAll('#new-time-from-hour, #new-time-to-hour');
  const minuteDropdownsModify = document.querySelectorAll('#new-time-from-minute, #new-time-to-minute');

  for (let i = 1; i <= 12; i++) {
    let hourOption = document.createElement('option');
    hourOption.value = i;
    hourOption.textContent = i;
    hourDropdownsModify.forEach(dropdown => dropdown.appendChild(hourOption.cloneNode(true)));
  }

  for (let i = 0; i < 60; i += 5) { // Increment by 5 minutes
    let minuteOption = document.createElement('option');
    minuteOption.value = i;
    minuteOption.textContent = i < 10 ? '0' + i : i;
    minuteDropdownsModify.forEach(dropdown => dropdown.appendChild(minuteOption.cloneNode(true)));
  }
}

//function to add month and year on prev and next button
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);


initCalendar();

//function to add active on day
function addListner() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      getActiveDay(e.target.innerHTML);
      updateEvents(Number(e.target.innerHTML));
      activeDay = Number(e.target.innerHTML);
      //remove active
      days.forEach((day) => {
        day.classList.remove("active");
      });
      //if clicked prev-date or next-date switch to that month
      if (e.target.classList.contains("prev-date")) {
        prevMonth();
        //add active to clicked day afte month is change
        setTimeout(() => {
          //add active where no prev-date or next-date
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("prev-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else if (e.target.classList.contains("next-date")) {
        nextMonth();
        //add active to clicked day afte month is changed
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("next-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else {
        e.target.classList.add("active");
      }
    });
  });
}

todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

dateInput.addEventListener("input", (e) => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
  if (e.inputType === "deleteContentBackward") {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
  console.log("here");
  const dateArr = dateInput.value.split("/");
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  alert("Invalid Date");
}

//function get active day day name and date and update eventday eventdate
function getActiveDay(date) {
  const day = new Date(year, month, date);
  const dayName = day.toString().split(" ")[0];
  eventDay.innerHTML = dayName;
  eventDate.innerHTML = date + " " + months[month] + " " + year;
}

//function update events when a day is active
function updateEvents(date) {
  let events = "";
  eventsArr.forEach((event) => {
    if (
      date === event.day &&
      month + 1 === event.month &&
      year === event.year
    ) {
      event.events.forEach((event) => {
        let colorClass = event.role === "Student" ? "student-color" : "faculty-color";
        events += `<div class="event">
            <div class="title">
              <i class="fas fa-circle ${colorClass}"></i>
              <h3 class="event-title">${event.title}</h3>
            </div>
            <div class="event-time">
              <span class="event-time">${event.time}</span>
            </div>
            <div class="event-role">
              <span class="event-role">${event.role}</span>
            </div>
            <div class="event-notes">
              <span class="event-notes">${event.notes}</span>
            </div>
            <div class="event-room">
              <span class="event-room">${event.room}</span>
            </div>
        </div>`;
      });
    }
  });
  if (events === "") {
    events = `<div class="no-event">
            <h3>No Bookings</h3>
        </div>`;
  }
  eventsContainer.innerHTML = events;
  saveEvents();
}

//function to add event
addEventBtn.addEventListener("click", () => {
  addEventWrapper.classList.toggle("active");
});

addEventCloseBtn.addEventListener("click", () => {
  addEventWrapper.classList.remove("active");
});

document.addEventListener("click", (e) => {
  if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
    addEventWrapper.classList.remove("active");
  }
});

//allow 50 chars in eventtitle
addEventTitle.addEventListener("input", (e) => {
  addEventTitle.value = addEventTitle.value.slice(0, 60);
});

function timeStringToMinutes(timeStr) {
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':');
  hours = parseInt(hours);
  minutes = parseInt(minutes);

  if (modifier === 'PM' && hours < 12) {
    hours += 12;
  } else if (modifier === 'AM' && hours === 12) {
    hours = 0;
  }

  return hours * 60 + minutes;
}

// Revised overlap check function
function isTimeOverlap(start1, end1, start2, end2) {
  return (start1 < end2) && (start2 < end1);
}

//function to add event to eventsArr
addEventSubmit.addEventListener("click", () => {
  const eventTitle = addEventTitle.value;
  const eventTimeFrom = getTimeFromDropdowns("from");
  const eventTimeTo = getTimeFromDropdowns("to");
  const eventNotes = addEventNotes.value;
  const eventRole = document.querySelector('input[name="role"]:checked').value;
  const eventRoom = addEventRoom.value;
  if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "" || eventNotes === "" ||  eventRoom === "") {
    alert("Please fill all the fields");
    return;
  }

  let eventExist = false;
  eventsArr.forEach((event) => {
    if (event.day === activeDay && event.month === month + 1 && event.year === year) {
      event.events.forEach((existingEvent) => {
        const [existingTimeFrom, existingTimeTo] = existingEvent.time.split(" - ").map(timeStringToMinutes);
        const currentEventStart = timeStringToMinutes(eventTimeFrom);
        const currentEventEnd = timeStringToMinutes(eventTimeTo);

        if (existingEvent.room === eventRoom && isTimeOverlap(existingTimeFrom, existingTimeTo, currentEventStart, currentEventEnd)) {
          eventExist = true;
        }
      });
    }
  });
  if (eventExist) {
    alert("An event in this room at this time already exists");
    return;
  }

  
  const newEvent = {
    title: eventTitle,
    time: `${eventTimeFrom} - ${eventTimeTo}`,
    role: eventRole,
    notes: eventNotes,
    room: eventRoom,
  };
    addEventToArr(newEvent);
    updateEvents(activeDay);
    resetAddEventForm();

  //select active day and add event class if not added
  const activeDayEl = document.querySelector(".day.active");
  if (!activeDayEl.classList.contains("event")) {
    activeDayEl.classList.add("event");
  } 
});

function getTimeFromDropdowns(suffix) {
  const hour = document.querySelector(`.event-time-${suffix}-hour`).value;
  const minute = document.querySelector(`.event-time-${suffix}-minute`).value;
  const ampm = document.querySelector(`.event-time-${suffix}-ampm`).value;
  return `${hour}:${minute} ${ampm}`;
}

function checkEventExistence(eventTitle) {
  return eventsArr.some(event => 
    event.day === activeDay &&
    event.month === month + 1 &&
    event.year === year &&
    event.events.some(e => e.title === eventTitle)
  );
}

function addEventToArr(newEvent) {
  let eventDay = eventsArr.find(event =>
    event.day === activeDay &&
    event.month === month + 1 &&
    event.year === year
  );

  if (eventDay) {
    eventDay.events.push(newEvent);
  } else {
    eventsArr.push({
      day: activeDay,
      month: month + 1,
      year: year,
      events: [newEvent],
    });
  }
}

function resetAddEventForm() {
  addEventWrapper.classList.remove("active");
  addEventTitle.value = "";
  document.querySelectorAll('.event-time-from-hour, .event-time-to-hour').forEach(el => el.value = '');
  document.querySelectorAll('.event-time-from-minute, .event-time-to-minute').forEach(el => el.value = '');
  document.querySelectorAll('.event-time-from-ampm, .event-time-to-ampm').forEach(el => el.value = '');
}


//function to show pop-up
eventsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("event")) {
   
    const eventElement = e.target;
    console.log(eventElement)
    const eventTitle = eventElement.querySelector(".event-title").textContent;
    const eventTime = eventElement.querySelector(".event-time").textContent;
    const eventRole = eventElement.querySelector(".event-role").textContent;
    const eventNotes = eventElement.querySelector(".event-notes").textContent;
    const eventRoom = eventElement.querySelector(".event-room").textContent;

  //  Populate the popup with event details
    popupEventTitle.textContent = eventTitle;
    popupEventTime.textContent = eventTime;
    popupEventRole.textContent = eventRole;
    popupEventNotes.textContent = eventNotes;
    popupEventRoom.textContent = eventRoom;

    // Display the popup
    popup.style.display = "block";
  }
});

closePopupButton.addEventListener("click", () => {
  // Close the popup by hiding it
  popup.style.display = "none";
});

modifyButton.addEventListener("click", () => {
  populateTimeDropdownsModify();
  updateRoomDropdown(); 
  const eventTitle = popupEventTitle.textContent;
  const [eventTimeFrom, eventTimeTo] = popupEventTime.textContent.split(' - ');
  const eventRole = popupEventRole.textContent.trim(); 
  const roleRadioButton = document.querySelector(`input[name="new-role"][value="${eventRole}"]`);
  const eventNotes = popupEventNotes.textContent;
  const eventRoom = popupEventRoom.textContent;

  if (roleRadioButton) {
    roleRadioButton.checked = true;
  }

  // Update the form fields with existing event details
  newTitleInput.value = eventTitle;
  document.getElementById('new-time-from-hour').value = eventTimeFrom.split(':')[0];
  document.getElementById('new-time-from-minute').value = eventTimeFrom.split(':')[1].split(' ')[0];
  document.getElementById('new-time-from-ampm').value = eventTimeFrom.split(' ')[1];
  document.getElementById('new-time-to-hour').value = eventTimeTo.split(':')[0];
  document.getElementById('new-time-to-minute').value = eventTimeTo.split(':')[1].split(' ')[0];
  document.getElementById('new-time-to-ampm').value = eventTimeTo.split(' ')[1];
  document.querySelector(`input[name="new-role"][value="${eventRole}"]`).checked = true;
  newNotesInput.value = eventNotes;
  document.getElementById('new-room').value = eventRoom;

  // Show the modification form and hide the event details
  modifyEventForm.style.display = "block";
  document.querySelectorAll(".popup-content p").forEach((p) => {
    p.style.display = "none";
  });
});



modifyEventForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get the new values from the form
  const newTitle = newTitleInput.value;
  const newTimeFrom = `${document.getElementById('new-time-from-hour').value}:${document.getElementById('new-time-from-minute').value} ${document.getElementById('new-time-from-ampm').value}`;
  const newTimeTo = `${document.getElementById('new-time-to-hour').value}:${document.getElementById('new-time-to-minute').value} ${document.getElementById('new-time-to-ampm').value}`;
  const newTime = `${newTimeFrom} - ${newTimeTo}`;
  const newRole = document.querySelector('input[name="new-role"]:checked').value;
  const newNotes = newNotesInput.value;
  const newRoom = document.getElementById('new-room').value;

  let eventUpdated = false;
  for (let eventDay of eventsArr) {
    if (eventDay.day === activeDay && eventDay.month === month + 1 && eventDay.year === year) {
      for (let event of eventDay.events) {
        if (event.title === popupEventTitle.textContent) {
          event.title = newTitle;
          event.time = `${newTimeFrom} - ${newTimeTo}`;
          event.role = newRole;
          event.notes = newNotes;
          event.room = newRoom;
          eventUpdated = true;
          break;
        }
      }
      if (eventUpdated) {
        break;
      }
    }
  }

  // Save the updated events to localStorage
  saveEvents();

  // Update the display to reflect the changes
  if (eventUpdated) {
    updateEvents(activeDay);
  } else {
    console.error('Failed to find and update the event.');
  }


  // Update the event details in the popup
  popupEventTitle.textContent = newTitle;
  popupEventTime.textContent = newTime;
  popupEventRole.textContent = newRole;
  popupEventNotes.textContent = newNotes;
  popupEventRoom.textContent = newRoom;

  // Close the modification form and show the updated event details
  modifyEventForm.style.display = "none";
  document.querySelectorAll(".popup-content p").forEach((p) => {
    p.style.display = "block";
  });

  // Update the event in your data structure (eventsArr) with the new values
  
  eventsArr.forEach((event) => {
    if (
      event.day === activeDay &&
      event.month === month + 1 &&
      event.year === year
    ) {
      event.events.forEach((item) => {
        if (item.title === addEventTitle) {
          item.title = newTitle;
          item.time = newTime;
          item.role = newRole;
          item.notes = newNotes;
          item.room = newRoom;
        }
      });
    }
  });

  const eventElement = document.getElementById(`event-${addEventTitle.replace(/\s+/g, '-')}`);
  if (eventElement) {
    eventElement.querySelector(".event-title").textContent = newTitle;
  }
});

cancelButton.addEventListener("click", () => {
  // Hide the modification form
  modifyEventForm.style.display = "none";
  document.querySelectorAll(".popup-content p, .popup-content h2").forEach((element) => {
    element.style.display = "block";
});
const buttonContainer = document.querySelector('.popup-buttons');
  buttonContainer.style.display = 'flex'; // This line is critical
  buttonContainer.style.justifyContent = 'center';
});

deleteButton.addEventListener("click", () => {

  confirmationPopup.style.display = "block";
});

confirmDeleteButton.addEventListener("click", () => {
  // Close the confirmation popup
  confirmationPopup.style.display = "none";
    const eventTitle = popupEventTitle.textContent; // Get the event title from the popup
    eventsArr.forEach((event) => {
      if (
        event.day === activeDay &&
        event.month === month + 1 &&
        event.year === year
      ) {
        event.events.forEach((item, index) => {
          if (item.title === eventTitle) {
            event.events.splice(index, 1);
          }
        });
        // If no events left in a day, then remove that day from eventsArr
        if (event.events.length === 0) {
          eventsArr.splice(eventsArr.indexOf(event), 1);
          // Remove the "event" class from the active day
          const activeDayEl = document.querySelector(".day.active");
          if (activeDayEl.classList.contains("event")) {
            activeDayEl.classList.remove("event");
          }
        }
      }
    });
    // Close the popup after deleting the event
    popup.style.display = "none";
    updateEvents(activeDay);

});

cancelDeleteButton.addEventListener("click", () => {
  // Close the confirmation popup if "Cancel" is clicked
  confirmationPopup.style.display = "none";
});


//function to save events in local storage
function saveEvents() {
  localStorage.setItem("events", JSON.stringify(eventsArr));
}

//function to get events from local storage
function getEvents() {
  //check if events are already saved in local storage then return event else nothing
  if (localStorage.getItem("events") === null) {
    return;
  }
  eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}


document.querySelector('.view-bookings').addEventListener('click', function() {
  // Hide other containers
  containerCalendar.style.display = 'none';
  containerSearch.style.display = 'none';
  rectangle4.style.display = 'none'
  containerView.style.display = 'block';

  // Show the bookings container
  const bookingsContainer = document.querySelector('.rectangle-3');
  bookingsContainer.classList.remove('hidden');

  // Populate the bookings container
  displayAllBookings(bookingsContainer);
});

function displayAllBookings(container) {
  container.innerHTML = ''; // Clear previous content

  // Loop through all events and display them
  eventsArr.forEach(event => {
    event.events.forEach(booking => {
      const bookingElement = document.createElement('div');
      bookingElement.className = 'booking-detail';
      bookingElement.innerHTML = `
        <h3>${booking.title}</h3>
        <p>Date: ${event.month}/${event.day}/${event.year}</p>
        <p>Time: ${booking.time}</p>
        <p>Room: ${booking.room}</p>
        <p>Notes: ${booking.notes}</p>
      `;
      container.appendChild(bookingElement);
    });
  });

  if (eventsArr.length === 0) {
    container.innerHTML = '<p>No bookings available.</p>';
  }
  if (bookingsContainer) {
    bookingsContainer.classList.remove('hidden');
    displayAllBookings(bookingsContainer); 
}
}

const rectangle4 = document.querySelector('.rectangle-4');

document.getElementById('checkBookings').addEventListener('click', function() {
  // Assuming selectedRoomButton holds the selected room's identifier
  const roomNumber = selectedRoomButton.textContent;
  displayRoomBookings(roomNumber, rectangle4);
  closePopups();
});

function displayRoomBookings(roomNumber, container) {
  // Hide other containers
  containerCalendar.style.display = 'none';
  containerSearch.style.display = 'none';
  containerView.style.display = 'none';
  rectangle4.style.display = 'block'
  container.classList.remove('hidden');

  // Clear previous content
  container.innerHTML = `<h2>Bookings for Room ${roomNumber}</h2>`;

  // Filter events for the specific room and append them to the container
  eventsArr.forEach(event => {
    event.events.forEach(booking => {
      if(booking.room === roomNumber) {
        const bookingElement = document.createElement('div');
        bookingElement.className = 'booking-detail';
        bookingElement.innerHTML = `
          <h3>${booking.title}</h3>
          <p>Date: ${event.month}/${event.day}/${event.year}</p>
          <p>Time: ${booking.time}</p>
          <p>Room: ${booking.room}</p>
          <p>Notes: ${booking.notes}</p>
        `;
        container.appendChild(bookingElement);
      }
    });
  });

  // If there are no bookings for the room, display a message
  if(container.innerHTML === `<h2>Bookings for Room ${roomNumber}</h2>`) {
    container.innerHTML += '<p style="color: #606060; font-size: 16px; font-style: italic; margin-top: 350px; text-align: center;">No bookings for this room.</p>';
  }
}
