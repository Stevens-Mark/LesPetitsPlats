


import { recipes } from '../public/recipes.js';

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

// GENERATE EACH SEARCH LIST IN EACH DROPDOWN
const createSearchArticles = (id, list, tagType) => {
   const ListElement = document.querySelector(id);
   let Listshtml = '';
   list.forEach((item) => {
      Listshtml +=
      `<li role="option" tabindex="0" class="tags col-6 col-md-3 col-lg-4 list-unstyled text-capitalize text-truncate px-2 m-0" data-category="${tagType}" arial-label="${item}">${item}</li>`;
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
createSearchArticles('#ingredientSearch', sortedIngredientsList, 'ingredientTag');

// get list of appliances from recipes array
let allAppliancesList =[];
recipes.forEach((recipe) => {
    allAppliancesList.push(recipe.appliance.toLowerCase());
});
const sortedAppliancesList = [...new Set(allAppliancesList)].sort();
createSearchArticles('#applianceSearch', sortedAppliancesList, 'applianceTag');

// get list of ustensils from recipes array
let allUstensilsList =[];
recipes.forEach((recipe) => {
   recipe.ustensils.forEach((items) => {
    allUstensilsList.push(items.toLowerCase());
   });
});
const sortedUstensilsList = [...new Set(allUstensilsList)].sort();
createSearchArticles('#ustensilSearch', sortedUstensilsList,  'ustensilTag');

 // FUNCTION TO SEARCH FOR RELEVANT ITEMS IN THE DROPDOWN
 // LISTS WHEN USER ENTERS A WORD IN THE INPUT FIELD

 const DropdownTextListSearch = (category, categoryListId) => {
   const filter = document.getElementById(category);
  if (typeof filter.addEventListener != "undefined") {
    filter.addEventListener("keyup", function() {
     FilterFunction();
      });
    };
  
  const FilterFunction = () => {
    let input, filter, list, i;
    input = document.getElementById(category);
    filter = input.value.toUpperCase().trim();
    const div = document.getElementById(categoryListId);
    list = div.getElementsByTagName("li");
    for (i = 0; i < list.length; i++) {
      let txtValue = list[i].textContent || list[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        list[i].style.display = "";
      } else {
        list[i].style.display = "none";
      }
    }
  }
  };
  DropdownTextListSearch('Ingredients','ingredientList');
  DropdownTextListSearch('Appliances','applianceList');
  DropdownTextListSearch('Ustensils','ustensilsList');

// CHANGE PLACEHOLDER TEXT IN DROPDOWNS INPUT FIELD WHEN SELECTED
const ChangeInputtext = (id) => {
   const button = document.getElementById(id);
   if (!button.parentNode.nextElementSibling.classList.contains('show')) {
      document.getElementById(id).placeholder = "Rechercher des " +id;
   } else {
      document.getElementById(id).placeholder = id;
   }
};

// EVENT LISTENERS ON DROPDOWN BUTTONS
const inputButtons = document.querySelectorAll('.btn');
inputButtons.forEach((btn) => {
   btn.addEventListener('click', (event) => {
      if (event.target.classList.contains('btn')) return;
      event.target.parentNode.parentNode.classList.toggle('dropDownExpand');
      ChangeInputtext(event.target.id);
   /*   DropdownTextListSearch(event.target.id,event.target.parentNode.nextElementSibling.id);*/
   });
   btn.addEventListener('keypress', (event) => {
      if (event.key === 'Enter' || event.key === 13) {
         if (event.target.classList.contains('btn')) return;   
         ChangeInputtext(event.target.id);
         btn.click();
         event.target.parentNode.parentNode.classList.toggle('dropDownExpand');
      }
   });
});

const DropDownOpenClose = (event) =>{
   inputButtons.forEach((btn) => {
      if (btn.nextElementSibling.classList.contains('show')){
      ChangeInputtext(btn.firstElementChild.id,);
      }
      btn.nextElementSibling.classList.remove('show');
      btn.parentNode.classList.remove('dropDownExpand');

      if (event.target.parentNode.classList.contains('btn')){
      event.target.parentNode.parentNode.classList.add('dropDownExpand');
      }
   });
};

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

// EVENT LISTENERS ON ALL DROPDOWNS LIST "TAGS" FOR SEARCHING RECIPES

const tagList = document.querySelectorAll('.tags');
   tagList.forEach((item) => {
   item.addEventListener('click', (event) => {
      /* Make sure tag name is lowercase ready for search */
      const tagSelected = event.target.textContent.toLowerCase();
      const tagType = event.target.getAttribute("data-category");
      getTagIconBGColor(tagSelected, tagType);
   });
   /* Event Listener (for keyboard) */
   item.addEventListener('keyup', (event) => {
      event.preventDefault();
      if (event.key === 'Enter' || event.key === 13) {
         event.preventDefault();
         item.click();
         /*  Make sure tag name is lowercase ready for search 
         const tagSelected = event.target.textContent.toLowerCase();*/       
      }
      /* close dropdown on "Escape" key */
      if (event.key === 'Escape' || event.key === 27) {
         DropDownOpenClose(event);
      }
   });
});

const getTagIconBGColor = (tagSelected, tagType) => {
   let bgColor;
   if (tagType ==="ingredientTag") { bgColor ='info'};
   if (tagType ==="applianceTag") { bgColor ='success'};
   if (tagType ==="ustensilTag") { bgColor ='danger'};
   GenerateTag(tagSelected, bgColor);
};

const GenerateTag = (tagSelected, bgColor) => {
   console.log(bgColor);
   /* declare a place to put the tag selected icon in the dom */
  const tagElements = document.getElementById('tags-container');
   tagElements.insertAdjacentHTML("afterbegin",
   `<div class="tags__selected bg-${bgColor} d-flex align-items-baseline rounded text-white m-1">
   <p class="text-capitalize m-0 mx-1 p-1">${tagSelected}</p><i class="tags__closeBtn far fa-times-circle p-1"></i></div>    
   `
   );
   const tagSelectedIcon = document.querySelectorAll('.tags__closeBtn');
   tagSelectedIcon.forEach((icon) => {
      icon.addEventListener('click', (event) => {
         event.target.parentNode.remove();
      });
   });
};


