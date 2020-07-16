// class Recipes {
//   async tmpGet() {
//     try {
//       let results = await fetch(
//         "https://api.spoonacular.com/recipes/findByNutrients?apiKey=9ef8ed83e4164a2eb14cf5bff7669c9a&minProtein=100&random&number=5"
//       );
//       let tmp = await results.json();

//       return tmp;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }

async function getCook(string) {
  try {
    // let typeOfNut = "";
    // for (let i = 0; i < arguments.length; i++) {
    //   typeOfNut += arguments[i];
    // }
    let results = await fetch(
      `https://api.spoonacular.com/recipes/findByNutrients?apiKey=9ef8ed83e4164a2eb14cf5bff7669c9a&${string}&random&number=5`
    );
    let data = await results.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// document.addEventListener("DOMContentLoaded", () => {
//   const temp = new Recipes();
//   temp.tmpGet().then((cook) => {
//     // let img = cook.image;
//     // let inst = cook.instructions;
//     // let title = cook.title;
//     // console.log(img, inst, title);
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
  infoDiv.innerText = "Type minimum amount of each nutrient";
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
      const pInput = makeInput("protein");
      numForm.appendChild(pInput);
    }

    if (carbChecked) {
      const cInput = makeInput("carbohydrate");
      numForm.appendChild(cInput);
    }
    if (fatChecked) {
      const fInput = makeInput("fat");
      numForm.appendChild(fInput);
    }
    const button = document.createElement("button");
    button.type = "submit";
    button.innerText = "GO";
    numForm.appendChild(button);
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

  getCook(string).then((recipes) => {
    for (let i = 0; i < 5; i++) {
      let div = document.createElement("div");
      div.innerHTML = `<h3>${recipes[i].title}</h3>
      <img src="${recipes[i].image}"/>
      <span>Calories:${recipes[i].calories} Protein: ${recipes[i].protein} Carbs: ${recipes[i].carbs} fat:${recipes[i].fat}</span>
      `;
      console.log(div);

      cookSection.appendChild(div);
    }
  });
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
