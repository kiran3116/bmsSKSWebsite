document.getElementById('excelFile').addEventListener('change', handleFile, false);

let sheetData = [];
let workbook = null;

function handleFile(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const data = e.target.result;
      workbook = XLSX.read(data, { type: 'binary' });
      
      const sheetSelect = document.getElementById('sheetSelect');
      sheetSelect.innerHTML = '<option value="">Select a sheet</option>';
      workbook.SheetNames.forEach(sheetName => {
        sheetSelect.appendChild(new Option(sheetName, sheetName));
      });

      clearDropdowns();
    };
    reader.readAsBinaryString(file);
  }
}

document.getElementById('sheetSelect').addEventListener('change', function () {
  const sheetName = this.value;

  if (sheetName && workbook) {
    const sheet = workbook.Sheets[sheetName];
    sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    if (sheetData.length > 0) {
      populateColumns(sheetData[0]);
    } else {
      alert('The selected sheet is empty.');
      clearDropdowns();
    }
  } else {
    clearDropdowns();
  }
});

function populateColumns(columns) {
  const columnSelect = document.getElementById('columnSelect');
  const messageColumnSelect = document.getElementById('messageColumnSelect');

  columnSelect.innerHTML = '<option value="">Select a column</option>';
  messageColumnSelect.innerHTML = '<option value="">Select a column for messages</option>';

  columns.forEach((col, index) => {
    columnSelect.appendChild(new Option(col || `Column ${index + 1}`, index));
    messageColumnSelect.appendChild(new Option(col || `Column ${index + 1}`, index));
  });
}

function clearDropdowns() {
  document.getElementById('columnSelect').innerHTML = '<option value="">Select a column</option>';
  document.getElementById('messageColumnSelect').innerHTML = '<option value="">Select a column for messages</option>';
}

document.getElementById('smsForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const selectedPhoneColumn = parseInt(document.getElementById('columnSelect').value);
  const selectedMessageColumn = parseInt(document.getElementById('messageColumnSelect').value);

  if (isNaN(selectedPhoneColumn) || isNaN(selectedMessageColumn)) {
    alert('Please select both phone number and message columns.');
    return;
  }

  const phones = sheetData.slice(1).map(row => row[selectedPhoneColumn]);
  const messages = sheetData.slice(1).map(row => row[selectedMessageColumn]);

  if (phones.some(phone => !phone) || messages.some(message => !message)) {
    alert('Some rows are missing phone numbers or messages. Please check the data.');
    return;
  }

  fetch('/excel_send_sms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phones, messages }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      document.getElementById('status').textContent = data.message || 'SMS sent successfully!';
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('status').textContent = 'Error sending SMS: ' + error.message;
    });
});
