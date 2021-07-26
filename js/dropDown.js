const normalize = (text) => {
    return text
     .normalize('NFD')
     .replace(/[\u0300-\u036f]/g, '')
     .toLowerCase();
   };

   export default normalize;