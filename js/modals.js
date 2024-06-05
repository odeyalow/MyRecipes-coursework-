'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const recipeCreateBtn = document.querySelector('.add-btn'),
    cancelBtn = document.querySelector('.cancel-btn'),
    modals = document.querySelector('.modals'),
    modalsItems = document.querySelectorAll('.modal');

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
    deleteBtnIcon = document.querySelector('.delete-icon');

    //Adding recipe
    createBtn.addEventListener('click', e => {
        e.preventDefault();
        if (createBtn.classList.contains('btn-allowed')){
            //closing when creating
            closeModal(modalsItems[0]);
            
            if (recipCreateInput.value.length >= 9) {
                recipesList.innerHTML += `
                <li class="item">${recipCreateInput.value.slice(0, 9)}...</li>
                `;
            } else {
                recipesList.innerHTML += `
                <li class="item">${recipCreateInput.value}</li>
                `;
            }
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
        } else {
            deleteBtn.classList.add('btn-not-allowed');
            deleteBtnIcon.src = '/img/icons/delete not available.png';
        }
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