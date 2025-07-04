function addNote() {
    const noteInput = document.getElementById("noteInput");
    const noteText = noteInput.value.trim();
    if (noteText === "") return;

    const notes = getNotes();
    notes.push(noteText);
    localStorage.setItem("notes", JSON.stringify(notes));

    noteInput.value = "";
    showNotes();
}

function getNotes() {
    const notes = localStorage.getItem("notes");
    return notes ? JSON.parse(notes) : [];
}

function showNotes() {
    const notesList = document.getElementById("notesList");
    notesList.innerHTML = "";

    const notes = getNotes();
    notes.forEach((note, index) => {
        const noteDiv = document.createElement("div");
        noteDiv.className = "note";
        noteDiv.innerHTML = `
            ${note}
            <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
        `;
        notesList.appendChild(noteDiv);
    });
}

function deleteNote(index) {
    const notes = getNotes();
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

// Show notes on page load
window.onload = showNotes;
