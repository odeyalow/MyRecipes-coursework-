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
    function recipeClose(){
        let recipeNotOpened =  `
        <div class="recipe-not-open--block">    
            <p class="text">Create a new recipe or select an existing one</p>
        </div>
        `;
        recipeEditParent.innerHTML += recipeNotOpened;
        recipeEditParent.style.alignSelf = 'end';
    }
    function recipeOpen(){
        const recipeNotOpenedToRemove = document.querySelector('.recipe-not-open--block');
        recipeEditParent.removeChild(recipeNotOpenedToRemove);
        recipeEditParent.style.alignSelf = 'start';
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

            //Adding recipe edit area
            

        }
    })

    //Adding styles to recipes(items) and btn when it's active or not
    recipesList.addEventListener('click', e => {
        const recipeItems = document.querySelectorAll('li');
        recipeItems.forEach(item => {
            item.classList.remove('selected');
        })
        if ( e.target.matches('.item') ) {
            deleteBtnIcon.src = '/img/icons/delete.png';
            e.target.classList.add('selected');
            btnAllowed(deleteBtn);
            //Replacing selected item to the top
            recipesList.prepend(e.target);
            //Deleting recipe not open block
            recipeOpen();
        } else {
            deleteBtn.classList.add('btn-not-allowed');
            deleteBtnIcon.src = '/img/icons/delete not available.png';
            //Adding recipe not open block
            recipeClose();
        }

        //Deliting items
        deleteBtn.addEventListener('click', () => {
            recipeItems.forEach(item => {
                if (item.classList.contains('selected')){
                    item.remove();
                }
            })
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
})