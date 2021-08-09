
import { recipes } from '../public/recipes.js';
import  { normalize, 
   DropdownTextListSearch, 
   noRecipeMessage, 
   updateDropdownList, 
   DisplayRecipe } from './supportFunctions.js';

// FUNCTION TO CREATE ALL THE RECIPES ON THE PAGE

const CreateRecipes = (recipes) => {
   /* declare a place to put the recipes in the dom */
 const recipeElement = document.querySelector('#card-container');
   let recipehtml = '';

 recipes.forEach((recipe) => {
   /* Using DESTRUCTERING get just the ingredients arrays from recipes array */
   const { ingredients } = recipe;
   /*truncate recipe description text after 230 chararcters */
   if (recipe.description.length > 230) {
      recipe.description = recipe.description.substring(0, 230) + "...";};
     /*add recipe card to DOM */ 
    recipehtml += `
 <article class="col-12 col-md-6 col-lg-4 mb-4">
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
 </article>`;
   recipeElement.innerHTML = recipehtml;
 });
}

// GENERATE EACH SEARCH LIST IN EACH DROPDOWN

const createSearchArticles = (id, list, tagType) => {
   const ListElement = document.querySelector(id);
   let Listshtml = '';
   list.forEach((item) => {
      Listshtml +=
      `<li role="option" tabindex="0" class="tags col-6 col-md-3 col-lg-4 list-unstyled text-capitalize text-white text-truncate px-2 m-0" data-category="${tagType}" arial-label="${item}">${item}</li>`;
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
/* remove duplicate entries using "set" & order the list */
const sortedIngredientsList = [...new Set(allIngredientsList)].sort();
createSearchArticles('#ingredientSearch', sortedIngredientsList, 'ingredientTag');

// get list of appliances from recipes array
let allAppliancesList =[];
recipes.forEach((recipe) => {
    allAppliancesList.push(recipe.appliance.toLowerCase());
});
/* remove duplicate entries using "set" & order the list */
const sortedAppliancesList = [...new Set(allAppliancesList)].sort();
createSearchArticles('#applianceSearch', sortedAppliancesList, 'applianceTag');

// get list of ustensils from recipes array
let allUstensilsList =[];
recipes.forEach((recipe) => {
   recipe.ustensils.forEach((items) => {
    allUstensilsList.push(items.toLowerCase());
   });
});
/* remove duplicate entries using "set" & order the list */
const sortedUstensilsList = [...new Set(allUstensilsList)].sort();
createSearchArticles('#ustensilSearch', sortedUstensilsList,  'ustensilTag');

CreateRecipes(recipes);

// EVENT LISTENERS ON DROPDOWN BUTTONS:
// CHANGES BUTTON WIDTH &
// CALLS SEARCH DROPDOWN LIST FUNCTION 

const inputButtons = document.querySelectorAll('.btn');
inputButtons.forEach((btn) => {
   btn.addEventListener('click', (event) => {
      event.preventDefault();
      inputButtons.forEach((btn) => {
          btn.parentNode.parentNode.classList.remove('buttonExpand');
       });
       /* if user hit button */
      if (event.target.classList.contains('btn'))  { 
      event.target.parentNode.parentNode.classList.add('buttonExpand'); 
      if (event.target.nextElementSibling.classList.contains('show')) {
         event.target.parentNode.parentNode.classList.remove('buttonExpand');
      }
      DropdownTextListSearch(event.target.firstElementChild.id, event.target.nextElementSibling.id);
      return;   
      } /* otherwise user hit input field */
      event.target.parentNode.parentNode.parentNode.classList.add('buttonExpand');
      if (event.target.parentNode.nextElementSibling.classList.contains('show')) {
         event.target.parentNode.parentNode.parentNode.classList.remove('buttonExpand');
      }
      DropdownTextListSearch(event.target.id,event.target.parentNode.nextElementSibling.id);
   });
   // SAME AS ABOVE (FOR KEYBOARD USERS)
   btn.addEventListener('keypress', (event) => {
      if (event.key === 'Enter' || event.key === 13) {
         btn.click();
      }
   });
});

// EVENT LISTENERS ON ALL DROPDOWNS LIST "TAGS" FOR SEARCHING THE
// RECIPES & ALSO CALLS THE FUNCTION WHICH GENERATES THE TAGS
// OVER THE DROPDOWNS 

const tagList = document.querySelectorAll('.tags');
let tagListArray = [];
   tagList.forEach((item) => {
   item.addEventListener('click', (event) => {
      /* Make sure tag name is lowercase ready for search */
      const tagSelected = event.target.textContent;
      /* get category type for determining color of tag icon when user chooses item from dropdown list */
      const tagType = event.target.getAttribute("data-category");
      let obj = {itemSelected : tagSelected, itemType : tagType };   
      tagListArray.push(obj);
      /* generate tag over dropdown*/
      GenerateTag(tagSelected, tagType);
      /* filter recipes using either full list or edited list of recipes: depends if user has already entered keyword in main search bar*/
      if (sortedrecipesLeftArray.length < 1) {
         FilterRecipes(tagListArray, recipes);
      } else {
         FilterRecipes(tagListArray, sortedrecipesLeftArray);
      }
   });
   // SAME AS ABOVE (FOR KEYBOARD USERS)
   item.addEventListener('keyup', (event) => {
      event.preventDefault();
      if (event.key === 'Enter' || event.key === 13) {
         event.preventDefault();
         item.click();
         /* refocus user on input field after choosing an item */
         let inputId = event.target.parentNode.previousElementSibling.firstElementChild.id;
         document.getElementById(inputId).focus();
      }
   });
});

// GENERATE/DISPLAY THE TAGS ABOVE DROPDOWNS
// FILTER RECIPES BY TAG (PART OF ADVANCED SEARCH)

const GenerateTag = (tagSelected, tagType) => {
   /* declare a place to put the tag selected icon in the DOM */
   const tagElements = document.getElementById('tags-container');
   let bgColor;
   /* set tag colour according to tag type */
   switch (tagType){
      case 'ingredientTag': bgColor ='info'; break;
      case 'applianceTag' : bgColor ='success'; break;
      case 'ustensilTag' : bgColor ='danger'; break;
      default: console.log('no color set');
      };
   tagElements.insertAdjacentHTML("afterbegin",
   `<div class="tags__selected bg-${bgColor} d-flex align-items-baseline rounded text-white m-1">
   <p class="text-capitalize m-0 mx-1 p-2">${tagSelected}</p><i tabindex="0" class="tags__closeBtn far fa-times-circle p-1"></i></div>    
   `
   );
   // remove button width after tag selection
   inputButtons.forEach((btn) => {
      btn.parentNode.parentNode.classList.remove('buttonExpand');
   });

   // EVENT LISTENER ON TAG CLOSE BUTTON TO REMOVE DE-SELECTED TAG
   const tagSelectedIcon = document.querySelectorAll('.tags__closeBtn');
   tagSelectedIcon.forEach((icon) => {
      icon.addEventListener('click', (event) => {
         event.target.parentNode.remove();
         let tagToRemove = event.target.previousElementSibling.textContent;
         /*find the index of the chosen tag to delete & remove from the tagList array */
        let tagIndex = tagListArray.map(function (item) { return item.itemSelected; }).indexOf(tagToRemove);
         if (tagIndex !== -1) tagListArray.splice(tagIndex, 1);
         /* filter recipes using either full list or edited list of recipes: depends if user has already entered keyword in main search bar*/
         if (sortedrecipesLeftArray.length < 1) {
            FilterRecipes(tagListArray, recipes);
            } else {
               FilterRecipes(tagListArray, sortedrecipesLeftArray);

            }      
      });
      // SAME AS ABOVE BUT FOR KEYBOARD USERS
      icon.addEventListener('keyup', (event) => {
         if (event.key === 'Enter' || event.key === 13) {
         event.target.parentNode.remove();
         icon.click();
         }
      });
   });
};

// SEARCH FILTER (ADVANCED)
// CAN BE USED TO FILTER BY TAG ONLY
// OR BY MAIN FILTER & TAGS TOGETHER

const FilterRecipes = (tagListArray, RecipeArray) => {
   /*if no recipe error message displayed, remove it */
   let errorMessage = document.querySelector('#norecipes');
   if (errorMessage) { 
      errorMessage.remove();
   }
tagListArray.forEach((tagItem) => {
   console.log(tagItem.itemSelected);
   switch (tagItem.itemType) {
   case 'ingredientTag' :
      RecipeArray =  RecipeArray.filter(recipe => recipe.ingredients.some(i => i.ingredient.toLowerCase() === tagItem.itemSelected)); 
   break;

   case 'applianceTag' :
      RecipeArray =  RecipeArray.filter(recipe => recipe.appliance.toLowerCase() === tagItem.itemSelected);
   break;

   case 'ustensilTag' :
      /*const name = tagItem.itemSelected;
      const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);*/
      RecipeArray  =  RecipeArray.filter(recipe => recipe.ustensils.indexOf(tagItem.itemSelected) > -1);
   break;

   default :console.log('no tag of this type');
   }
});
/*if no recipes left display error message*/
if (RecipeArray.length < 1) {
   noRecipeMessage();
};
/*update dropdown & display recipes*/
   updateDropdownList(RecipeArray);
   DisplayRecipe(RecipeArray);
   console.log(RecipeArray);
};

// MAIN SEARCH BAR INPUT

const searchNavigationInput = document.getElementById('searchNavigation');
let sortedrecipesLeftArray = [];
searchNavigationInput.addEventListener("input", (event) => {
   /* clean input data (remove accents etc) */
   let NormalizedInput = normalize(event.target.value.trim());
   /*if no recipe error message displayed then remove it */
   let errorMessage = document.querySelector('#norecipes');
   if (errorMessage) { 
      errorMessage.remove();
   }

// START SEARCH IF THREE OR MORE LETTERS ENTERED
   if (NormalizedInput.length > 2) {
      // start of code speed test
      console.time();
      // MAIN SEARCH ALGO: clean recipe title, description & ingredients & check against user input
      sortedrecipesLeftArray = recipes.filter(recipe => normalize(recipe.name).includes(NormalizedInput) || 
           normalize(recipe.description).includes(NormalizedInput) ||
           recipe.ingredients.some(i => normalize(i.ingredient).includes(NormalizedInput)));
      // end of code speed test     
      console.timeEnd();
      // if no recipes left display error message
      if (sortedrecipesLeftArray.length < 1) {
         noRecipeMessage();
      }
   }
      //  IF LESS THAN THREE LETTERS INPUT BY USER THEN RESET
      if (NormalizedInput.length < 3) {
         /* reset array*/
         sortedrecipesLeftArray = recipes;
   }
   // if no tags selected pass straight to display recipes
   if (tagListArray.length  < 1) {
      updateDropdownList(sortedrecipesLeftArray);
      DisplayRecipe(sortedrecipesLeftArray);
      console.log(sortedrecipesLeftArray);
   } else {
   // otherwise Send for further filtering with tags
   FilterRecipes(tagListArray, sortedrecipesLeftArray);
   }
});

// RESET SEARCH

const resetButton = document.getElementById('resetSearch');
resetButton.addEventListener('click', () => {
   // Reset arrays
   sortedrecipesLeftArray = recipes;
   tagListArray = [];
   // Reset main input
   document.getElementById('searchNavigation').value ='';
   // Reset recipes displayed
   DisplayRecipe(recipes) ;
   //Reset tags selected above dropdown
   const tagElements = document.getElementById('tags-container');
   tagElements.innerHTML ='';
   // Reset dropdown menus
      const tagList = document.querySelectorAll('.tags');
      tagList.forEach((item) => {
         item.classList.remove('hide');
      });
   // Reset error messages
   let errorMessage = document.querySelector('#norecipes');
   if (errorMessage) { 
      errorMessage.remove();
   }
   let noItemErrorMessage = document.querySelectorAll('.no-items');
   if (noItemErrorMessage) { 
      noItemErrorMessage.forEach((message) =>{
         message.remove();
      });
   }
});
   // SAME AS ABOVE (FOR KEYBOARD USERS)
   resetButton.addEventListener('keypress', (event) => {
      if (event.key === 'Enter' || event.key === 13) {
         resetButton.click();
      }
   });

/*array1 = array1.filter(val => !array2.includes(val));*/

