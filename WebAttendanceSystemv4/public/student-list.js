/// Function to load sections based on selected subject
function loadSections() {
    const subject = document.getElementById('subject-select').value;

    // Now fiscalYear is directly accessible from the script block injected above
    console.log('Fiscal Year in JS:', fiscalYear);  // Check if the fiscal year is correctly passed here

    if (subject) {
        fetch(`/sections?subject=${subject}&fiscalYear=${fiscalYear}`)
            .then(response => response.json())
            .then(data => {
                console.log('Sections Data:', data);  // Log the response to inspect the structure

                if (data.error) {
                    console.error('Error:', data.error);  // Log the error from the backend
                    return;
                }

                const sectionSelect = document.getElementById('section-select');
                sectionSelect.innerHTML = '<option value="">Select Section</option>'; // Clear current options

                data.forEach(section => {
                    const option = document.createElement('option');
                    option.value = section.section_name;
                    option.textContent = section.section_name;
                    sectionSelect.appendChild(option);
                });

                sectionSelect.disabled = false; // Enable section dropdown
            })
            .catch(error => {
                console.error('Error loading sections:', error);
            });
    }
}

// Function to load students based on selected subject and section
function loadStudents() {
    const subject = document.getElementById('subject-select').value;
    const section = document.getElementById('section-select').value;

    if (subject && section) {
        fetch(`/students?subject=${subject}&section=${section}&fiscalYear=${fiscalYear}`)
            .then(response => response.json())
            .then(data => {
                console.log('Students Data:', data);  // Log the response to inspect the structure

                if (data.error) {
                    console.error('Error:', data.error);  // Log the error from the backend
                    return;
                }

                const studentTable = document.getElementById('student-list-table');
                studentTable.innerHTML = ''; // Clear current table rows

                // Create table headers if not already created
                if (studentTable.rows.length === 0) {
                    const headerRow = studentTable.insertRow();
                    const headers = ['Student Number', 'Name', 'Log In', 'Log Out', 'Barcode']; // Adjust headers as needed
                    headers.forEach(header => {
                        const th = document.createElement('th');
                        th.textContent = header;
                        headerRow.appendChild(th);
                    });
                }

                // Populate table with student data
                data.forEach(student => {
                    const row = studentTable.insertRow();
                    const studentData = [student.student_number, student.name, student.time_in, student.time_out, student.barcode];
                    studentData.forEach(data => {
                        const cell = row.insertCell();
                        cell.textContent = data;
                    });
                });
            })
            .catch(error => {
                console.error('Error loading students:', error);
            });
    }
}

// Event listeners for subject and section dropdowns
document.getElementById('subject-select').addEventListener('change', loadSections);
document.getElementById('section-select').addEventListener('change', loadStudents);


// This function filters the student list based on the search input
function searchStudent() {
    const searchQuery = document.getElementById('search-bar').value.toLowerCase();  // Get search query
    const rows = document.querySelectorAll('#student-list-body tr');  // Get all rows in the student table

    rows.forEach(row => {
        const studentNumber = row.cells[0].innerText.toLowerCase();  // Get student number
        const studentName = row.cells[1].innerText.toLowerCase();  // Get student name
        const barcode = row.cells[5].innerText.toLowerCase();  // Get barcode

        // If the student number, name, or barcode includes the search query, display the row
        if (studentNumber.includes(searchQuery) || studentName.includes(searchQuery) || barcode.includes(searchQuery)) {
            row.style.display = '';  // Show row
        } else {
            row.style.display = 'none';  // Hide row
        }
    });
}


