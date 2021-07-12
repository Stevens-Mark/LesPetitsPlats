

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