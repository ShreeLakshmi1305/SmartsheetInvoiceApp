document.getElementById('loadSheets').addEventListener('click', async () => {
    const accessToken = document.getElementById('accessToken').value;
    if (!accessToken) {
        alert('Please enter your Smartsheet Access Token.');
        return;
    }

    const sheets = await fetchSheets(accessToken);
    const sheetSelect = document.getElementById('sheetSelect');
    sheetSelect.innerHTML = ''; // Clear previous options

    sheets.forEach(sheet => {
        const option = document.createElement('option');
        option.value = sheet.id;
        option.textContent = sheet.name;
        sheetSelect.appendChild(option);
    });
});

document.getElementById('sheetSelect').addEventListener('change', async () => {
    const accessToken = document.getElementById('accessToken').value;
    const selectedSheetId = document.getElementById('sheetSelect').value;
    const columns = await fetchColumns(accessToken, selectedSheetId);
    const columnSelect = document.getElementById('columnSelect');
    columnSelect.innerHTML = ''; // Clear previous options

    columns.forEach(column => {
        const option = document.createElement('option');
        option.value = column.id;
        option.textContent = column.title;
        columnSelect.appendChild(option);
    });
});

document.getElementById('generateInvoice').addEventListener('click', async () => {
    const accessToken = document.getElementById('accessToken').value;
    const selectedSheetId = document.getElementById('sheetSelect').value;
    const selectedColumnId = document.getElementById('columnSelect').value;
    const values = await fetchColumnValues(accessToken, selectedSheetId, selectedColumnId);
    displayInvoice(values);
});

async function fetchSheets(accessToken) {
    const response = await fetch(`https://api.smartsheet.com/2.0/sheets`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const data = await response.json();
        return data.data;
    } else {
        console