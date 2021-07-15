// GENERATE EACH SEARCH LIST IN EACH DROPDOWN
const createSearchArticles = (id, list) => {
    const ListElement = document.querySelector(id);
    let Listshtml = '';
    list.forEach((item) => {
       Listshtml +=
       `<li role="option" tabindex="0" class="tags col-6 col-md-3 col-lg-4 list-unstyled text-capitalize text-truncate px-2 m-0" arial-label="${item}">${item}</li>`;
       ListElement.innerHTML = Listshtml;
    });
 };


 export {createSearchArticles}