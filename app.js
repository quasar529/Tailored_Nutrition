async function getCook(string) {
  try {
    let results = await fetch(
      `https://api.spoonacular.com/recipes/findByNutrients?apiKey=9ef8ed83e4164a2eb14cf5bff7669c9a&${string}&random&number=5`
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

    let data = recipe.json();
    return data;

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
window.addEventListener("DOMContentLoaded", () => {
  getRecipe(4632).then((recipe) => {
    console.log(recipe.instructions);
  });
});
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

numForm.addEventListener("submit", () => {
  console.log(numForm);
  let string = "";
  event.preventDefault();
  if (numForm.querySelector("#protein")) {
    const numOfProtein = numForm.querySelector("#protein").value;
    string += `minProtein=${numOfProtein}&`;
    console.log(numOfProtein);
  }
  if (numForm.querySelector("#carbohydrate")) {
    const numOfCarbohydrate = numForm.querySelector("#carbohydrate").value;
    string += `minCarbs=${numOfCarbohydrate}&`;
  }
  if (numForm.querySelector("#fat")) {
    const numOfFat = numForm.querySelector("#fat").value;
    string += `minFat=${numOfFat}&`;
  }
  console.log(string);
  let ids = [];

  getCook(string).then((recipes) => {
    for (let i = 0; i < 5; i++) {
      let div = document.createElement("div");
      ids[i] = recipes[i].id;
      div.id = `no${i}-cook`;
      div.innerHTML = `<h3 class="propertyOfRecipe">${recipes[i].title}</h3>
      <img class="propertyOfRecipe" src="${recipes[i].image}"/>
      <span class="propertyOfRecipe">Calories:${recipes[i].calories} Protein: ${recipes[i].protein} Carbs: ${recipes[i].carbs} fat:${recipes[i].fat}</span>
     `;

      cookSection.appendChild(div);
    }
  });

  for (let i = 0; i < 5; i++) {
    let id = ids[i];
    getRecipe(id).then((info) => {
      console.log(info);

      let span = document.createElement("span");
      span.innerText = info.instructions;
      console.log(span);

      //document.getElementById(`no${i}-cook`).appendChild(span);
    });
  }
});

function makeInput(nut) {
  const Input = document.createElement("input");
  Input.type = "number";
  Input.min = "0";
  Input.id = `${nut}`;
  Input.placeholder = `How much ${nut} you want?`;
  Input.required = true;
  return Input;
}
