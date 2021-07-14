

import { recipes } from '../public/recipes.js';

// GENERATE EACH SEARCH LIST IN EACH DROPDOWN
const createSearchArticles = (id, list) => {
   const ListElement = document.querySelector(id);
   let Listshtml = '';
   list.forEach((item) => {
      Listshtml +=
      `<li role="option" tabindex="0" class="tags list-unstyled d-inline-block text-truncate px-1 m-0" arial-label="${item}">${item}</li>`;
      ListElement.innerHTML = Listshtml;
   });
};

// EXTRACT & SORT INGREDIENTS, APPLIANCES & USTENSILS FROM ARRAY &
// CALL FUNCTION (ABOVE) TO CREATE EACH DROPDOWN

// get list of ingredients from recipes array
let allIngredientsList =[];
recipes.forEach((recipe) => {
   recipe.ingredients.forEach((items) => {
    allIngredientsList.push(items.ingredient.toLowerCase());
   });
});
const sortedIngredientsList = [...new Set(allIngredientsList)].sort();
createSearchArticles('#ingredientSearch', sortedIngredientsList);

// get list of appliances from recipes array
let allAppliancesList =[];
recipes.forEach((recipe) => {
    allAppliancesList.push(recipe.appliance.toLowerCase());
});
const sortedAppliancesList = [...new Set(allAppliancesList)].sort();
createSearchArticles('#applianceSearch', sortedAppliancesList);

// get list of ustensils from recipes array
let allUstensilsList =[];
recipes.forEach((recipe) => {
   recipe.ustensils.forEach((items) => {
    allUstensilsList.push(items.toLowerCase());
   });
});
const sortedUstensilsList = [...new Set(allUstensilsList)].sort();
createSearchArticles('#ustensilSearch', sortedUstensilsList);

// EVENT LISTENERS ON ALL DROPDOWNS "TAGS" FOR SEARCHING

const tagList = document.querySelectorAll('.tags');
   tagList.forEach((item) => {
   item.addEventListener('click', (event) => {
      /* Make sure tag name is lowercase ready for search */
      const tagSelected = event.target.textContent.toLowerCase();
      console.log(tagSelected);
   });
   /* Event Listener (for keyboard) for the like feature */
   item.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
         /*  Make sure tag name is lowercase readt for search */
         const tagSelected = event.target.textContent.toLowerCase();
         console.log(tagSelected);
      }
   });
});

// CHANGE PLACEHOLDER TEXT IN DROPDOWNS WHEN SELECTED

const changeInputtext = (id, item) => {
   const button = document.getElementById(id);
   if (button.parentNode.classList.contains('collapsed')) {
      document.getElementById(id).placeholder = "Rechercher des " +item;
   } else {
      document.getElementById(id).placeholder = item;
   }
};


const inputButtons = document.querySelectorAll('.btn');
inputButtons.forEach((btn) => {
   btn.addEventListener('click', (event) => {
      changeInputtext(event.target.id, event.target.id);
      console.log(event.target.id);
      event.target.parentNode.parentNode.classList.toggle('dropDownExpand');
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


  // FUNCTION TO CREATE ALL THE RECIPES ON THE PAGE
  const CreateRecipes = (recipes) => {
     /* declare a place to put the recipes in the dom */
   const recipeElement = document.querySelector('#card-container');
     let recipehtml = '';
 
   recipes.forEach((recipe) => {
     /* Using DESTRUCTERING get just the tag array from photographers array */
     const { ingredients } = recipe;
      recipehtml += `
   <div class="col-12 col-md-6 col-lg-4 mb-4">
      <div class="card bg-light h-100">
         <img class="card-img-top card__image" src="./public/images/photos/${recipe.name}.jpg" height="178" alt="${recipe.name}">
         <div class="card-body bg-light">
            <div class="card__heading d-flex justify-content-between align-items-baseline">
               <h2 tabindex="0" class="card__title">${recipe.name}</h2>
               <div class="card__timing text-nowrap">
                  <i class="far fa-clock mx-1"></i><span tabindex="0" mx-1>${recipe.time} min</span>
               </div>
            </div>
         
            <div class="card__information row">
               <ul class="col-6"> ${ingredients.map((ingredient) => 
                  `<li tabindex="0" class="list-unstyled"><span class="card__ingredient">${ingredient.ingredient}</span> : 
                        ${(() => {
                              if(ingredient.quantity) { return `${ingredient.quantity}`;
                              } else { return ``; }
                           })()
                        }
                           ${(() => {
                                 if(ingredient.unit) { return `${ingredient.unit}`;
                                 } else { return ``; }
                              })()
                           }
                  </li>`).join('')}
               </ul>
               <div tabindex="0" class="card__description col-6">${recipe.description}</div>
            </div>         
         </div>
      </div>
   </div>`;
     recipeElement.innerHTML = recipehtml;
     /* see sources P7 for if statements inside template literals*/
   });
  }
CreateRecipes(recipes);
