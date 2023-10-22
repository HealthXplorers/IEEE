const medicalDetailsForm = document.getElementById('medical-details-form');
const confirmationMessage = document.getElementById('confirmation-message');
const medicalDetailsTable = document.getElementById('medical-details-table');
const tableBody = document.getElementById('table-body');
const addMedicineButton = document.getElementById('add-medicine');

let medicineCounter = 1;

medicalDetailsForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Gather user input
    const date = document.getElementById('date').value;
    const doctorName = document.getElementById('doctorName').value;
    const doctorID = document.getElementById('doctorID').value;
    const reason = document.getElementById('reason').value;

    // Gather medicines and dosages
    const medicines = document.getElementsByName('medicines[]');
    const dosages = document.getElementsByName('dosages[]');
    const medicineData = [];

    for (let i = 0; i < medicines.length; i++) {
        const medicine = medicines[i].value;
        const dosage = dosages[i].value;

        if (medicine.trim() !== '' && dosage.trim() !== '') {
            medicineData.push({ medicine, dosage });
        }
    }

    // Add a new row to the table
    insertDataToTable(date, doctorName, doctorID, medicineData, reason);

    // Clear the form
    medicalDetailsForm.reset();

    // Display a confirmation message
    confirmationMessage.innerHTML = 'Details added to the table.';
});

function insertDataToTable(date, doctorName, doctorID, medicines, reason) {
    const newRow = tableBody.insertRow(0);
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);
    const cell6 = newRow.insertCell(5);

    cell1.innerHTML = date;
    cell2.innerHTML = doctorName;
    cell3.innerHTML = doctorID;

    // Format medicines and dosages as a list in the table cell
    const medicineDosageList = [];
    for (const { medicine, dosage } of medicines) {
        medicineDosageList.push(`${medicine} (${dosage})`);
    }
    cell4.innerHTML = medicineDosageList.join('<br>');

    cell5.innerHTML = reason;
    cell6.innerHTML = '<button onclick="editRow(this)">Edit</button>';
}

addMedicineButton.addEventListener('click', function () {
    medicineCounter++;

    const medicinesContainer = document.getElementById('medicines-container');

    const medicineEntry = document.createElement('div');
    medicineEntry.classList.add('medicine-entry');

    medicineEntry.innerHTML = `
        <label for="medicine${medicineCounter}">Medicine ${medicineCounter}:</label>
        <input type="text" id="medicine${medicineCounter}" name="medicines[]">

        <label for="dosage${medicineCounter}">Dosage:</label>
        <input type="text" id="dosage${medicineCounter}" name="dosages[]"><br><br>
    `;

    medicinesContainer.appendChild(medicineEntry);
});

function editRow(button) {
    const row = button.parentNode.parentNode;
    const cells = row.getElementsByTagName('td');

    // Extract data from the table cells
    const date = cells[0].innerHTML;
    const doctorName = cells[1].innerHTML;
    const doctorID = cells[2].innerHTML;
    const medicinesAndDosages = cells[3].innerHTML;
    const reason = cells[4].innerHTML;

    // Populate the form with the data for editing
    document.getElementById('date').value = date;
    document.getElementById('doctorName').value = doctorName;
    document.getElementById('doctorID').value = doctorID;

    // Split the medicines and dosages and populate the dynamic fields
    const medicineDosagePairs = medicinesAndDosages.split('<br>');
    const medicines = [];
    const dosages = [];

    for (const pair of medicineDosagePairs) {
        const [medicine, dosage] = pair.split(' (');
        medicines.push(medicine);
        dosages.push(dosage.substring(0, dosage.length - 1));
    }

    for (let i = 0; i < medicines.length; i++) {
        if (i === 0) {
            // Populate the existing input fields
            document.getElementById('medicine1').value = medicines[i];
            document.getElementById('dosage1').value = dosages[i];
        } else {
            // Add new medicine and dosage fields as needed
            addMedicineButton.click();
            const lastMedicineField = document.getElementById(`medicine${i + 1}`);
            const lastDosageField = document.getElementById(`dosage${i + 1}`);
            lastMedicineField.value = medicines[i];
            lastDosageField.value = dosages[i];
        }
    }

    document.getElementById('reason').value = reason;

    // Remove the row from the table
    row.remove();
}

// ... (previous code)

// Function to sort the table rows by date and update the display
function sortTableByDate() {
    const rows = Array.from(tableBody.rows);

    rows.sort((a, b) => {
        const dateA = new Date(a.cells[0].innerHTML);
        const dateB = new Date(b.cells[0].innerHTML);
        return dateB - dateA;
    });

    // Clear the existing table
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }

    // Insert the sorted rows
    for (const row of rows) {
        tableBody.appendChild(row);
    }
}

// Attach an event listener to the "Sort by Date" button
document.getElementById("sort-button").addEventListener('click', sortTableByDate);

// ... (rest of the code)
