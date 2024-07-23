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

    var data = callsSheet.getDataRange().getValues();
    
    if (row > 0 && row <= data.length - 1) {

      var id = data[row][0];
      var agendacion = data[row][1];
      var email = data[row][2];
      var closer = data[row][8];
      
      row = row + 1;

      var pkLeads = row - 1;
      
      leadsSheet.getRange(row, 1).setValue(pkLeads); // Asume que la columna A es la de "ID"
      leadsSheet.getRange(row, 2).setValue(agendacion); // Asume que la columna B es la de "Agendacion"
      leadsSheet.getRange(row, 3).setValue(email); // Asume que la columna B es la de "Email"
      leadsSheet.getRange(row, 4).setValue(closer); // Asume que la columna D es la de "closer"
      leadsSheet.getRange(row, 5).setValue(status); // Asume que la columna E es la de "Estado"
      leadsSheet.getRange(row, 6).setValue(id); // Asume que la columna F es la de "FK del ID de Llamada"

      logChange(agendacion, email, closer, status, id)
    } else {
      Logger.log("Número de fila fuera de rango.");
    }
  } catch (error) {
    Logger.log("Error en updateStatus: " + error.message);
    throw error;
  }
  

}

// Función para registrar el cambio en el historial
function logChange(agendacion, email, closer, status, id) {
  try {
    // Registrar el cambio en el historial
      var currentDate = new Date();
      var formattedDate = Utilities.formatDate(currentDate, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm:ss');
      var historySheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Historial de Cambios');

      var historyData = historySheet.getDataRange().getValues();
      historyData = historyData.length;

      historySheet.appendRow([historyData, formattedDate, agendacion, email, closer, status, id]);
  } catch (error) {
     Logger.log("Error en logChange: " + error.message);
    throw error;
  }
  
}
