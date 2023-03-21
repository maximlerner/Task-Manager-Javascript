let isLoaded = false;
let isCheckbox = false;

function getNotesFromLocalStorage() {
  return JSON.parse(localStorage.getItem("MyNoteList"));
}

function noteConstructor() {
  const notes = getNotesFromLocalStorage() || [];
  //   Check if page is loaded on first render loop over notes array and append each note to rendered html element
  if (!isLoaded) {
    notes.forEach((el) => {
      const note = {
        id: el.id,
        data: el.data,
        time: el.time,
        hour: el.hour,
        taskStatus: el.taskStatus
      };
      insertNoteToDOM(note);
    });
    isLoaded = true;
    // When all localStorage rendered isloaded becomes true and now DOMContentLoaded can listen to clicks on button with id of "btn"
  } else {
    const note = {
      id: String(Date.now()),
      data: document.getElementById("data").value,
      time: document.getElementById("time").value,
      hour: document.getElementById("hour").value,
      taskStatus: false
    };
    notes.push(note);
    localStorage.setItem("MyNoteList", JSON.stringify(notes));

    insertNoteToDOM(note);
  }
}
//When user clicks on add note we prevent from the form lose passed data and after that we call the noteConstructor
function addNote(e) {
  e.preventDefault();
  noteConstructor();
}

noteConstructor();

function insertNoteToDOM(note) {
  //1) Build HTML elements for building note template
  const noteEl = document.createElement("div");
  const noteInner = document.createElement("div");
  const icon = document.createElement("ION-ICON");
  const contentData = document.createElement("h2");
  const contentTime = document.createElement("h2");
  const contentHour = document.createElement("h2");
  const marked = document.createElement("div");
  const missionDone = document.createElement("label");
  const checkbox = document.createElement("input");

  //2) Add classes and attributes to note template

  noteEl.classList.add("note");
  noteInner.classList.add("inner");

  icon.setAttribute("name", "close-circle");
  icon.classList.add("deleteBtn");
  icon.setAttribute("onclick", "deleteBtn()");
  icon.setAttribute("noteId",`${note.id}`)
  checkbox.setAttribute("onchange", "markedTask()");
  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add("checkedbox");
  checkbox.setAttribute("key",`${note.id}`)

  //3) Insert data from form or localstorage to html elements
  contentData.innerText = note.data;
  contentTime.innerText = note.time;
  contentHour.innerText = note.hour;
  missionDone.innerText = "Task completed";

  //4) Defining the hierarchy of the note html elements
  marked.appendChild(checkbox);
  marked.appendChild(missionDone);
  noteInner.appendChild(icon);
  noteInner.appendChild(contentData);
  noteInner.appendChild(contentTime);
  noteInner.appendChild(contentHour);
  noteEl.appendChild(noteInner);
  noteEl.appendChild(marked);

  document.body.appendChild(noteEl);
}

function deleteAllNotes(e) {
  e.preventDefault();
  if (isCheckbox) {
    localStorage.removeItem("MyNoteList");
    window.location.reload();
  } else {
    console.log("Mark that check box if you want to delete all notes");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Here we listen to clicks and if there is a click on button with id "btn" addNote function is activated
  document.getElementById("btn").addEventListener("click", addNote);
  
  // Here we listen to clicks and if there is a click on button with id "btn-array" deleteAllNotes function is activated
  document.getElementById("btn-array").addEventListener("click", deleteAllNotes);
  
  // Here we listen to changes on input checkbox and if there is a change on input with id "check" markDeleteArray function is activated
  //Side note don't try to use click on input it breakes css style
  document.getElementById("check").addEventListener("change", markDeleteArray);

  const check = document.querySelector("body")
  if (check) {

    check.addEventListener("change", (event) => {
      const key = event.target.getAttribute('key')
      const newNotesArray = JSON.parse(localStorage.getItem("MyNoteList"));
      console.log(key);
      let indexToUpdate = newNotesArray.findIndex((e) => e.id === key )
      for (i = 0; i < newNotesArray.length; i++) {
        if (newNotesArray[i] === key) {
          console.log(i);
          pos = i
        }
      }
      console.log(indexToUpdate);
    });
  }
});

//DeleteBtn will delete the note by getting the note entire div and delete it
function deleteBtn() {
  $(".note").on("click", ".deleteBtn", function (e) {
    e.preventDefault();
    const newNotesArray = JSON.parse(localStorage.getItem("MyNoteList"));
    const noteId = $(this).attr("noteId")
    $(this).parent().parent().remove();
    console.log(noteId);
    let indexToDelete = newNotesArray.findIndex((e) => {
      return e.id === noteId 
    });
    newNotesArray.splice(indexToDelete,1)
    console.log(newNotesArray);
    localStorage.setItem("MyNoteList",JSON.stringify(newNotesArray))
  });
}

function markDeleteArray(e) {
  console.log(isCheckbox);
  e.preventDefault();
  isCheckbox = !isCheckbox;
}

function markedTask() {
  if ($(".checkedbox").checked) {
    console.log("marked");
  } else {
    console.log("not checked");
  }
}


