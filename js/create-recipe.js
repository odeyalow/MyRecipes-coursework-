document.addEventListener('DOMContentLoaded', () => {
    const recipesData = {
    },
    createBtn = document.querySelector('.create-btn'),
    recipeNameInput = document.querySelector('.recipe-name'),
    modalsContainer = document.querySelector('.modals'),
    modals = document.querySelectorAll('.modals .modal'),
    recipesList = document.querySelector('.items__container'),
    recipeDeleteBtnIcon = document.querySelector('.delete-btn img'),
    recipeDeleteBtn = document.querySelector('.delete-btn'),
    confirmDeleteBtns = document.querySelectorAll('.confirm-delete-btn'),
    editAreaParent = document.querySelector('.recipe-edit-area'),
    areaNotOpenBlock = editAreaParent.firstElementChild,
    areaOpenBlock = editAreaParent.lastElementChild,
    addIngridientBtn = document.querySelector('.add-ingidient-btn'),
    descriptionBlock = document.querySelector('.description-created--block'),
    description = document.querySelector('.description');
    // Validation input
    recipeNameInput.addEventListener('input', () => {
        if(recipeNameInput.value.length > 0){
            btnAllowed(createBtn);
        } else {
            btnNotAllowed(createBtn);
        }
    })
    function btnAllowed(btn){
        btn.removeAttribute('disabled', '');
        btn.classList.remove('btn-not-allowed');
        btn.classList.add('btn-allowed');
    }
    function btnNotAllowed(btn){
        btn.setAttribute('disabled', '');
        btn.classList.add('btn-not-allowed');
        btn.classList.remove('btn-allowed');
    }
    function addRecipeToList(recipeName){
        if(recipeName.value.length > 11){
            recipesList.insertAdjacentHTML('beforeend', `<li class="item selected">${recipeName.value.slice(0, 11)}</li>`);
        }else{
            recipesList.insertAdjacentHTML('beforeend', `<li class="item selected">${recipeName.value}</li>`);
        }
    }
    function addRecipeData(){
        recipesData[recipeNameInput.value] = {};
        recipesData[recipeNameInput.value]["name"] = recipeNameInput.value;
        recipesData[recipeNameInput.value]["ingridients"] = [];
    }
    function removeRecipeData(key){
        delete recipesData[key];
    }
    function removeSelectedAll(){
        const recipesListItems = document.querySelectorAll('li');
        recipesListItems.forEach(item => {
            item.classList.remove('selected')
        })
    }
    function addSelected(item){
        item.classList.add('selected');
    }
    function hideOrShowRecipeNotOpenBlock(hideOrShow){
        if(hideOrShow == 'hide'){
            areaNotOpenBlock.style.display = 'none';
            editAreaParent.style.alignSelf = 'start';
        } else if(hideOrShow == 'show'){
            areaNotOpenBlock.style.display = 'flex';
            editAreaParent.style.alignSelf = 'end';
        }
    }
    function hideOrShowRecipeOpenBlock(hideOrShow){
        if(hideOrShow == 'hide'){
            areaOpenBlock.style.display = 'none';
        } else if(hideOrShow == 'show'){
            areaOpenBlock.style.display = 'flex';
        }
    }
    function cleanIngridients(){
        let areaOpenBlockIngridients = document.querySelectorAll('.ingridient-and-numbering');
        areaOpenBlockIngridients.forEach(item => {
            item.remove();
        });
    }
    function getIngridients(name){
        let areaOpenBlockIngridients = document.querySelectorAll('.ingridient-and-numbering');
        areaOpenBlockIngridients.forEach(item => {
            item.remove();
        });
        
        for (const recipeName in recipesData) {
            if (recipeName === name) {
                for (let i = 0; i < recipesData[name]["ingridients"].length; i++) {
                    let ingridientName = recipesData[name]["ingridients"][i]["nameOfIngridient"],
                    ingridientAmount = recipesData[name]["ingridients"][i]["amountOfIngridient"],
                    ingridientUnit = recipesData[name]["ingridients"][i]["unitOfIngridient"];

                    addIngridientBtn.insertAdjacentHTML(
                        'beforebegin', 
                        `<div class="ingridient-and-numbering">
                            <span class="ingridient-numbering">${i + 1}.</span>
                            <form class="add-new-recipe__form">
                                <input data-index="${i}" type="text" class="ingridient-name" value="${ingridientName}" placeholder="Ingredient name">
                
                                <div class="amount-unit--block">
                                    <input data-index="${i}" type="tel" class="ingridient-amount" value="${ingridientAmount}" placeholder="0">
                                    <select data-index="${i}" value="${ingridientUnit}" class="ingridient-unit">
                                        <option class="unit-option" value="pcs">pcs</option>
                                        <option class="unit-option" value="tsp">tsp</option>
                                        <option class="unit-option" value="tbsp">tbsp</option>
                                        <option class="unit-option" value="cup">cup</option>
                                        <option class="unit-option" value="g">g</option>
                                        <option class="unit-option" value="kg">kg</option>
                                    </select>
                                </div>
                            </form>
                    </div>`);
                }
            }
        }
    }
    //add recipe
    createBtn.addEventListener('click', e => {
        e.preventDefault();
        modalsContainer.style.display = 'none';
        modals[0].style.display = 'none';
        btnNotAllowed(createBtn);

        removeSelectedAll();
        addRecipeToList(recipeNameInput);

        btnAllowed(recipeDeleteBtn);
        recipeDeleteBtnIcon.src = '/img/icons/delete.png';

        addRecipeData();

        //add edit area
        hideOrShowRecipeNotOpenBlock('hide');
        hideOrShowRecipeOpenBlock('show');
        descriptionBlock.style.display = 'none';
        descriptionBlock.previousElementSibling.style.display = 'block';
        // getDescription();
        description.style.height = 'auto';

        getIngridients();
    })
    //recipe selected/not selected
    recipesList.addEventListener('click', e  => {
        //item selection
        removeSelectedAll();
        if(e.target.matches('li')){
            //styles
            removeSelectedAll();
            addSelected(e.target);
            btnAllowed(recipeDeleteBtn);
            recipeDeleteBtnIcon.src = '/img/icons/delete.png';

            //add edit area
            hideOrShowRecipeNotOpenBlock('hide');
            hideOrShowRecipeOpenBlock('show');
            // descriptionBlock.style.display = 'none';
            // descriptionBlock.previousElementSibling.style.display = 'block';

            getIngridients(e.target.textContent);

            //geting description
            if(!recipesData[e.target.textContent]["description"]){
                descriptionBlock.previousElementSibling.style.display = 'block';
                descriptionBlock.style.display = 'none';
            } else {
                descriptionBlock.previousElementSibling.style.display = 'none';
                descriptionBlock.style.display = 'block';
                description.value = '';
                description.style.height = 'auto';
                if(recipesData[e.target.textContent] && recipesData[e.target.textContent]["description"]){
                    description.value = recipesData[e.target.textContent]["description"];
                    description.style.height = description.scrollHeight + 'px';
                    description.scrollIntoView();
                }
            }
        }else{
            btnNotAllowed(recipeDeleteBtn);
            recipeDeleteBtnIcon.src = '/img/icons/delete not available.png';
            hideOrShowRecipeNotOpenBlock('show');
            hideOrShowRecipeOpenBlock('hide');
            cleanIngridients();
        }
    })
    //recipe delete
    confirmDeleteBtns[0].addEventListener('click', e => {
        const recipesListItems = document.querySelectorAll('li');
        recipesListItems.forEach(item => {
            if(item.classList.contains('selected')){
                item.remove();
                removeRecipeData(item.textContent);
            }
        })
        btnNotAllowed(recipeDeleteBtn);
        recipeDeleteBtnIcon.src = '/img/icons/delete not available.png';
        hideOrShowRecipeNotOpenBlock('show');
        hideOrShowRecipeOpenBlock('hide');
        descriptionBlock.previousElementSibling.style.display = 'block';
    })
    // add ingredient
    addIngridientBtn.addEventListener('click', e => {
        // add ingredient to recipeData
        const recipesListItems = document.querySelectorAll('li');
        recipesListItems.forEach(item => {
            if (item.classList.contains('selected')) {
                for (const recipeName in recipesData) {
                    if (recipeName === item.textContent) {
                        const ingredient = {
                            "nameOfIngridient": "",
                            "amountOfIngridient": "",
                            "unitOfIngridient": "pcs"
                        };
                        // Add the new ingredient to the array
                        recipesData[recipeName]["ingridients"].push(ingredient);
                        let ingridients = recipesData[recipeName]["ingridients"];
                        let ingredientIndex = ingridients.length - 1;

                        addIngridientBtn.insertAdjacentHTML(
                            'beforebegin', 
                            `<div class="ingridient-and-numbering">
                                <span class="ingridient-numbering">${ingredientIndex + 1}.</span>
                                <form class="add-new-recipe__form">
                                    <input data-index="${ingredientIndex}" type="text" class="ingridient-name" placeholder="Ingredient name">
                    
                                    <div class="amount-unit--block">
                                        <input data-index="${ingredientIndex}" type="tel" class="ingridient-amount" placeholder="0">
                                        <select data-index="${ingredientIndex}" class="ingridient-unit">
                                            <option class="unit-option" value="pcs">pcs</option>
                                            <option class="unit-option" value="tsp">tsp</option>
                                            <option class="unit-option" value="tbsp">tbsp</option>
                                            <option class="unit-option" value="cup">cup</option>
                                            <option class="unit-option" value="g">g</option>
                                            <option class="unit-option" value="kg">kg</option>
                                        </select>
                                    </div>
                                </form>
                        </div>`);
                    }
                }
            }
        });
    });
    // delete ingredient
    editAreaParent.addEventListener('dblclick', e => {
        if (e.target.classList.contains('ingridient-name')) {
            const recipesListItems = document.querySelectorAll('li');
            let ingredientIndex = Number(e.target.dataset.index);
            recipesListItems.forEach(item => {
                if (item.classList.contains('selected')) {
                    for (const recipeName in recipesData) {
                        if (recipeName === item.textContent) {
                            recipesData[recipeName]["ingridients"].splice(ingredientIndex, 1);
                            e.target.parentElement.parentElement.remove();

                            // Update the numbering of remaining ingredients
                            const remainingIngredients = document.querySelectorAll('.ingridient-and-numbering');
                            remainingIngredients.forEach((ingredientElement, index) => {
                                const numberElement = ingredientElement.querySelector('.ingridient-numbering');
                                const nameInput = ingredientElement.querySelector('.ingridient-name');
                                const amountInput = ingredientElement.querySelector('.ingridient-amount');
                                const unitSelect = ingredientElement.querySelector('.ingridient-unit');

                                numberElement.textContent = `${index + 1}.`;
                                nameInput.dataset.index = index;
                                amountInput.dataset.index = index;
                                unitSelect.dataset.index = index;
                            });
                        }
                    }
                }
            });
        }
    });
    //add description
    areaOpenBlock.addEventListener('click', e => {
        if(e.target.classList.contains('add-description-btn')){
            descriptionBlock.style.display = 'block';
            const recipesListItems = document.querySelectorAll('li');
            recipesListItems.forEach(item => {
                if (item.classList.contains('selected')) {
                    for (const recipeName in recipesData) {
                        if (recipeName === item.textContent) {
                            recipesData[item.textContent]["description"] = "";
                        }
                    }
                }
            });
            description.value = '';
            e.target.style.display = 'none';
        }
    })
    //delete description
    confirmDeleteBtns[1].addEventListener('click', e => {
        e.preventDefault();
        const recipesListItems = document.querySelectorAll('li');
        descriptionBlock.style.display = 'none';
        recipesListItems.forEach(item => {
            if (item.classList.contains('selected')) {
                for (const recipeName in recipesData) {
                    if (recipeName === item.textContent) {
                        delete recipesData[item.textContent]["description"];
                    }
                }
            }
        });
        descriptionBlock.previousElementSibling.style.display = 'block';
    })
    // areaOpenBlock.addEventListener('click', e => {
    //     if(e.target.classList.contains('delete-description-btn')){
            
    //     }
    // })
    //tracking changes
    editAreaParent.addEventListener('input', e => {
        if (e.target.classList.contains('ingridient-name')) {
            const recipesListItems = document.querySelectorAll('li');
            let ingridientIndex = Number(e.target.dataset.index);
            recipesListItems.forEach(item => {
                if (item.classList.contains('selected')) {
                    for (const recipeName in recipesData) {
                        if (recipeName === item.textContent) {
                            let ingridientName = recipesData[recipeName]["ingridients"][ingridientIndex];
                            ingridientName["nameOfIngridient"] = e.target.value;
                        }
                    }
                }
            });
        }
    });
    editAreaParent.addEventListener('input', e => {
        if (e.target.classList.contains('ingridient-amount')) {
            const recipesListItems = document.querySelectorAll('li');
            let ingridientIndex = Number(e.target.dataset.index);
            recipesListItems.forEach(item => {
                if (item.classList.contains('selected')) {
                    for (const recipeName in recipesData) {
                        if (recipeName === item.textContent) {
                            let ingredients = recipesData[recipeName]["ingridients"];
                            ingredients[ingridientIndex]["amountOfIngridient"] = e.target.value;
                        }
                    }
                }
            });
        }
    });
    editAreaParent.addEventListener('input', e => {
        if (e.target.classList.contains('ingridient-unit')) {
            const recipesListItems = document.querySelectorAll('li');
            let ingridientIndex = Number(e.target.dataset.index);
            recipesListItems.forEach(item => {
                if (item.classList.contains('selected')) {
                    for (const recipeName in recipesData) {
                        if (recipeName === item.textContent) {
                            let ingredients = recipesData[recipeName]["ingridients"];
                            ingredients[ingridientIndex]["unitOfIngridient"] = e.target.value;
                        }
                    }
                }
            });
        }
    });
    editAreaParent.addEventListener('input', e => {
        if (e.target.classList.contains('description')) {
            const recipesListItems = document.querySelectorAll('li');
            let ingridientIndex = Number(e.target.dataset.index);
            recipesListItems.forEach(item => {
                if (item.classList.contains('selected')) {
                    for (const recipeName in recipesData) {
                        if (recipeName === item.textContent) {
                            recipesData[recipeName]["description"] = e.target.value
                            console.log(recipesData[recipeName]);
                        }
                    }
                }
            });
        }
    });
})