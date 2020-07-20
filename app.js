async function getCook(string) {
  try {
    let results = await fetch(
      `https://api.spoonacular.com/recipes/findByNutrients?apiKey=9ef8ed83e4164a2eb14cf5bff7669c9a&${string}&random&number=3`
    );
    let data = await results.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getRecipe(id) {
  try {
    let recipe = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=9ef8ed83e4164a2eb14cf5bff7669c9a&includeNutrition=false`
    );

    let data = await recipe.json();
    return data;

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

// window.addEventListener("DOMContentLoaded", () => {
//   getRecipe(4632).then((recipe) => {
//     console.log(recipe.instructions);
//   });
// });

const main = document.querySelector("main");
const form = document.getElementById("ingredientForm");
const section = document.querySelector(".ingredient-form");
const submitBtn = document.querySelector("#submitBtn");
const numForm = document.createElement("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  submitBtn.disabled = true;

  let infoDiv = document.createElement("div");
  infoDiv.innerText = "Type amount of each nutrient (gram)";
  infoDiv.classList.add("infoDiv");

  const allIngredients = document.getElementsByClassName("ingredient");
  const protein = allIngredients[0];
  const carb = allIngredients[1];
  const fat = allIngredients[2];
  let proteinChecked = protein.checked;
  let carbChecked = carb.checked;
  let fatChecked = fat.checked;

  if (proteinChecked || carbChecked || fatChecked) {
    section.appendChild(infoDiv);
    section.appendChild(numForm);
    numForm.id = "numForm";
    if (proteinChecked) {
      const pInfo = document.createElement("span");
      pInfo.innerText = "Protein (minimum)";

      const pInput = makeInput("protein");
      numForm.appendChild(pInfo);
      numForm.appendChild(pInput);
    }

    if (carbChecked) {
      const cInfo = document.createElement("span");
      cInfo.innerText = "Carbs (minimum)";
      const cInput = makeInput("carbohydrate");
      numForm.appendChild(cInfo);
      numForm.appendChild(cInput);
    }
    if (fatChecked) {
      const fInfo = document.createElement("span");
      fInfo.innerText = "Fat (minimum)";
      const fInput = makeInput("fat");
      numForm.appendChild(fInfo);
      numForm.appendChild(fInput);
    }
    const goButton = document.createElement("button");
    goButton.type = "submit";
    goButton.innerText = "GO";
    numForm.appendChild(goButton);
    //numForm.action = "result.html";
  }
});

let cookSection = document.createElement("section");
cookSection.id = "cookSection";
main.appendChild(cookSection);
let ids = [];

numForm.addEventListener("submit", () => {
  let string = "";
  event.preventDefault();
  if (numForm.querySelector("#protein")) {
    const numOfProtein = numForm.querySelector("#protein").value;
    string += `minProtein=${numOfProtein}&`;
  }
  if (numForm.querySelector("#carbohydrate")) {
    const numOfCarbohydrate = numForm.querySelector("#carbohydrate").value;
    string += `minCarbs=${numOfCarbohydrate}&`;
  }
  if (numForm.querySelector("#fat")) {
    const numOfFat = numForm.querySelector("#fat").value;
    string += `minFat=${numOfFat}&`;
  }

  getCook(string).then((recipes) => {
    for (let i = 0; i < 3; i++) {
      let div = document.createElement("div");
      console.log(recipes[i].id);
      ids.push(recipes[i].id);
      //ids[i] = recipes[i].id;
      div.id = `no${i}-cook`;
      div.innerHTML = `<h3 class="propertyOfRecipe">${recipes[i].title}</h3>
      <img class="propertyOfRecipe" src="${recipes[i].image}"/>
      <span class="propertyOfRecipe">Calories:${recipes[i].calories} Protein: ${recipes[i].protein} Carbs: ${recipes[i].carbs} fat:${recipes[i].fat}</span>
     <button class="moreBtn">Show All</button>
      `;
      cookSection.appendChild(div);
    }
    for (let i = 0; i < 3; i++) {
      getRecipe(ids[i]).then((info) => {
        let span = document.createElement("span");
        span.id = "recipeInfo";
        if (info.instructions) {
          span.innerHTML = info.instructions;

          document.getElementById(`no${i}-cook`).appendChild(span);
        } else {
          span.innerText = "No Recipe";
          document.getElementById(`no${i}-cook`).appendChild(span);
        }
      });
    }
  });
  // setTimeout(() => {
  //   document.querySelectorAll("#recipeInfo").forEach((info) => {
  //     info.addEventListener("click", () => {
  //       console.log(info);
  //       info.classList.toggle("show-rest");
  //     });
  //   });
  // }, 10000);
  setTimeout(() => {
    let moreBtns = document.querySelectorAll(".moreBtn");
    moreBtns.forEach((moreBtn) => {
      moreBtn.addEventListener("click", () => {
        moreBtn.nextElementSibling.classList.toggle("show-rest");
      });
    });
  }, 5000);
});

// const infos = document.querySelectorAll("#recipeInfo");
// console.log(infos);
// infos.forEach((info) => {
//   info.addEventListener("mouseover", () => {
//     console.log(info);
//     info.classList.toggle("show-rest");
//   });
// });
function makeInput(nut) {
  const Input = document.createElement("input");
  Input.type = "number";
  Input.min = "0";
  Input.id = `${nut}`;
  Input.placeholder = `How much ${nut} you want?`;
  Input.required = true;
  return Input;
}
