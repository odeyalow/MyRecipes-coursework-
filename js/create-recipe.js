document.addEventListener('DOMContentLoaded', () => {
    const createBtn = document.querySelector('.create-btn'),
    recipeNameInput = document.querySelector('.ingridient-name');

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
    
    //Validation input
    recipeNameInput.addEventListener('input', () => {
        if(recipeNameInput.value.length > 0){
            btnAllowed(createBtn);
        } else {
            btnNotAllowed(createBtn);
        }
    })

    createBtn.addEventListener('click', e => {
        e.preventDefault();
        console.log('dsd')
    })
})