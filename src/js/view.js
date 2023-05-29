
const insertNoteToDOM = (note) => {
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
    icon.setAttribute("onclick", "deleteButton()");
    noteEl.setAttribute("noteId",`${note.id}`);
    checkbox.setAttribute("onchange", "markedTask()");
    checkbox.setAttribute("type", "checkbox");
    checkbox.classList.add("checkedbox");
    checkbox.setAttribute("key",`${note.id}`);

    if (note.taskStatus) checkbox.checked = true;

    
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