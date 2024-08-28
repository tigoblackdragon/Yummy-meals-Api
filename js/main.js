document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("opn_btn").addEventListener("click", openNav);
  document.getElementById("cls_btn").addEventListener("click", closeNav);
  addEventListener("load", getStart);
  document.querySelector(".sch").addEventListener("click", showInput);
  document.querySelector(".cag").addEventListener("click", getCategs);
  document.querySelector(".are").addEventListener("click", getAreas);
  document.querySelector(".ing").addEventListener("click", getIngrd);
  document.querySelector(".cnt").addEventListener("click", dispRegForm); 
  document.querySelector(".container .row").addEventListener("click", function(e1) {getMealId(e1)});
  document.querySelector(".container .row").addEventListener("click", function(e2) {getCatId(e2)});
  document.querySelector(".container .row").addEventListener("click", function(e3) {getAreId(e3)});
  document.querySelector(".container .row").addEventListener("click", function(e4) {getIngId(e4)});
  document.querySelector(".pop-meal .fa-xmark").addEventListener("click",clsMeal);
});


function openNav() {
  document.getElementById("mySidebar").style.left = "0";
  document.getElementById("main").style.left = "250px";
  document.getElementById("opn_btn").classList.add("visually-hidden");
  document.getElementById("cls_btn").classList.remove("visually-hidden");
  document.querySelector(".nav-hd #sch").style.top = "0";
  document.querySelector(".nav-hd .cag").style.top = "0";
  document.querySelector(".nav-hd .are").style.top = "0";
  document.querySelector(".nav-hd .ing").style.top = "0";
  document.querySelector(".nav-hd .cnt").style.top = "0";
}

function closeNav() {
  document.getElementById("mySidebar").style.left = "-250px";
  document.getElementById("main").style.left = "0px";
  document.getElementById("opn_btn").classList.remove("visually-hidden");
  document.getElementById("cls_btn").classList.add("visually-hidden");
  document.querySelector(".nav-hd #sch").style.top = "200px";
  document.querySelector(".nav-hd .cag").style.top = "1200px";
  document.querySelector(".nav-hd .are").style.top = "2200px";
  document.querySelector(".nav-hd .ing").style.top = "3200px";
  document.querySelector(".nav-hd .cnt").style.top = "4200px";
}
//first loading
var allMeals = [];
async function getStart() {
  try {
    let response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s="
    );
    let data = await response.json();
    allMeals = data.meals;
    console.log(allMeals);
    displayMeals(allMeals);
  } catch (error) {
    console.error("Error:", error);
  }
}
function displayMeals(x) {
  var pack = ``;
  if (x == null) {
    pack = `<p class="fs-1 text-white fw-bolder">No meals found.</p>`;
  } else {
    for (var i = 0; i < x.length; i++) {
      pack += `<div class="col-md-6 col-lg-4 col-xl-3">
              <div id-number="${i+1}"  data-id="${x[i].idMeal}" class="card overflow-hidden position-relative mt-4">
                <img id-number="${i+1}" data-id="${x[i].idMeal}" src="${x[i].strMealThumb}" class="" alt="..." />
                <div id-number="${i+1}" data-id="${x[i].idMeal}"
                  class="ovr-rly position-absolute d-flex flex-column justify-content-center"
                >
                  <h6 class="ps-2 fs-1">${x[i].strMeal}</h6>
                </div>
              </div>
            </div>`;
    }
  }
  document.querySelector(".container .row").innerHTML = pack;
}
var mealIdNumber;
function getMealId(x){
  var mealId=x.target.parentElement.getAttribute('data-id');
   mealIdNumber=x.target.parentElement.getAttribute('id-number');
    console.log(x.target);
    console.log(mealId);
    console.log(mealIdNumber);
    if(mealId!=0&& !isNaN(parseInt(mealId, 10))){getMealData(mealId);}

  };
var mealChk;
async function getMealData(x){
  try {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${x}`);
    let data = await response.json();
    var meal=data.meals;
    console.log(data);
    mealChk=meal;
    var mealData=meal[0];
    dispMeal(mealData);

  } catch (error) {
    console.error("Error:", error);
  }
}
function clsMeal(){
  document.querySelector(".pop-meal").classList.replace("d-flex", "d-none");
  document.querySelector(".pop-meal .row").innerHTML =" ";
}
function trnRight(){
mealIdNumber++;
console.log(mealIdNumber);

  
}
function trnLeft(){
  mealIdNumber--;
  console.log(mealIdNumber);
}

function dispMeal(x){
  var pack=``;
  let mealIng=``;
  for (i=1;i<=20;i++)
  {if(x[`strIngredient${i}`]){mealIng+=`<span class="alert alert-info p-1 me-2">${x[`strIngredient${i}`]}</span>`}}
  let mealMes=``;
  for (i=1;i<=20;i++)
  {if(x[`strMeasure${i}`]&&x[`strMeasure${i}`]!==" "){mealMes+=`<span class="alert alert-danger p-1 me-2">${x[`strMeasure${i}`]}</span>`}}
  pack=`
            <div class="col-md-4">
              <div class="card-img p-3">
                <img
                  src="${x.strMealThumb}"
                  width="100%"
                  alt=""
                />
                <h2 class="text-white fs-6">${x.
                strMeal}</h2>
              </div>
            </div>
            <div class="col-md-8 ps-3 pe-5 pt-5">
              <div class="card-txt">
                <h2>Instructions</h2>
                <p class="text-white">
                  ${x.strInstructions}
                </p>
                <h2>Area : <span>${x.strArea}</span></h2>
                <h2>Category : <span>${x.strCategory}</span></h2>
                <h2 class="pb-2">Recipes :</h2>
                <div class="rec d-flex g-3 flex-wrap text-white">
                  ${mealIng}
                </div>
                <h2 class="pb-2">Tags :</h2>
                <div class="tag d-flex g-3 flex-wrap text-white">
                  ${mealMes}
                </div>
                <div class="src-tub mt-3 mb-5">
                  
                  <a href="${x.strSource}" class="btn btn-success">Source</a>
                  <a href="${x.strYoutube}" class="btn btn-danger ms-2">Youtube</a>
                </div>
              </div>
            </div>
          </div>
        </div>`
        document.querySelector(".pop-meal").classList.replace("d-none", "d-flex");
        document.querySelector(".pop-meal .row").innerHTML = pack;

}
////////////////////////////////////////////////////////////////////////////
//search by name
function showInput() {
  document.querySelector(
    ".container .row"
  ).innerHTML = `<div class="loader position-absolute"></div>`;
  document.getElementById(
    "sr-inp"
  ).innerHTML = `<input id="bname" class="form-control me-2 mt-5" type="text" placeholder="Search By Name">
          <input id="bfletter" class="form-control mt-5" type="text" maxlength="1" placeholder="Search By First Letter">`;
  document.getElementById("bname").addEventListener("input", searchByName);
  document.getElementById("bfletter").addEventListener("input", searchByFirst);
  closeNav();
}
var srcMeals = [];
async function searchByName() {
  try {
    if (document.getElementById("bname").value == null) {
      var srNam = "";
    } else {
      var srNam = document.getElementById("bname").value;
    }
    console.log(srNam);
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${srNam}`
    );
    let data = await response.json();
    srcMeals = data.meals;
    console.log(srcMeals);
    displayMeals(srcMeals);
  } catch (error) {
    console.error("Error:", error);
  }
}

//search by first letter
var srcLtMeals = [];
async function searchByFirst() {
  try {
    if (document.getElementById("bfletter").value == null) {
      var srNam = "a";
    } else {
      var srNam = document.getElementById("bfletter").value;
    }
    console.log(srNam);
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${srNam}`
    );
    let data = await response.json();
    console.log(data);
    srcLtMeals = data.meals;
    console.log(srcLtMeals);
    displayMeals(srcLtMeals);
  } catch (error) {
    console.error("Error:", error);
  }
}
//////////////////////////////////////////////////////////////////////////////
//categories
function displayCategs(x) {
  document.getElementById(
    "sr-inp"
  ).innerHTML ="";
  var pack = ``;
  if (x == null) {
    pack = `<p class="fs-1 text-white fw-bolder">No meals found.</p>`;
  } else {
    for (var i = 0; i < x.length; i++) {
      pack += `<div class="col-md-6 col-lg-4 col-xl-3">
          <div cat-id="${x[i].strCategory}" class="card overflow-hidden position-relative mt-4 bg-black">
            <img cat-id="${x[i].strCategory}" src="${x[i].strCategoryThumb}" class="" alt="..." />
            <div cat-id="${x[i].strCategory}"
              class="ovr-rly position-absolute d-flex flex-column justify-content-center "
            >
              <h2 cat-id="${x[i].strCategory}" class="pt-1 mt-0 fs-5 text-center text-dark ">${
                x[i].strCategory
              }</h2>
              <p cat-id="${x[i].strCategory}" class="ps-2 fs-6 text-center ">${x[i].strCategoryDescription
                .split(" ")
                .slice(0, 20)
                .join(" ")}</p>
            </div>
          </div>
        </div>`;
    }
  }
  document.querySelector(".container .row").innerHTML = pack;
  closeNav();
}
var allCategs = [];
async function getCategs() {
  try {
    let response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    let data = await response.json();
    allCategs = data.categories;
    console.log(allCategs);
    displayCategs(allCategs);
  } catch (error) {
    console.error("Error:", error);
  }
}
function getCatId(x){
  var catId=x.target.getAttribute('cat-id');
    console.log(x.target);
    console.log(catId);
    getCategsMeal(catId);
    
  };
async function getCategsMeal(x){
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${x}`
    );
    let data = await response.json();
    malCat = data.meals;
    console.log(data);
    if(malCat!=null){displayMeals(malCat)};
  } catch (error) {
    console.error("Error:", error);
  }
}

//////////////////////////////////////////////////////////////////////////////////////
//Areas
function displayAreas(x) {
  document.getElementById(
    "sr-inp"
  ).innerHTML ="";
  var pack = ``;
  if (x == null) {
    pack = `<p class="fs-1 text-white fw-bolder">No meals found.</p>`;
  } else {
    for (var i = 0; i < x.length; i++) {
      pack += `<div class="col-md-6 col-lg-4 col-xl-3">
          <div class="crd-are pt-3">
            <i Are-id="${x[i].strArea}" class="fas fa-house-chimney fs-6"></i>
            <h2 Are-id="${x[i].strArea}" class="pt-1 mt-0 fs-5 text-center text-white">${x[i].strArea}</h2>
          </div>
        </div>`;
    }
  }
  document.querySelector(".container .row").innerHTML = pack;
  closeNav();
}
var allAreas = [];
async function getAreas() {
  try {
    let response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    );
    let data = await response.json();
    allAreas = data.meals;
    
    displayAreas(allAreas);
  } catch (error) {
    console.error("Error:", error);
  }
}
function getAreId(x){
  var areId=x.target.getAttribute('Are-id');
    console.log(x.target);
    console.log(areId);
    if(areId!=null){getAreMeal(areId);}
    
  };
async function getAreMeal(x){
  try {
    let response = await fetch(
      `https:/www.themealdb.com/api/json/v1/1/filter.php?a=${x}`
    );
    let data = await response.json();
    areCat = data.meals;
    console.log(areCat);
    displayMeals(areCat);
  } catch (error) {
    console.error("Error:", error);
  }
}
//////////////////////////////////////////////////////////////////////////////////////
//Ingredients
function displayIngrd(x) {
  document.getElementById(
    "sr-inp"
  ).innerHTML ="";
  var pack = ``;
  if (x == null) {
    pack = `<p class="fs-1 text-white fw-bolder">No meals found.</p>`;
  } else {
    for (var i = 0; i < x.length; i++) {
      const description = x[i].strDescription || "";
      pack += `<div class="col-md-6 col-lg-4 col-xl-3">
          <div Ing-id="${x[i].strIngredient}" class="crd-are pt-3">
            <i Ing-id="${x[i].strIngredient}" class="fas fa-utensils fs-6"></i>
            <h2 Ing-id="${x[i].strIngredient}" class="pt-1 mt-0 fs-5 text-center text-white">${
              x[i].strIngredient
            }</h2>
            <p Ing-id="${x[i].strIngredient}" class="ps-2 fs-6 text-center text-white">${description
              .split(" ")
              .slice(0, 20)
              .join(" ")}</p>
          </div>
        </div>`;
    }
  }
  document.querySelector(".container .row").innerHTML = pack;
  closeNav();
}
var allIngrd = [];
async function getIngrd() {
  try {
    let response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
    );
    let data = await response.json();
    allIngrd = data.meals;
    console.log(allIngrd[0]);
    displayIngrd(allIngrd);
  } catch (error) {
    console.error("Error:", error);
  }
}
function getIngId(x){
  var ingId=x.target.getAttribute('Ing-id');
    console.log(x.target);
    console.log(ingId);
    if(ingId!=null){getIngMeal(ingId);}
    
  };
async function getIngMeal(x){
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${x}`
    );
    let data = await response.json();
    ingCat = data.meals;
    console.log(data);
    displayMeals(ingCat);
  } catch (error) {
    console.error("Error:", error);
  }
}
//////////////////////////////////////////////////////////////////////////////////////
//registeration
function dispRegForm() {
  document.getElementById(
    "sr-inp"
  ).innerHTML ="";
  document.querySelector(".container .row").innerHTML = `<div class="col-md-6">
          <input
            id="nInp"
            type="text"
            class="form-control"
            placeholder="Enter Your Name"
          />
          <div id="nAlr" class="alert alert-danger w-100 mt-2 d-none">
            Special characters and numbers not allowed
          </div>
        </div>
        <div class="col-md-6">
          <input
            id="emInp"
            type="email"
            class="form-control"
            placeholder="Enter Your Email"
          />
          <div id="emAlr" class="alert alert-danger w-100 mt-2 d-none">
            Email not valid *exemple@yyy.zzz
          </div>
        </div>
        <div class="col-md-6">
          <input
            id="phInp"
            type="text"
            class="form-control"
            placeholder="Enter Your Phone"
          />
          <div id="phAlr" class="alert alert-danger w-100 mt-2 d-none">
            Enter valid Phone Number
          </div>
        </div>
        <div class="col-md-6">
          <input
            id="agInp"
            type="number"
            class="form-control"
            placeholder="Enter Your Age"
          />
          <div id="agAlr" class="alert alert-danger w-100 mt-2 d-none">
            Enter valid age
          </div>
        </div>
        <div class="col-md-6">
          <input
            id="pasInp"
            type="password"
            class="form-control"
            placeholder="Enter Your Password"
          />
          <div id="pasAlr" class="alert alert-danger w-100 mt-2 d-none">
            Enter valid password *Minimum eight characters, at least one letter
            and one number:*
          </div>
        </div>
        <div class="col-md-6">
          <input
            id="repInp"
            type="password"
            class="form-control"
            placeholder="Repassword"
          />
          <div
            id="repAlr"
            class="alert alert-danger w-100 mt-2 d-none"
          >
            Enter valid repassword
          </div>
        </div>
      </div>
      <button
        id="subBtn"
        disabled=""
        class="btn btn-outline-danger px-2 mt-3 "
      >
        Submit
      </button>`;
  closeNav();
  document.getElementById("nInp").addEventListener("keyup", nInpVald);
  document.getElementById("emInp").addEventListener("keyup", emInpVald);
  document.getElementById("phInp").addEventListener("keyup", phInpVald);
  document.getElementById("agInp").addEventListener("keyup", agInpVald);
  document.getElementById("pasInp").addEventListener("keyup", pasInpVald);
  document.getElementById("repInp").addEventListener("keyup", repInpVald);
  addEventListener("keyup", inpVald);

}
var nVald;
function nInpVald() {
  nVald = /^[a-zA-Z ]+$/.test(document.getElementById("nInp").value);
  console.log(nVald);
  if (nVald) {
    document.getElementById("nAlr").classList.replace("d-block", "d-none");
  } else {
    document.getElementById("nAlr").classList.replace("d-none", "d-block");
  }
}
var emVald;
function emInpVald() {
  emVald =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      document.getElementById("emInp").value
    );
  console.log(emVald);
  if (emVald) {
    document.getElementById("emAlr").classList.replace("d-block", "d-none");
  } else {
    document.getElementById("emAlr").classList.replace("d-none", "d-block");
  }
}
var phVald;
function phInpVald() {
  phVald =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
      document.getElementById("phInp").value
    );
  console.log(phVald);
  if (phVald) {
    document.getElementById("phAlr").classList.replace("d-block", "d-none");
  } else {
    document.getElementById("phAlr").classList.replace("d-none", "d-block");
  }
}
var agVald;
function agInpVald() {
  agVald =
    /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
      document.getElementById("agInp").value
    );
  console.log(agVald);
  if (agVald) {
    document.getElementById("agAlr").classList.replace("d-block", "d-none");
  } else {
    document.getElementById("agAlr").classList.replace("d-none", "d-block");
  }
}
var pasVald;
function pasInpVald() {
  pasVald =
    /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
      document.getElementById("pasInp").value
    );
  console.log(pasVald);
  if (pasVald) {
    document.getElementById("pasAlr").classList.replace("d-block", "d-none");
  } else {
    document.getElementById("pasAlr").classList.replace("d-none", "d-block");
  }
}
var repVald;
function repInpVald() {
  repVald =document.getElementById("repInp").value == document.getElementById("pasInp").value;
  console.log(repVald);
  if (repVald) {
    document.getElementById("repAlr").classList.replace("d-block", "d-none");
  } else {
    document.getElementById("repAlr").classList.replace("d-none", "d-block");
  }
}
function inpVald(){
  if (nVald&&emVald&&phVald&&agVald&&pasVald&&repVald) {
  subBtn.removeAttribute("disabled")
} else {
  subBtn.setAttribute("disabled", true)
}
}
