import{ initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const input = document.getElementById("inputField");
const boto = document.getElementById("afegir");
const lista = document.getElementById ("llista")

const appSettings = {
    databaseURL: "https://addtocart-367b1-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp (appSettings);
const baseDades = getDatabase(app);
const tasks = ref(baseDades, "tareas");

boto.addEventListener("click", function () {
    push(tasks, input.value)
    clearScreen ();

})


function addElement(e) {
    
    let elementLlista = document.createElement ("li");
    elementLlista.id=e[0]
    elementLlista.textContent=e[1];
    elementLlista.addEventListener("click", function(){
        let localitzacioItem = ref(baseDades, `tareas/${e[0]}`)
        remove(localitzacioItem)
    })
    lista.append(elementLlista);
}


function clearScreen(){
    input.value = ""
}

function clearList(){
    lista.innerHTML=""
}


onValue (tasks, function (snapshot){
    if(snapshot.exists()) {


    let resultats = Object.entries (snapshot.val())
    clearList()
    for (let i = 0; i < resultats.length; i++)  {
        let current = resultats[i]
        addElement (current)
    }
}else{
    lista.innerHTML = "compra algo Rosi"
}
})






















































