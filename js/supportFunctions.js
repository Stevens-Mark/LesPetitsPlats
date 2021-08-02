import { recipes } from '../public/recipes.js';

// FUNCTION TO CLEAN TEXT (REMOVE ACCENTS ETC) READY FOR SEARCH
const normalize = (text) => {
    return text
     .normalize('NFD')
     .replace(/[\u0300-\u036f]/g, '')
     .toLowerCase();
   };

// FUNCTION TO DISPLAY THE RELEVANT ITEMS IN THE DROPDOWN LISTS INGREDIENTS,
// APPLIANCE OR USTENSILS WHEN USER ENTERS A WORD IN THE INPUT FIELD

const DropdownTextListSearch = (category, categoryListId) => {
  const filter = document.getElementById(category);
  if (typeof filter.addEventListener != "undefined") {
  filter.addEventListener("keyup", function() {
  FilterFunction();
     });
  };
  const FilterFunction = () => {
     let input,stringEntered, list, i;
     input = document.getElementById(category);
     stringEntered = input.value.toUpperCase().trim();
     const div = document.getElementById(categoryListId);
     list = div.getElementsByTagName("li");
     for (i = 0; i < list.length; i++) {
        let txtValue = list[i].textContent || list[i].innerText;
        if (txtValue.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().indexOf(stringEntered) > -1) {
        list[i].style.display = "";
        } else {
        list[i].style.display = "none";
        }
     }
  }
};
     
// NO RECIPE ERROR MESSAGE

const noRecipeMessage = () => {
  const recipeElement = document.querySelector('#card-container');
  recipeElement.insertAdjacentHTML("afterbegin",  `<div id="norecipes" class="text-center mt-5">Désolé, Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson ».</div>`);  
};

// NO ITEMS LEFT TO CHOOSE FROM ERROR MESSAGE

const noItemMessage = (id) => {
   const  dropdownElement = document.querySelector(id);
   dropdownElement.insertAdjacentHTML("afterbegin",  `<div class="no-items text-center text-white">Il n'y a plus d'articles à choisir...</div>`);  
   };

// CHECK IF NO ITEMS LEFT TO CHOOSE FROM IN DROPDOWN MENUS
// & DISPLAY MESSAGE IF THZERE ARE NONE LEFT... 

const isItemLeft = () => {
   /*remove no items left error message & replace if needed after tests below*/
   let noItemErrorMessage = document.querySelectorAll('.no-items');
   if (noItemErrorMessage) { 
      noItemErrorMessage.forEach((message) =>{
         message.remove();
      });
   }
   /*check whether all ingredients have been used , ie none left to choose*/
   const ingNodeList = document.querySelectorAll("[data-category ='ingredientTag']");
   const ingNodeSameClass = document.getElementById('ingredientSearch').getElementsByClassName('hide');
   if (ingNodeList.length === ingNodeSameClass.length) { 
      noItemMessage('#ingredientSearch'); 
   }   
   /*check whether all appliances have been used , ie none left to choose*/
   const appNodeList = document.querySelectorAll("[data-category ='applianceTag']");
   const appNodeSameClass = document.getElementById('applianceSearch').getElementsByClassName('hide');
   if (appNodeList.length === appNodeSameClass.length) { 
      noItemMessage('#applianceSearch'); 
   }
   /*check whether all ustensils have been used , ie none left to choose*/
   const ustNodeList = document.querySelectorAll("[data-category ='ustensilTag']");
   const ustNodesSameClass = document.getElementById('ustensilSearch').getElementsByClassName('hide');
   if (ustNodeList.length === ustNodesSameClass.length) {
      noItemMessage('#ustensilSearch');
   }   
};

// REMOVE INGREDIENTS ALREADY SELECTED FROM THE DROPDOWN MENUS (avoids duplicate tags)

const RemoveDuplicates = () => {
   const tagAlreadySelectedList = document.querySelectorAll('.tags__selected');
   const tagList = document.querySelectorAll('.tags');
   tagAlreadySelectedList.forEach((tag) => {
         tagList.forEach((item) => {
           if (item.innerHTML === tag.textContent.trim()) {
            item.classList.add("hide");
           }
         });
   });
   isItemLeft();
 };

// UPDATE DROPDOWN LISTS 

const updateDropdownList = (recipesLeftArray) => {
  const tagList = document.querySelectorAll('.tags');
  tagList.forEach((item) => {
     item.classList.add('hide');
   });
  tagList.forEach((tag) => {
     let normalizedTag = normalize(tag.innerHTML);
      recipesLeftArray.forEach((recipe) => {
        recipe.ingredients.forEach((items) => {
           let NormalizedIngredient = normalize(items.ingredient);
        if (normalizedTag === NormalizedIngredient) {
           tag.classList.remove("hide");
         } 
        });
        let Normalizedappliance = normalize(recipe.appliance);
        if (normalizedTag === Normalizedappliance) {
           tag.classList.remove("hide");
         }  
        if (recipe.ustensils.includes(normalizedTag)) {
           tag.classList.remove("hide");
        } 
     });
  });
  RemoveDuplicates();
};

// DISPLAYS RECIPES

const DisplayRecipe = (RecipeArray) => {
  const allRecipes = document.getElementsByTagName('article');
  for (let i = 0; i < recipes.length; i++) {
     let showRecipe = false;
     RecipeArray.forEach((item) => {
        if (recipes[i].name == item.name) {  
           showRecipe = true;
           }
     });
     if (showRecipe) {
        allRecipes[i].style.display = 'flex';
     } else {
        allRecipes[i].style.display = 'none';
     }
  } 
};
 
export { normalize, DropdownTextListSearch, noRecipeMessage, updateDropdownList, DisplayRecipe };