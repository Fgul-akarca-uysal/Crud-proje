//html elementleri
const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

///duzenleme secenekleri
let editElement; //duzenleme yapilan ogeyi temsil eder
let editFlag = false; //duzenleme modunda olup olmadigini belirtir
let editID = ""; //benzersiz ID

//form gonderildiginde addItem fonksiyonunu cagir
form.addEventListener("submit", addItem);
//temizle dugmesine tiklanildiginda clearItems fonksiyonunu cagir
clearBtn.addEventListener("click", clearItems);

//sayfa yuklenildiginde setupitems fonksiyonunu cagir
window.addEventListener("DOMContentLoaded", setupItems);

//!functions
function addItem(e) {
  e.preventDefault();
  const value = grocery.value; // inputun giris degerini al
  const id = new Date().getTime().toString();

  if (value !== "" && !editFlag) {
    const element = document.createElement("article");
    let attr = document.createAttribute("data-id"); // yeni bir veri kimligi olusturur
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("grocery-item");
    // console.log(element);
    element.innerHTML = `
    <p class="title">${value}</p>
                    <div class="btn-container">
                        <button class="edit-btn" type="button"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button class="delete-btn" type="button"><i class="fa-solid fa-trash"></i></button>

                    </div>
   `;
   const deleteBtn = element.querySelector(".delete-btn");
   deleteBtn.addEventListener("click",deleteItem );


  const editBtn = element.querySelector(".edit-btn");
  editBtn.addEventListener("click", editItem);



   list.appendChild(element);
//alert
displayAlert("Basariyla Eklendi", "succes");
//show-container
container.classList.add("show-container");
//localstorage ekleme
addToLocalStorage(id, value);
//icerigi temizleme
setBackToDefault();
  }else if(value !== "" && editFlag){
    editElement.innerHTML = value;
    displayAlert("deger degistirildi", "succes");
    editLocalStorage(editID, value);
   setBackToDefault();
  } else{
    displayAlert("Lutfen bir deger giriniz","danger");
  }
}

//alert fonksiyonu
function displayAlert(text,action){
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    console.log(alert);
   setTimeout(function(){
    alert.textContent=""
    alert.classList.remove(`alert-${action}`);
   },2000)
}
//temizleme
function setBackToDefault(){
    grocery.value=""
    editFlag= false;
    editID="";
    submitBtn.textContent = "submit";

}
//silme islemi
function deleteItem(e){
const element = e.currentTarget.parentElement.parentElement;
//console.log(element);
const id = element.dataset.id; // localstorage da kullanilacak

list.removeChild(element);

if(list.children.length == 0){
    container.classList.remove("show-container");
}
displayAlert("eleman kaldirildi", "danger");

//yerel depodan kaldir
removeFromLocalStorage(id);
}
//duzenleme fonksiyonu
function editItem(e){
 const element = e.currentTarget.parentElement.parentElement;
 editElement = e.currentTarget.parentElement.previousElementSibling;
//console.log(editElement);
//form degerini duzenlenen ogenin metniyle doldur
grocery.value = editElement.innerHTML;
editFlag = true;
editID = element.dataset.id; // duzenlenen elementin kimligi
submitBtn.textContent = "edit";

}
//listeyi temizleme
function clearItems(){
    const items = document.querySelectorAll(".grocery-item");
    if(items.length > 0){
        items.forEach(function(item){
            list.removeChild(item);// her ogeyi listeden kaldirir
        })

        }
        container.classList.remove("show-container");

    }



//yerel depoya oge ekleme islemi
function addToLocalStorage(id,value){
    const grocery = {id,value}
    let items = getLocalStorage();
   items.push(grocery);
     localStorage.setItem("list",JSON.stringify(items));



}

//localstoragedan verileri alma islemi
function getLocalStorage(){
    return localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : [];

}
function removeFromLocalStorage(id){
 let items = getLocalStorage()

 items = items.filter(function (item) {

    if (item.id !==id){
        return item
    }
 })
}
 
function editLocalStorage(id,value){

}
function setupItems(){
    let items = getLocalStorage();
}