

import { recipes } from '../public/recipes.js';

// get list of ingredients
let allIngredientsList =[];
recipes.forEach((recipe) => {
   recipe.ingredients.forEach((items) => {
    allIngredientsList.push(items.ingredient.toLowerCase());
   });
});
const sortedIngredientsList = [...new Set(allIngredientsList)].sort();
console.log(sortedIngredientsList);

// get list of appliances
let allAppliancesList =[];
recipes.forEach((recipe) => {
    allAppliancesList.push(recipe.appliance.toLowerCase());
});
const sortedAppliancesList = [...new Set(allAppliancesList)].sort();
console.log(sortedAppliancesList);

// get list of ustensils
let allUstensilsList =[];
recipes.forEach((recipe) => {
   recipe.ustensils.forEach((items) => {
    allUstensilsList.push(items.toLowerCase());
   });
});
const sortedUstensilsList = [...new Set(allUstensilsList)].sort();
console.log(sortedUstensilsList);


// change text in input field

const changeInputtext = (id, item) => {
   const button = document.getElementById(id);
   if (button.parentNode.classList.contains('collapsed')) {
      document.getElementById(id).placeholder = "Rechercher des " + item;
      
   } else {
      document.getElementById(id).placeholder = item;
   }
};


const inputButtons = document.querySelectorAll('.btn');
inputButtons.forEach((btn) => {
   btn.addEventListener('click', (event) => {
      changeInputtext(event.target.id, event.target.id);
      console.log(event.target.id);
      event.target.parentNode.parentNode.classList.toggle('recette');
      /*OptionSelected(event);*/  
   });
});


/*
const downdropToggle = (event) => {
   console.log(event.target);
inputButtons.forEach((btn) => {
   if (!btn.classList.contains('collapsed')) {
      btn.parentNode.classList.remove("col-lg-2");
      btn.parentNode.classList.add("col-lg-6");
   } else {
      btn.parentNode.classList.remove("col-lg-6");
      btn.parentNode.classList.add("col-lg-2");
   }
})
/*

  // WHEN USER MAKES A CHOICE IN DROPDOWN MENU
  const allOptionChoices = document.querySelectorAll('.btn'); /* sets array of all Button elements 
  const OptionSelected = (event) => {

    const optionChosen = event.target;
    console.log(event.target);
    if (!optionChosen) return;

    allOptionChoices.forEach((element) => element.nextElementSibling.classList.remove('show'));
    allOptionChoices.forEach((element) => element.classList.add('test'));

    /* Now for the chosen option: set aria selected & selected class to highlight chosen choice 
    optionChosen.classList.add('show');
    optionChosen.parentNode.classList.add('collapsed');
  };*/

  const CreateRecipes = (recipes) => {
     /* declare a place to put the recipes in the dom */
   const recipeElement = document.querySelector('#card-container');
     let recipehtml = '';
 
   recipes.forEach((recipe) => {
     /* Using DESTRUCTERING get just the tag array from photographers array */
     const { ingredients } = recipe;
     console.log(ingredients);
     recipehtml += `
     <div class="col-12 col-md-6 col-lg-4 mb-4">
     <div class="card bg-light h-100">
       <img class="card-img-top card__image" src="/public/images/logo/poulet_coco.jpg" height="178" alt="poulet_coco">
       <div class="card-body bg-light">
         <div class="card__heading d-flex">
           <h2 class="card__title">${recipe.name}</h2>
           <div class="card__timing">
             <i class="far fa-clock  mx-1"></i><span mx-1>${recipe.time} min</span>
           </div>
         </div>
        
         <div class="card__information row">
           <ul class="col-6"> ${ingredients.map((ingredient) => `<li tabindex="0" class="list-unstyled"><span class="card__ingredient">${ingredient.ingredient}</span> : ${ingredient.quantity} ${ingredient.unit}</li>`).join('')}
           </ul>
         <div class="card__description col-6">${recipe.description}</div>
         </div>
        
       </div>
     </div>
   </div>`;
     recipeElement.innerHTML = recipehtml;
     /* map & join etc solution found in sources folder */
   });
  }

  CreateRecipes(recipes);

  