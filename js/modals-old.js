'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const recipeCreateBtn = document.querySelector('.add-btn'),
    cancelBtn = document.querySelector('.cancel-btn'),
    modals = document.querySelector('.modals'),
    modalsItems = document.querySelectorAll('.modal');

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


    //recipe create modal input validation
    const recipCreateInput = document.querySelector('.ingridient-name'),
    createBtn = document.querySelector('.create-btn'),
    recipesList = document.querySelector('.items__container'),
    deleteBtn = document.querySelector('.delete-btn'),
    deleteBtnIcon = document.querySelector('.delete-icon'),
    recipeEditParent = document.querySelector('.recipe-edit-area');
    // recipeItems = recipesList.querySelectorAll('.item');


    //dynamic adding recipe not opened block
    let recipeNotOpened =  `
        <div class="recipe-not-open--block">    
            <p class="text">Create a new recipe or select an existing one</p>
        </div>
    `;
    recipeEditParent.innerHTML = recipeNotOpened;
    
    //Adding recipe
    createBtn.addEventListener('click', e => {
        e.preventDefault();
        if (createBtn.classList.contains('btn-allowed')){
            //closing when creating
            closeModal(modalsItems[0]);
            
            if (recipCreateInput.value.length >= 9) {
                recipesList.innerHTML += `
                <li class="item selected">${recipCreateInput.value.slice(0, 11)}...</li>
                `;
            } else {
                recipesList.innerHTML += `
                <li class="selected item">${recipCreateInput.value}</li>
                `;
            }

            btnAllowed(deleteBtn);

            const recipeItems = document.querySelectorAll('li');    
            recipeItems.forEach(item => {
                item.classList.remove('selected');
                recipesList.prepend(recipeItems[recipeItems.length-1]);
                recipeItems[recipeItems.length-1].classList.add('selected');
            })

            let recipeTitleAndArea = `
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
            
            const recipeAreas = document.querySelectorAll('.recipe--block');
            recipeAreas.forEach(item => {
                item.style.display = 'none';
            })

            recipeOpen();
            
            recipeEditParent.innerHTML += recipeTitleAndArea;
        }
    })


    deleteBtn.addEventListener('click', () => {
        recipesList.forEach(item => {
            if (item.classList.contains('selected')){
                remove(item);
            }
        })
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
            recipesList.prepend(e.target);
            e.target.classList.add('selected');
            btnAllowed(deleteBtn);

            recipeAreas.forEach(item => {
                if (item.classList.contains(e.target.textContent)) {
                    item.style.display = 'block';
                }
            })
        } else {
            let recipeCloseActive = false;
            deleteBtn.classList.add('btn-not-allowed');
            deleteBtnIcon.src = '/img/icons/delete not available.png';
        }

        // recipeItems.forEach(item => {
        //     console.log(item)
        // })
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