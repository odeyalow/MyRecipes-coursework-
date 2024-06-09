'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const addRecipeBtn = document.querySelector('.add-btn'),
        modalsContainer = document.querySelector('.modals'),
        modals = document.querySelectorAll('.modals .modal'),
        cancelBtn = document.querySelectorAll('.cancel-btn'),
        recipeNameInput = document.querySelector('.recipe-name'),
        recipeDeleteBtn = document.querySelector('.delete-btn'),
        confirmDeleteBtns = document.querySelectorAll('.confirm-delete-btn'),
        deleteDescriptionBtn = document.querySelector('.delete-description-btn'),
        uploadBtn = document.querySelector('.upload-btn'),
        dropArea = document.querySelector('.drop-area');
    function showModal(indexOfModal){
        modalsContainer.style.display = 'flex';
        modals[indexOfModal].style.display = 'flex';
    }
    function closeModal(){
        modalsContainer.style.display = 'none';
        for (let i = 0; i < modals.length; i++) {
            modals[i].style.display = 'none';
        }
    }
    addRecipeBtn.addEventListener('click', e => {
        e.preventDefault();
        showModal(0);
        recipeNameInput.value = '';
    })
    cancelBtn.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            closeModal(0);
            recipeNameInput.value = '';
            dropArea.classList.remove('highlight');
        })
    })
    recipeDeleteBtn.addEventListener('click', e => {
        e.preventDefault();
        showModal(1);
    })
    confirmDeleteBtns.forEach(item => {
        item.addEventListener('click', e => {
            e.preventDefault();
            closeModal(2);
        })
    })
    deleteDescriptionBtn.addEventListener('click', e => {
        showModal(2);
    })
    uploadBtn.addEventListener('click', e => {
        showModal(3);
    })
})