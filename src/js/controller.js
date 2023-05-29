const error  = document.querySelector('.error');
//When user clicks on add note we prevent from the form lose passed data and after that we call the noteConstructor
function addNoteHandler(e) {
  e.preventDefault();
  noteConstructor();
}

const deleteAllNotesHandler = (e) => {
  e.preventDefault();
  if (isCheckbox) {
    localStorage.removeItem("MyNoteList");
    window.location.reload();
  } else {
    error.classList.toggle('border')
    error.innerHTML = 'Mark the check box if you want to delete all notes';
  }
}

const markDeleteArrayHandler = (e) => {
  e.preventDefault();
  isCheckbox = !isCheckbox;
  if(isCheckbox) error.classList.remove('border');
  error.innerHTML = '';
}

noteConstructor();

// Here we listen to clicks and if there is a click on button with id "btn" addNote function is activated
document.getElementById("btn").addEventListener("click", addNoteHandler);

// Here we listen to clicks and if there is a click on button with id "btn-array" deleteAllNotes function is activated
document.getElementById("btn-array").addEventListener("click", deleteAllNotesHandler);

// Here we listen to changes on input checkbox and if there is a change on input with id "check" markDeleteArray function is activated
//Side note don't try to use click on input it breakes css style
document.getElementById("check").addEventListener("change", markDeleteArrayHandler);









