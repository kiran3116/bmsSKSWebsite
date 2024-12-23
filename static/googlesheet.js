document.getElementById("smsForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const sheetUrl = document.getElementById("googleSheetUrl").value;
    const sheetName = document.getElementById("sheetSelect").value;
    const columnIndex = document.getElementById("columnSelect").value; // Column index (1-based)
    const message = document.getElementById("messageBox").value;

    if (!sheetUrl || !sheetName || !columnIndex || !message) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        // Step 1: Fetch data from Google Sheet
        const response = await fetch("/fetch-data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ sheet_url: sheetUrl, sheet_name: sheetName }),
        });

        const data = await response.json();
        if (data.error) {
            alert("Error fetching sheet data: " + data.error);
            return;
        }

        const rows = data.data;
        const columnIdx = parseInt(columnIndex) - 1; // Convert to 0-based index

        // Extract recipients' phone numbers
        const recipients = rows.map(row => row[columnIdx]).filter(number => number); // Remove empty entries

        if (recipients.length === 0) {
            alert("No valid phone numbers found in the selected column.");
            return;
        }

        // Step 2: Send SMS to recipients
        const sendSmsResponse = await fetch("/google_send-sms", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: message, recipients: recipients }),
        });

        const smsResult = await sendSmsResponse.json();
        if (smsResult.error) {
            alert("Error sending SMS: " + smsResult.error);
            return;
        }

        // Display results
        let successCount = 0;
        let failureCount = 0;
        smsResult.results.forEach(result => {
            if (result.status === "sent") {
                successCount++;
            } else {
                failureCount++;
                console.error(`Failed to send to ${result.recipient}: ${result.error}`);
            }
        });

        alert(`SMS Sent: ${successCount}\nFailed: ${failureCount}`);
    } catch (error) {
        console.error("An unexpected error occurred:", error);
        alert("An unexpected error occurred. Check the console for details.");
    }
});
