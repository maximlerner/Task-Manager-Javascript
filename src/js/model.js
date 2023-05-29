
let isLoaded = false;
let isCheckbox = false;

const getNotesFromLocalStorage = () => {
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

  function markedTask() {
    //1) Get the notes array from localstorage
    const newNotesArray = JSON.parse(localStorage.getItem("MyNoteList"));
  
    $(".note").on("change", function (e) {
      // 2) Prevent bubbling
      e.stopImmediatePropagation();
  
      // 3) Get the note id and then find the index of note witch needs to be updated 
      const noteId = $(this).closest(".note").attr("noteId");
      const indexToUpdate = newNotesArray.findIndex(el => el.id === noteId)
  
      // 4) Switch the state of the task status so that noteConstructor could render the state of taskStatus
      newNotesArray[indexToUpdate].taskStatus = !newNotesArray[indexToUpdate].taskStatus;
  
      // 5) Save the new array in local storage
      localStorage.setItem("MyNoteList",JSON.stringify(newNotesArray))
    });
    
  }

  //DeleteBtn will delete the note by getting the note entire div and delete it
function deleteButton() {
    const newNotesArray = JSON.parse(localStorage.getItem("MyNoteList"));
    
    $(".note").on("click", function (e) {
      e.stopImmediatePropagation();
      const noteId = $(this).closest(".note").attr("noteId");
      $(this).remove();
      
      const indexToDelete = newNotesArray.findIndex(el => {
        return el.id === noteId 
      });
      newNotesArray.splice(indexToDelete,1)
      localStorage.setItem("MyNoteList",JSON.stringify(newNotesArray))
    });
}
