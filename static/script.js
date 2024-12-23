document.getElementById("excelFile").addEventListener("change", handleFile);
document.getElementById("sheetSelect").addEventListener("change", loadColumns);

function handleFile(event) {
  const file = event.target.files[0];
  if (!file) {
    alert("Please select a file!");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  fetch("http://127.0.0.1:5000/upload", {
    method: "POST",
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
        return;
      }

      // Populate sheets and save filename for later use
      if (data.sheets && data.sheets.length > 0) {
        populateSheets(data.sheets, file.name);
      } else {
        alert("No sheets found in the uploaded file!");
      }
    })
    .catch(err => {
      console.error("Error:", err);
      alert("An error occurred while uploading the file.");
    });
}

function populateSheets(sheets, filename) {
  const sheetSelect = document.getElementById("sheetSelect");

  // Add a default "Select a sheet" option
  sheetSelect.innerHTML = `<option value="">Select a sheet</option>` + 
    sheets.map(sheet => `<option value="${sheet}">${sheet}</option>`).join('');

  sheetSelect.dataset.filename = filename; // Save the file name for later use
}

function loadColumns() {
  const sheetName = document.getElementById("sheetSelect").value;
  const filename = document.getElementById("sheetSelect").dataset.filename;

  if (!sheetName) {
    alert("Please select a sheet first!");
    return;
  }

  fetch("http://127.0.0.1:5000/columns", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filename, sheet: sheetName }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
        return;
      }

      // Populate columns
      if (data.columns && data.columns.length > 0) {
        populateColumns(data.columns);
      } else {
        alert("No columns found in the selected sheet!");
      }
    })
    .catch(err => {
      console.error("Error:", err);
      alert("An error occurred while fetching columns.");
    });
}

function populateColumns(columns) {
  const columnSelect = document.getElementById("columnSelect");

  // Add a default "Select a column" option
  columnSelect.innerHTML = `<option value="">Select a column</option>` + 
    columns.map((col, index) => `<option value="${index}">${col}</option>`).join('');
}

// Toggle Theme Functionality
const toggleButton = document.getElementById("toggleTheme");
    toggleButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  




document.getElementById("smsForm").addEventListener("submit", sendSMS);

function sendSMS(event) {
  event.preventDefault();
  
  const sheetName = document.getElementById("sheetSelect").value;
  const columnIndex = document.getElementById("columnSelect").value;
  const message = document.getElementById("messageBox").value;
  const filename = document.getElementById("sheetSelect").dataset.filename;

  if (!sheetName || columnIndex === "" || !message) {
    alert("Please fill in all fields!");
    return;
  }

  fetch("http://127.0.0.1:5000/send_sms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      filename,
      sheet: sheetName,
      column: columnIndex,
      message,
    }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        alert(data.message);
      }
    })
    .catch(err => {
      console.error("Error:", err);
      alert("An error occurred while sending SMS.");
    });
}






// logic for templates
// script.js
document.getElementById('registerForm').addEventListener('submit', function(e) {
  let password = document.getElementById('password').value;
  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    e.preventDefault();
  }
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
  let password = document.getElementById('password').value;
  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    e.preventDefault();
  }
});