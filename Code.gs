function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Actualizar Estado')
    .addItem('Cambiar Estado', 'showUpdateStatusDialog')
    .addToUi();
}

function showUpdateStatusDialog() {
  var html = HtmlService.createHtmlOutputFromFile('StatusDialog')
      .setWidth(400)
      .setHeight(300);
  SpreadsheetApp.getUi().showModalDialog(html, 'Actualizar Estado del Lead');
}

function updateStatus(row, status) {
  try {
    row = parseInt(row); // Convertir el número de fila a entero
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var callsSheet = ss.getSheetByName('Llamadas');
    var leadsSheet = ss.getSheetByName('Leads');
    var historySheet = ss.getSheetByName('Historial de Cambios');

    // Validar que las hojas existen
    if (!leadsSheet || !callsSheet || !historySheet) {
      Logger.log("Una o más hojas no se encontraron.");
      return;
    }

    // Verificar si ya se le ingresó un estado a esa llamada
    var leadsIDCallRange = leadsSheet.getRange("F:F").getValues().flat(); // Suponiendo que la columna ID_Llamada está en la columna F
    var existingRow = leadsIDCallRange.indexOf(row);
    
    if (existingRow > -1) {
      // Si se encuentra el ID, actualizar el estado en la hoja Leads
      leadsSheet.getRange(existingRow + 1, 5).setValue(status); // Suponiendo que la columna de estado está en la columna E
      Logger.log("Estado actualizado para ID:", row);
    } else {
      // Si no se encuentra el ID, agregar una nueva fila en la hoja Leads
      var data = callsSheet.getDataRange().getValues();
      if (row > 0 && row <= data.length - 1) {
        var id = data[row][0];
        var agendacion = data[row][1];
        var email = data[row][2];
        var closer = data[row][8];

        // Obtener el último valor de la columna ID en la hoja Leads
        var lastID = leadsSheet.getRange(leadsSheet.getLastRow(), 1).getValue();
        var newID = (lastID && !isNaN(lastID)) ? lastID + 1 : 1;

        leadsSheet.appendRow([newID, agendacion, email, closer, status, id]);
        logChange(agendacion, email, closer, status, id);
      } else {
        Logger.log("Número de fila fuera de rango.");
      }
    }
  } catch (error) {
    Logger.log("Error en updateStatus: " + error.message);
    throw error;
  }
}

// Función para registrar el cambio en el historial
// Función para registrar el cambio en el historial
function logChange(agendacion, email, closer, status, id) {
  try {
    var currentDate = new Date();
    var formattedDate = Utilities.formatDate(currentDate, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm:ss');
    var historySheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Historial de Cambios');

    // Obtener el último ID de la hoja
    var lastRow = historySheet.getLastRow();
    var lastID = lastRow > 1 ? historySheet.getRange(lastRow, 1).getValue() : 0;
    var newID = (lastID && !isNaN(lastID)) ? lastID + 1 : 1;

    // Registrar el cambio en el historial con el nuevo ID
    historySheet.appendRow([newID, formattedDate, agendacion, email, closer, status, id]);
  } catch (error) {
    Logger.log("Error en logChange: " + error.message);
    throw error;
  }
}
