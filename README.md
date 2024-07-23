# PruebaTecnica
#Mensaje de Iván:👋 ¡Hola! Necesito que crees una interfaz gráfica para que el equipo comercial (los closers) puedan actualizar el estado de sus agendaciones de llamada que están registradas en un Google Sheets 📊.

🎯 El Closer debe poder actualizar el "Estado" del lead (Contactado, Esperando respuesta, En llamada, Win, Lose) sin necesidad de hacerlo manualmente en Google Sheets. He escuchado que mucha gente usa Google Apps Script para crear estas interfaces que se conectan con Google Sheets🤔.

⚙️ Funcionalidades: 1) Menú personalizado para actualizar el estado, 2) Formulario emergente para seleccionar el estado, 3) Registro de cambios en una pestaña separada.

📄 Aquí tienes el enlace al Google Sheets con una base de datos para crear este sistema (haz una copia -- no pidas acceso):Este campo es obligatorio*
https://docs.google.com/spreadsheets/d/1FmtgyuLUZWTP59Jxm1vyz1ubsmlcojVoekS6wLDHbHA/edit?usp=sharing


Danos una respuesta incluyendo 3 enlaces: 1) Enlace del código de tu App Script 2) Enlace de tu base de datos, 3) Enlace de la App para los Closers. Además, incorpora una explicación de por qué has decidido realizarlo de esta manera. No olvides compartir acceso con ivan@mycontent.agency.

------------------------------------------------------------------------------
Solucion propuesta:
--
Hola Iván 👋

He creado la interfaz gráfica para que el equipo comercial (los closers) puedan actualizar el estado de sus agendaciones de llamada en Google Sheets utilizando Google Apps Script. Aquí tienes los pasos y enlaces necesarios para acceder y utilizar el sistema.

Funcionalidades Implementadas:
Menú Personalizado: Añadí un menú llamado "Actualizar Estado" en Google Sheets para que los closers puedan acceder fácilmente a la interfaz.
Formulario Emergente: Implementé un formulario emergente donde los closers pueden seleccionar la fila del lead y el nuevo estado.
Registro de Cambios: Cualquier cambio realizado en el estado del lead se registra automáticamente en una pestaña separada llamada "Historial de Cambios".
Pasos Realizados:
Creación del Menú Personalizado y Formulario Emergente:

Al abrir el documento, se añade un menú personalizado en Google Sheets.
Al seleccionar la opción de "Cambiar Estado", se abre un formulario emergente para actualizar el estado del lead.
Actualización del Estado del Lead y Registro de Cambios:

El formulario permite seleccionar la fila del lead y el nuevo estado.
Al enviar el formulario, se actualiza el estado del lead en la hoja "Leads" y se registra el cambio en la hoja "Historial de Cambios".

Te comparto los enlaces:
# -- Codigo AppsScript: https://github.com/lorenang/Agenda-MenuEstados/blob/main/Code.gs
# -- Enlace BD: https://docs.google.com/spreadsheets/d/14Gb4q4EwvWUxs6GDHOHwjDxj1fc4mdGmBcP4DzgQxQA/edit?gid=0#gid=0
# -- Enlace App: https://www.appsheet.com/start/0efddb66-3810-4232-856d-ad5cc49a06de
