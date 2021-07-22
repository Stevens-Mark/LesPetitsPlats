


import { recipes } from '../public/recipes.js';

// FUNCTION TO CREATE ALL THE RECIPES ON THE PAGE
  const CreateRecipes = (recipes) => {
   /* declare a place to put the recipes in the dom */
 const recipeElement = document.querySelector('#card-container');
   let recipehtml = '';

if (recipes.length < 1) {
   recipehtml += `<div class="text-center mt-5">Désolé, Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson ».</div>`;
   recipeElement.innerHTML = recipehtml;
   };

 recipes.forEach((recipe) => {
   /* Using DESTRUCTERING get just the ingredients arrays from recipes array */
   const { ingredients } = recipe;
   /*truncate recipe description text after 230 chararcters */
   if (recipe.description.length > 230) {
      recipe.description = recipe.description.substring(0, 230) + "...";};
     /*add recipe card to DOM */ 
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

const CreateListForDropdown = (recipes) => {
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
};

/*CHANGE PLACEHOLDER TEXT IN DROPDOWNS INPUT FIELD WHEN SELECTED

const ChangeInputtext = (id) => {
   const button = document.getElementById(id);
   if (!button.parentNode.nextElementSibling.classList.contains('show')) {
      document.getElementById(id).placeholder = "Rechercher des " +id;
   } else {
      document.getElementById(id).placeholder = id;
   }
};*/

// FUNCTION TO SEARCH FOR RELEVANT ITEMS IN THE DROPDOWN LISTS
// WHEN USER ENTERS A WORD IN THE INPUT FIELD

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
            if (txtValue.toUpperCase().indexOf(stringEntered) > -1) {
            list[i].style.display = "";
            } else {
            list[i].style.display = "none";
            }
         }
      }
   };

// EVENT LISTENERS ON DROPDOWN BUTTONS:
// CHANGES BUTTON WIDTH &
// CALLS SEARCH DROPDOWN LIST FUNCTION (ABOVE)

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
      }/* otherwise user hit input field */
      event.target.parentNode.parentNode.parentNode.classList.add('buttonExpand');
      if (event.target.parentNode.nextElementSibling.classList.contains('show')) {
         event.target.parentNode.parentNode.parentNode.classList.remove('buttonExpand');
      }
      DropdownTextListSearch(event.target.id,event.target.parentNode.nextElementSibling.id);
   });
   /* for keyboard users*/
   btn.addEventListener('keypress', (event) => {
      if (event.key === 'Enter' || event.key === 13) {
         btn.click();
      }
   });
});

// EVENT LISTENER: CLOSE ALL DROPDOWNS WHEN USER CLICKS OUTSIDE THE MENUS

/* OPEN/CLOSE THE DROPDOWN MENUS
const DropDownOpenClose = (event) =>{
   inputButtons.forEach((btn) => {
      if (btn.nextElementSibling.classList.contains('show')){
      ChangeInputtext(btn.firstElementChild.id,);
      }
     /* btn.nextElementSibling.classList.remove('show');
      btn.parentNode.classList.remove('dropDownExpand');

      if (event.target.parentNode.classList.contains('btn')){
      event.target.parentNode.parentNode.classList.add('dropDownExpand');
      }
   });
};
// EVENT LISTENER: CLOSE ALL DROPDOWNS WHEN USER CLICKS OUTSIDE THE MENUS
document.addEventListener('click', (event) => {
   DropDownOpenClose(event);
});
document.addEventListener('Keyup', (event) => {
   event.preventDefault();
   if (event.key === 'Enter' || event.key === 13) {
      DropDownOpenClose(event);
      document.click();
   }
});
*/
// EVENT LISTENER: CLOSE ALL DROPDOWNS WHEN USER CLICKS OUTSIDE THE MENUS


// EVENT LISTENERS ON ALL DROPDOWNS LIST "TAGS" 
// FOR SEARCHING RECIPES & THE TAG GENERATION

let tagListArray = [];
const LoadDropdownListeners = () => {
const tagList = document.querySelectorAll('.tags');
   
   tagList.forEach((item) => {
   item.addEventListener('click', (event) => {
      /* Make sure tag name is lowercase ready for search */
      const tagSelected = event.target.textContent.toLowerCase();
      /* get category type & generate tag icon when user chooses item from dropdown list */
      const tagType = event.target.getAttribute("data-category");
      /* if tag not already selected create a new tag */
     /* if (!tagListArray.includes(tagSelected)) { 
         tagListArray.push(tagSelected);}*/
      let obj = {itemSelected : tagSelected, itemType : tagType };
      tagListArray.push(obj);
      GenerateTag(tagSelected, tagType);
      FilterRecipes(tagListArray, recipes);
     
   });
   /* Event Listener (for keyboard) */
   item.addEventListener('keyup', (event) => {
      event.preventDefault();
      if (event.key === 'Enter' || event.key === 13) {
         event.preventDefault();
         item.click();
         /* refocus user on input field after choosing an item */
         let inputId = event.target.parentNode.previousElementSibling.firstElementChild.id;
         document.getElementById(inputId).focus();
      }
      /* close dropdown on "Escape" key 
      if (event.key === 'Escape' || event.key === 27) {
        /* DropDownOpenClose(event);
      }*/
   });
});
};

// GENERATE/DISPLAY THE TAGS ABOVE DROPDOWNS

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
   <p class="text-capitalize m-0 mx-1 p-2" data-category="${tagType}">${tagSelected}</p><i tabindex="0" class="tags__closeBtn far fa-times-circle p-1"></i></div>    
   `
   );
   // EVENT LISTENER ON TAG CLOSE BUTTON TO REMOVE DE-SELECTED TAG
   const tagSelectedIcon = document.querySelectorAll('.tags__closeBtn');
   tagSelectedIcon.forEach((icon) => {
      icon.addEventListener('click', (event) => {
         event.target.parentNode.remove();
         /* remove tag from taglist array (used to avoid duplicates) so a new tag can be made if needed 
         const index = tagListArray.indexOf(event.target.previousElementSibling.textContent);
         if (index !== -1) tagListArray.splice(index, 1);*/
    
        let tagIndex = tagListArray.map(function (img) { return img.itemSelected; }).indexOf(event.target.previousElementSibling.textContent);
         if (tagIndex !== -1) tagListArray.splice(tagIndex, 1);
         console.log('after delete');
         console.log(tagListArray);
         FilterRecipes(tagListArray, recipes);
        

      });
      /* same as above but for keyboard */
      icon.addEventListener('keyup', (event) => {
         if (event.key === 'Enter' || event.key === 13) {
         event.target.parentNode.remove();
        /* const index = tagListArray.indexOf(event.target.previousElementSibling.textContent);
         if (index !== -1) tagListArray.splice(index, 1)*/
         icon.click();
         }
      });
   });
};

// USED TO CLEAN TEXT (FOR SEARCHING)
const normalize = (text) => {
   return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
  };

/* SEARCH FILTER IN PROGRESS ?????????
/*let newArray = {...recipes};*/

const FilterRecipes = (tagListArray, tagSearchArray) => {
tagListArray.forEach((tagItem) => {
 
   switch (tagItem.itemType) {
   case 'ingredientTag' :
      tagSearchArray =  tagSearchArray.filter(x => x.ingredients.some(i => i.ingredient.toLowerCase() == tagItem.itemSelected)); 
   break;

   case 'applianceTag' :
      tagSearchArray =  tagSearchArray.filter(x => x.appliance.toLowerCase() === tagItem.itemSelected);
   break;

   case 'ustensilTag' :
      tagSearchArray  =  tagSearchArray.filter(x => x.ustensils.indexOf(tagItem.itemSelected) > -1);
   break;

   default :console.log('no tag of this type');
   }
});
console.log('tagSearchArray');
   console.log(tagSearchArray);
};

// MAIN SEARCH BAR INPUT

const searchNavigationInput = document.getElementById('searchNavigation');
searchNavigationInput.addEventListener("input", (event) => {
   let mainSearchArray =[];
   let NormalizedInput = normalize(event.target.value.trim());
   if (NormalizedInput.length < 1) { 
      /*let tes = recipes.filter(val => !tagSearchArray.includes(val));*/
      CreateRecipes(recipes);
      CreateListForDropdown(recipes);
      LoadDropdownListeners();
   }
   if (NormalizedInput.length > 2) {

   recipes.forEach((recipe) => {
      let NormalizedRecipeName = normalize(recipe.name);
      let NormalizedDescription = normalize(recipe.description);

      if (NormalizedRecipeName.includes(NormalizedInput) || NormalizedDescription.includes(NormalizedInput)) {
         mainSearchArray.push(recipe);
      }
      recipe.ingredients.forEach((item) => {
         let NormalizedIngredient = normalize(item.ingredient);
         if (NormalizedIngredient.includes(NormalizedInput)) {
            mainSearchArray.push(recipe);    
         }       
       });
      
   });
   const sortedMainSearchArray = [...new Set(mainSearchArray)].sort();
   CreateRecipes(sortedMainSearchArray);
   CreateListForDropdown(sortedMainSearchArray);
   LoadDropdownListeners();
   }
});

/*array1 = array1.filter(val => !array2.includes(val));

const test = () => {
   console.log(tagSearchArray);
   console.log(mainSearchArray);
   mainSearchArray = mainSearchArray.filter(val => !tagSearchArray.includes(val));
   console.log(mainSearchArray);
};*/

CreateRecipes(recipes);
CreateListForDropdown(recipes);
LoadDropdownListeners();