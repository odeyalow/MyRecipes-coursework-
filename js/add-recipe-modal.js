'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const addRecipeBtn = document.querySelector('.add-btn'),
        modalsContainer = document.querySelector('.modals'),
        modals = document.querySelectorAll('.modals .modal'),
        cancelBtn = document.querySelector('.cancel-btn');
    function showModal(indexOfModal){
        modalsContainer.style.display = 'flex';
        modals[indexOfModal].style.display = 'flex';
    }
    function closeModal(indexOfModal){
        modalsContainer.style.display = 'none';
        modals[indexOfModal].style.display = 'none';
    }
    addRecipeBtn.addEventListener('click', e => {
        e.preventDefault();
        showModal(0);
    })
    cancelBtn.addEventListener('click', e => {
        e.preventDefault();
        closeModal(0);
    })
})