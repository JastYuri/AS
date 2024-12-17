async function fetchSubjects() {
    console.log("Fetching subjects...");

    // Make a fetch request to the backend to get subjects based on session data
    const response = await fetch('/api/manage-subject');
    const data = await response.json();

    if (data.success) {
        console.log("Fetched subjects:", data.subjects);
        displaySubjects(data.subjects); // Display subjects
    } else {
        console.error("Error:", data.message);
    }
}

async function fetchSections() {
    console.log("Fetching sections...");

    // Make a fetch request to the backend to get sections based on session data
    const response = await fetch('/api/manage-section');
    const data = await response.json();

    if (data.success) {
        console.log("Fetched sections:", data.sections);
        displaySections(data.sections); // Display sections
    } else {
        console.error("Error:", data.message);
    }
}

// Function to handle adding a new subject
async function addSubject() {
    const inputField = document.querySelector("#newEntryInput");
    const newSubject = inputField.value.trim();
    
    if (newSubject) {
        console.log("Adding new subject:", newSubject);

        try {
            // Send POST request to add the new subject
            const response = await fetch('/api/manage-subject', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newSubject })
            });
            const data = await response.json();

            if (data.success) {
                inputField.value = ''; // Clear input field
                fetchSubjects(); // Refresh the subject list
            } else {
                console.error("Error adding subject:", data.message);
            }
        } catch (error) {
            console.error("Error adding subject:", error);
        }
    }
}

// Function to handle adding a new section
async function addSection() {
    const inputField = document.querySelector("#newEntryInput");
    const newSection = inputField.value.trim();

    if (newSection) {
        console.log("Adding new section:", newSection);

        try {
            // Send POST request to add the new section
            const response = await fetch('/api/manage-section', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newSection })
            });
            const data = await response.json();

            if (data.success) {
                inputField.value = ''; // Clear input field
                fetchSections(); // Refresh the section list
            } else {
                console.error("Error adding section:", data.message);
            }
        } catch (error) {
            console.error("Error adding section:", error);
        }
    }
}

function displaySubjects(subjects) {
    const tableBody = document.querySelector("#manageTable-manager tbody");
    tableBody.innerHTML = ''; // Clear the table

    if (subjects && subjects.length > 0) {
        subjects.forEach(subject => {
            const row = document.createElement('tr');
            const nameCell = document.createElement('td');
            nameCell.textContent = subject.subject_name;
            const actionCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', async function () {
                try {
                    // Delete the subject from the backend
                    await fetch(`/api/manage-subject/${subject.subject_id}`, { method: 'DELETE' });
                    fetchSubjects(); // Refresh the subject list
                } catch (error) {
                    console.error("Error deleting subject:", error);
                }
            });
            actionCell.appendChild(deleteButton);
            row.appendChild(nameCell);
            row.appendChild(actionCell);
            tableBody.appendChild(row);
        });
    }

    // Input row for adding new subject
    const inputRow = document.createElement('tr');
    const nameInputCell = document.createElement('td');
    const actionInputCell = document.createElement('td');
    const nameInput = document.createElement('input');
    nameInput.setAttribute('placeholder', 'Enter Subject Name');
    const addButton = document.createElement('button');
    addButton.textContent = 'Add';
    addButton.addEventListener('click', async function () {
        const newSubject = nameInput.value.trim();
        if (newSubject) {
            try {
                await fetch('/api/manage-subject', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: newSubject })
                });
                nameInput.value = ''; // Clear the input field after adding
                fetchSubjects(); // Refresh the subject list
            } catch (error) {
                console.error("Error adding subject:", error);
            }
        }
    });

    nameInputCell.appendChild(nameInput);
    actionInputCell.appendChild(addButton);
    inputRow.appendChild(nameInputCell);
    inputRow.appendChild(actionInputCell);
    tableBody.appendChild(inputRow);
}

function displaySections(sections) {
    const tableBody = document.querySelector("#manageTable-manager tbody");
    tableBody.innerHTML = ''; // Clear the table

    if (sections && sections.length > 0) {
        sections.forEach(section => {
            const row = document.createElement('tr');
            const nameCell = document.createElement('td');
            nameCell.textContent = section.section_name;
            const actionCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', async function () {
                try {
                    // Delete the section from the backend
                    await fetch(`/api/manage-section/${section.section_id}`, { method: 'DELETE' });
                    fetchSections(); // Refresh the section list
                } catch (error) {
                    console.error("Error deleting section:", error);
                }
            });
            actionCell.appendChild(deleteButton);
            row.appendChild(nameCell);
            row.appendChild(actionCell);
            tableBody.appendChild(row);
        });
    }

    // Input row for adding new section
    const inputRow = document.createElement('tr');
    const nameInputCell = document.createElement('td');
    const actionInputCell = document.createElement('td');
    const nameInput = document.createElement('input');
    nameInput.setAttribute('placeholder', 'Enter Section Name');
    const addButton = document.createElement('button');
    addButton.textContent = 'Add';
    addButton.addEventListener('click', async function () {
        const newSection = nameInput.value.trim();
        if (newSection) {
            try {
                await fetch('/api/manage-section', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: newSection })
                });
                nameInput.value = ''; // Clear the input field after adding
                fetchSections(); // Refresh the section list
            } catch (error) {
                console.error("Error adding section:", error);
            }
        }
    });

    nameInputCell.appendChild(nameInput);
    actionInputCell.appendChild(addButton);
    inputRow.appendChild(nameInputCell);
    inputRow.appendChild(actionInputCell);
    tableBody.appendChild(inputRow);
}



// Manage Subject button click handler
document.querySelector("#manageSubjectButton").addEventListener("click", function () {
    console.log("Manage Subject clicked");
    fetchSubjects();
    const manageTable = document.querySelector("#manageTable-manager");
    if (manageTable) {
        manageTable.style.display = 'table';
    } else {
        console.error("Error: manageTable-manager not found.");
    }
});

// Manage Section button click handler
document.querySelector("#manageSectionButton").addEventListener("click", function () {
    console.log("Manage Section clicked");
    fetchSections();
    const manageTable = document.querySelector("#manageTable-manager");
    if (manageTable) {
        manageTable.style.display = 'table';
    } else {
        console.error("Error: manageTable-manager not found.");
    }
});
// Function to convert 24-hour time format to 12-hour format with AM/PM
function convertTo12HourFormat(time) {
    const [hour, minute] = time.split(':');
    let period = 'AM';
    let newHour = parseInt(hour, 10);

    if (newHour >= 12) {
        period = 'PM';
        if (newHour > 12) {
            newHour -= 12;
        }
    } else if (newHour === 0) {
        newHour = 12;
    }

    return `${newHour.toString().padStart(2, '0')}:${minute} ${period}`;
}

/// When a time slot is clicked, open the modal and populate time inputs
document.querySelectorAll('.editable-time').forEach(cell => {
    cell.addEventListener('click', function() {
        const currentTime = this.innerText.trim();
        
        // Split the current time into start and end times
        const timeParts = currentTime.split(' - ');
        const startTime = timeParts[0];
        const endTime = timeParts[1];

        // Set the start and end times in the input fields (24-hour format)
        document.getElementById('startTime').value = convertTo24HourFormat(startTime); 
        document.getElementById('endTime').value = convertTo24HourFormat(endTime);

        // Show the modal
        document.getElementById('timeModal').style.display = 'block';

        // Save button functionality
        document.getElementById('saveTimeButton').onclick = () => saveTimeSlot(this);
    });
});

// Convert 12-hour time format (e.g., 01:00 PM) to 24-hour format (e.g., 13:00)
function convertTo24HourFormat(time12hr) {
    const [time, period] = time12hr.split(' ');
    let [hour, minute] = time.split(':');
    hour = parseInt(hour, 10);
    
    if (period === 'PM' && hour !== 12) {
        hour += 12;
    } else if (period === 'AM' && hour === 12) {
        hour = 0;
    }

    return `${hour.toString().padStart(2, '0')}:${minute}`;
}

function saveTimeSlot(cell) {
    const startTime24 = document.getElementById('startTime').value;
    const endTime24 = document.getElementById('endTime').value;

    // Convert both start and end times to 12-hour format
    const formattedStartTime = convertTo12HourFormat(startTime24); 
    const formattedEndTime = convertTo12HourFormat(endTime24);

    // Set the new time slot in the table (example: "09:00 AM - 10:00 AM")
    const newTimeSlot = `${formattedStartTime} - ${formattedEndTime}`;
    cell.innerText = newTimeSlot;

    // Validate that the start time is earlier than the end time
    const startTimeDate = new Date(`1970-01-01T${startTime24}:00Z`);
    const endTimeDate = new Date(`1970-01-01T${endTime24}:00Z`);

    if (startTimeDate >= endTimeDate) {
        alert('Start time must be earlier than End time.');
        return;
    }

    // Log the data being sent
    console.log('Sending request to insert new time slot:', {
        startTime: startTime24,
        endTime: endTime24
    });

    // Send the new time slot to the backend to insert it into the database
    fetch('/insert-time-slot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            startTime: startTime24,
            endTime: endTime24
        })
    })
    .then(response => {
        console.log('Response status:', response.status); // Log the response status
        return response.json(); // Parse the response as JSON
    })
    .then(data => {
        console.log('Received response data:', data); // Log the response data
        if (data.message) {
            alert(data.message); // Alert success message
        } else if (data.error) {
            alert(data.error); // Alert error message
        } else {
            alert('Error inserting time slot.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error inserting time slot.');
    });

    // Close the modal after saving
    document.getElementById('timeModal').style.display = 'none';
}
// Fetch the time slots when the page loads
document.addEventListener('DOMContentLoaded', function() {
    fetch('/get-time-slots')
        .then(response => response.json())
        .then(data => {
            // Log the fetched time slots
            console.log('Fetched time slots:', data.timeSlots);

            // Now, populate the table with the fetched data
            const scheduleBody = document.getElementById('schedule-body');
            scheduleBody.innerHTML = ''; // Clear existing data

            data.timeSlots.forEach(slot => {
                const row = document.createElement('tr');

                // Create a time slot cell
                const timeSlotCell = document.createElement('td');
                timeSlotCell.textContent = `${slot.time_start} - ${slot.time_end}`;
                row.appendChild(timeSlotCell);

                // Add other day columns (you can fill these based on the data you have)
                ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].forEach(day => {
                    const dayCell = document.createElement('td');
                    dayCell.textContent = ''; // You can fill this with the respective subject/section if you have that info
                    row.appendChild(dayCell);
                });

                // Append the row to the table body
                scheduleBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching time slots:', error);
        });
});
// Get the add row button and the table body
const addRowButton = document.getElementById('addRowButton');
const scheduleBody = document.getElementById('schedule-body');

// Get the modal and modal elements
const timeModal = document.getElementById('timeModal');
const startTimeInput = document.getElementById('startTime');
const endTimeInput = document.getElementById('endTime');
const saveTimeButton = document.getElementById('saveTimeButton');
const closeModalButton = document.getElementById('closeModalButton');

let selectedCell = null; // To store reference to the clicked cell

// Add click event to the Add Row button
addRowButton.addEventListener('click', function () {
    // Create a new row element
    const newRow = document.createElement('tr');

    // Create time slot cell (default to empty or placeholder)
    const timeSlotCell = document.createElement('td');
    timeSlotCell.classList.add('editable-time');  // Ensure this class is added
    timeSlotCell.setAttribute('data-id', 'new');
    timeSlotCell.setAttribute('data-column', 'time_slot');
    timeSlotCell.textContent = '00:00 AM - 00:00 AM'; // Placeholder text with AM/PM
    newRow.appendChild(timeSlotCell);

    // Create the remaining cells (for Monday to Saturday)
    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

    daysOfWeek.forEach(day => {
        const dayCell = document.createElement('td');
        dayCell.classList.add('editable');
        dayCell.setAttribute('data-id', 'new');
        dayCell.setAttribute('data-column', day);
        dayCell.textContent = ''; // Empty cell
        newRow.appendChild(dayCell);
    });

    // Append the new row to the table body
    scheduleBody.appendChild(newRow);
});

// Add click event for the schedule body to handle clicks on editable cells
document.getElementById('schedule-body').addEventListener('click', function (e) {
    // Check if the clicked element is a time slot cell (editable-time) and is empty
    if (e.target.classList.contains('editable-time') && e.target.textContent.trim() === '00:00 AM - 00:00 AM') {
        // Store the reference to the clicked cell
        selectedCell = e.target;
        openModal(); // Open the modal for editing
    }
});

// Open the modal
function openModal() {
    timeModal.style.display = 'block'; // Show the modal
}

// Close the modal
closeModalButton.addEventListener('click', function () {
    timeModal.style.display = 'none'; // Hide the modal
});

// Save the time slot and send the data to the server
saveTimeButton.addEventListener('click', async function () {
    if (selectedCell) {
        const startTime = startTimeInput.value;
        const endTime = endTimeInput.value;

        // Check if start time and end time are valid
        if (isValidTime(startTime) && isValidTime(endTime) && startTime < endTime) {
            // Convert times to 12-hour AM/PM format
            const formattedStartTime = convertToAMPM(startTime);
            const formattedEndTime = convertToAMPM(endTime);

            // Update the selected cell with the new time (formatted)
            selectedCell.textContent = `${formattedStartTime} - ${formattedEndTime}`;
            timeModal.style.display = 'none'; // Close the modal

            // Send the POST request to save the time slot
            try {
                const response = await fetch('/insert-time-slot', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        startTime: startTime,
                        endTime: endTime,
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    console.log('Server Response:', data);
                    alert(data.message); // Show success message
                } else {
                    console.error('Error:', data.error);
                    alert(data.error); // Show error message
                }
            } catch (error) {
                console.error('Error sending request:', error);
                alert('An error occurred while saving the time slot.');
            }
        } else {
            // Show an error message if the time is invalid
            alert("Please enter valid start and end times, and ensure the start time is earlier than the end time.");
        }
    }
});

// Helper function to check if time is valid
function isValidTime(time) {
    const timePattern = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
    return timePattern.test(time);
}

// Function to convert 24-hour time format to 12-hour AM/PM format
function convertToAMPM(time) {
    const [hours, minutes] = time.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12; // Convert hour to 12-hour format
    return `${hour12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}
// Open the modal when a timeslot is clicked
document.querySelectorAll('.time-slot').forEach(cell => {
    cell.addEventListener('click', function() {
        const day = this.dataset.day; // or use a more reliable way to identify the time slot
        const timeSlot = this.dataset.timeslot;

        // Fetch available subjects and sections for the selected time slot
        fetch(`/api/getSubjectsAndSections?day=${day}&timeslot=${timeSlot}`)
            .then(response => response.json())
            .then(data => {
                // Populate subject and section dropdowns
                const subjectSelect = document.getElementById('subjectSelect');
                const sectionSelect = document.getElementById('sectionSelect');

                // Clear previous options
                subjectSelect.innerHTML = '';
                sectionSelect.innerHTML = '';

                // Add new options
                data.subjects.forEach(subject => {
                    const option = document.createElement('option');
                    option.value = subject.id;
                    option.textContent = subject.name;
                    subjectSelect.appendChild(option);
                });

                data.sections.forEach(section => {
                    const option = document.createElement('option');
                    option.value = section.id;
                    option.textContent = section.name;
                    sectionSelect.appendChild(option);
                });

                // Show the modal
                const modal = document.getElementById('subjectSectionModal');
                modal.style.display = "block";

                // Save the selection when the user clicks "Save"
                document.getElementById('saveSelectionButton').onclick = function() {
                    const selectedSubjectId = subjectSelect.value;
                    const selectedSectionId = sectionSelect.value;

                    // Save the selected values to the backend or update the cell directly
                    saveSchedule(day, timeSlot, selectedSubjectId, selectedSectionId);

                    // Close the modal
                    modal.style.display = "none";
                };
            })
            .catch(error => console.error('Error fetching subjects and sections:', error));
    });
});

// Function to save the selected subject and section
function saveSchedule(day, timeSlot, subjectId, sectionId) {
    fetch('/api/saveSchedule', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            day,
            timeSlot,
            subjectId,
            sectionId
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Update the schedule table or any other logic after saving
            console.log('Schedule updated successfully!');
        } else {
            console.error('Error saving schedule');
        }
    });
}
// Close the modal if clicked outside the modal content
window.onclick = function(event) {
    const modal = document.getElementById('subjectSectionModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
