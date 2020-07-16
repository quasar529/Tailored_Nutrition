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

async function getCook() {
  try {
    let typeOfNut = "";
    for (let i = 0; i < arguments.length; i++) {
      typeOfNut += arguments[i];
    }
    let results = await fetch(
      `https://api.spoonacular.com/recipes/findByNutrients?apiKey=9ef8ed83e4164a2eb14cf5bff7669c9a&${typeOfNut}&random&number=10`
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

const form = document.getElementById("ingredientForm");
console.log(form);
const section = document.querySelector(".ingredient-form");
const submitBtn = document.querySelector("#submitBtn");

const numForm = document.createElement("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  submitBtn.disabled = true;
  let allIngredients = document.getElementsByName("ingredient");
  const protein = allIngredients[0];
  const carb = allIngredients[1];
  const fat = allIngredients[2];
  let proteinChecked = protein.checked;
  let carbChecked = carb.checked;
  let fatChecked = fat.checked;

  if (proteinChecked || carbChecked || fatChecked) {
    section.appendChild(numForm);
    if (proteinChecked) {
      const pInput = makeInput("Protein");
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
numForm.addEventListener("submit", () => {
  event.preventDefault();
  const numOfProtein = console.log(numForm.firstChild.value);
});

function makeInput(nut) {
  const Input = document.createElement("input");
  Input.type = "number";
  Input.min = "0";
  Input.placeholder = `How much ${nut} you want?`;
  Input.required = true;
  return Input;
}
