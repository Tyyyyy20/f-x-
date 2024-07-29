function filterResponses() {
  // Get the active spreadsheet and sheets
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var fullResponsesSheet = ss.getSheetByName('Full Responses');
  var shortlistedResponsesSheet = ss.getSheetByName('Shortlisted Responses');

  // Clear previous content in the shortlisted responses sheet
  shortlistedResponsesSheet.clear();

  // Get all data from the full responses sheet
  var data = fullResponsesSheet.getDataRange().getValues();

  // Create an array to hold the filtered data
  var filteredData = [];

  // Loop through the data and filter out rows with "No work experience at all" and "High School Certificate"
  for (var i = 0; i < data.length; i++) {
    var column = data[i];
    // Assuming the qualification column is the 2nd column (index 1)
    // Assuming the work experience column is the 7th column (index 6)
    if (i === 0 || (column[1] !== "High School Certificate"&& column[1] !=="A-level equivalent"&& column[2] !==">60" && column[6] !== "No work experience at all")) {
      filteredData.push(column);
    }
  }

  // Write the filtered data to the shortlisted responses sheet
  shortlistedResponsesSheet.getRange(1, 1, filteredData.length, filteredData[0].length).setValues(filteredData);
}

function updateAllDriveLinks() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const fullResponsesSheet = spreadsheet.getSheetByName('Full Responses');
  const shortlistedResponsesSheet = spreadsheet.getSheetByName('Shortlisted Responses');

  // Update both sheets
  updateDriveLinks(fullResponsesSheet);
  updateDriveLinks(shortlistedResponsesSheet);
}

function updateDriveLinks(sheet) {
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    const resumeLink = data[i][4]; // Column E: Resume Link
    if (resumeLink.includes('open?id=')) {
      data[i][4] = resumeLink.replace('open', 'uc');
    }
  }

  // Update the sheet with the new links
  sheet.getRange(1, 1, data.length, data[0].length).setValues(data);
}
