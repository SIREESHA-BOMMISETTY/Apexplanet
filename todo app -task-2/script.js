const inputbox=document.getElementById("input_box");
const listbox=document.getElementById("list_box");

function addtask(){
    if(inputbox.value === ''){
        alert("enter your task");
    }
    else{
        let li=document.createElement("li");
        li.innerHTML= inputbox.value;
        listbox.appendChild(li);
        let span=document.createElement('span');
        span.innerHTML="\u00d7";
        li.appendChild(span);
          voice("Task added: " + inputbox.value);
    }
        inputbox.value='';
        dataSave();
}

listbox.addEventListener('click',function(e){
    if(e.target.tagName === 'LI'){
        e.target.classList.toggle("check");
        dataSave();
    }
    else if(e.target.tagName === 'SPAN'){
        e.target.parentElement.remove();
        dataSave();
    }
},false);
 
 function dataSave(){
    localStorage.setItem("data" , listbox.innerHTML);
    
 }
 function showTask(){
    listbox.innerHTML=localStorage.getItem("data");
 }
 showTask()


 function voice(text) {
    const speak = new SpeechSynthesisUtterance(text);
    speak.lang = 'en-US';
    speechSynthesis.speak(speak);
}
