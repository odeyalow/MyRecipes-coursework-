'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const recipeCreateBtn = document.querySelector('.add-btn'),
    cancelBtn = document.querySelector('.cancel-btn'),
    modals = document.querySelector('.modals'),
    modalsItems = document.querySelectorAll('.modal'),
    recipeEditParent = document.querySelector('.recipe-edit-area');    
    //Dynamic adding recipe not open block
    let recipeNotOpened = `
        <div class="recipe-not-open--block">    
            <p class="text">Create a new recipe or select an existing one</p>
        </div>
    `;
    recipeEditParent.innerHTML += recipeNotOpened;

    let active = true;

    //styles for edit area when recipe Opened or closed
    function openModal(modal){
        modals.style.display = 'flex';
        modal.style.display = 'flex';
        recipCreateInput.value = '';
    }
    function closeModal(modal){
        modals.style.display = 'none';
        modal.style.display = 'none';
    }
    function btnAllowed(btn){
        btn.classList.remove('btn-not-allowed');
        btn.classList.add('btn-allowed');
    }
    function btnNotAllowed(btn){
        createBtn.classList.add('btn-not-allowed');
    }
    function recipeOpen(){
        const recipeNotOpenedToRemove = document.querySelector('.recipe-not-open--block');
        recipeEditParent.removeChild(recipeNotOpenedToRemove);
        recipeEditParent.style.alignSelf = 'start';
    }
    function recipeClose(){
        let recipeNotOpened =  `
        <div class="recipe-not-open--block">    
            <p class="text">Create a new recipe or select an existing one</p>
        </div>
        `;
        recipeEditParent.innerHTML += recipeNotOpened;
        recipeEditParent.style.alignSelf = 'end';
        active = true
    }

    //Opening and closing modals
    recipeCreateBtn.addEventListener('click', () => {
        openModal(modalsItems[0]);
    })
    cancelBtn.addEventListener('click', e => {
        e.preventDefault();
        closeModal(modalsItems[0]);
    })

    const recipCreateInput = document.querySelector('.ingridient-name'),
    createBtn = document.querySelector('.create-btn'),
    recipesList = document.querySelector('.items__container'),
    deleteBtn = document.querySelector('.delete-btn'),
    deleteBtnIcon = document.querySelector('.delete-icon');

    //Adding recipe
    createBtn.addEventListener('click', e => {
        e.preventDefault();
        if (createBtn.classList.contains('btn-allowed')){
            //Changing trash icon src when item selected
            deleteBtnIcon.src = '/img/icons/delete.png';
            btnAllowed(deleteBtn);
            //Closing when creating
            closeModal(modalsItems[0]);
            //Checking input length for 11 symbols
            if (recipCreateInput.value.length >= 11) {
                recipesList.innerHTML += `
                <li class="item selected">${recipCreateInput.value.slice(0, 11)}...</li>
                `;
            } else {
                recipesList.innerHTML += `
                <li class="selected item">${recipCreateInput.value}</li>
                `;
            }
            //Replacing new created recipe to the top
            const recipeItems = document.querySelectorAll('li');    
            recipeItems.forEach(item => {
                item.classList.remove('selected');
                recipesList.prepend(recipeItems[recipeItems.length-1]);
                recipeItems[recipeItems.length-1].classList.add('selected');
            })
            //Deleting recipe not open block
            recipeOpen();

            active = false;
            //Adding recipe edit area
            let recipeBlock = `
                <div class="recipe--block ${recipCreateInput.value}">
                    <h2 class="title">${recipCreateInput.value}</h2>
                    <div class="recipe-open--block">
                        <span class="recipe-open-text recipe-text">Recipe:</span>
                        <button class="btn add-ingidient-btn">Add ingridient</button>
                        <div class="line"></div>
                        <button class="btn add-description-btn">Add description</button>
                    </div>
                </div>
            `;
            //Closing all recipe areas
            const recipeAreas = document.querySelectorAll('.recipe--block');
            recipeAreas.forEach(item => {
                item.style.display = 'none';
            })
            recipeEditParent.innerHTML += recipeBlock;
        }
    })
    //Adding styles to recipes(items) and btn when it's active or not
    recipesList.addEventListener('click', e => {
        const recipeItems = document.querySelectorAll('li'),
        recipeAreas = document.querySelectorAll('.recipe--block');
        recipeItems.forEach(item => {
            item.classList.remove('selected');
        })
        recipeAreas.forEach(item => {
            item.style.display = 'none';
        })
        if ( e.target.matches('.item') ) {
            deleteBtnIcon.src = '/img/icons/delete.png';
            e.target.classList.add('selected');
            btnAllowed(deleteBtn);
            //Replacing selected item to the top
            recipesList.prepend(e.target);
            //Deleting recipe not open block
            recipeOpen();
            active = false;
            //Opening an selected recipe
            recipeAreas.forEach(item => {
                if (item.classList.contains(e.target.textContent)) {
                    item.style.display = 'block';
                }
            })
        } else {
            deleteBtn.classList.add('btn-not-allowed');
            deleteBtnIcon.src = '/img/icons/delete not available.png';

            //Adding recipe not open block
            if ( !active ) {
                recipeClose();
            }
        }

        //Deliting items
        deleteBtn.addEventListener('click', () => {
            recipeItems.forEach(item => {
                if (item.classList.contains('selected')){
                    item.remove();
                }
            })
            deleteBtnIcon.src = '/img/icons/delete.png';
            btnAllowed(deleteBtn);
            const recipesNotOpenedToRemove = document.querySelectorAll('.recipe-not-open--block'),
            recipeAreas = document.querySelectorAll('.recipe--block');
            recipeEditParent.removeChild(recipesNotOpenedToRemove);
            recipesNotOpenedToRemove.forEach(item => {
                item.remove();
            })
            recipeEditParent.innerHTML += recipeNotOpened;
            recipeEditParent.style.alignSelf = 'end';
            active = true;
        })
    })
    //Validating the recipe adding input
    recipCreateInput.addEventListener('input', () => {
        if ( recipCreateInput.value !== '' ) {
            btnAllowed(createBtn);
        } else {
            btnNotAllowed(createBtn);
        }
    })

    const addIngridientBtn = document.querySelector('.add-ingidient-btn');

    
})