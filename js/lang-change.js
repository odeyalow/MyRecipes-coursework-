'use strict';

document.addEventListener('DOMContentLoaded', () => {
    //changing language
    const changeLanguageBtn = document.querySelector('.lang-change-btn'),
        recipesText = document.querySelector('.list-edit__container .title'),
        areaNotOpenBlockText = document.querySelector('.recipe-not-open--block .text'),
        createRecipeTitle = document.querySelector('.add-new-recipe__modal .title'),
        createRecipeText = document.querySelector('.create-btn'),
        deleteRecipeTitle = document.querySelector('.delete-recipe__modal .title'),
        deleteRecipeText = document.querySelector('.confirm-delete-btn'),
        cancelBtns = document.querySelectorAll('.cancel-btn'),
        recipeText = document.querySelector('.recipe-text'),
        descriptionText = document.querySelector('.description-text'),
        addIngridientText = document.querySelector('.add-ingidient-btn'),
        addDescriptionText = document.querySelector('.add-description-btn'),
        deleteDescriptionText = document.querySelector('.delete-description-btn');
    let langChanger = 1;
    changeLanguageBtn.addEventListener('click', e => {
        switch (langChanger){
            case 1:
                langChanger++;
                changeLanguageBtn.textContent = 'Ru';
                recipesText.textContent = 'Рецепты';
                areaNotOpenBlockText.textContent = 'Создайте новый рецепт или выберите существующий';
                createRecipeTitle.textContent = 'Создать новый рецепт';
                deleteRecipeTitle.textContent = 'Вы уверены, что хотите удалить рецепт?';
                createRecipeText.textContent = 'Создать';
                deleteRecipeText.textContent = 'Удалить';
                cancelBtns.forEach(text => {
                    text.textContent = 'Отменить'
                })
                recipeText.textContent = 'Рецепт:';
                descriptionText.textContent = 'Описание:';
                addIngridientText.textContent = 'Добавить ингредиент';
                addDescriptionText.textContent = 'Добавить описание';
                deleteDescriptionText.textContent = 'Удалить описание';
                addIngridientText.style.maxWidth = '370px';
                addDescriptionText.style.maxWidth = '330px';
                deleteDescriptionText.style.maxWidth = '310px';
                break;
            case 2:
                langChanger++;
                changeLanguageBtn.textContent = 'Kz';
                recipesText.textContent = 'Рецепттер';
                recipesText.style.fontSize = '50px';
                areaNotOpenBlockText.textContent = 'Жаңа рецепт жасаңыз немесе бар рецептті таңдаңыз';
                createRecipeTitle.textContent = 'Жаңа рецепт жасау';
                deleteRecipeTitle.textContent = 'Рецептіні жойғыңыз келе ме?';
                createRecipeText.textContent = 'Жасау';
                deleteRecipeText.textContent = 'Жою';
                cancelBtns.forEach(text => {
                    text.textContent = 'Бас тарту';
                })
                recipeText.textContent = 'Рецепт:';
                descriptionText.textContent = 'Сипаттама:';
                addIngridientText.textContent = 'Ингредиентті қосу';
                addDescriptionText.textContent = 'Сипаттаманы қосу';
                deleteDescriptionText.textContent = 'Сипаттаманы жою';
                addIngridientText.style.maxWidth = '320px';
                addDescriptionText.style.maxWidth = '320px';
                deleteDescriptionText.style.maxWidth = '320px';
                break;
            case 3:
                langChanger = 1;
                changeLanguageBtn.textContent = 'En';
                recipesText.textContent = 'Recipes';
                recipesText.style.fontSize = '60px';
                areaNotOpenBlockText.textContent = 'Create a new recipe or select an existing one';
                createRecipeTitle.textContent = 'Create a new recipe';
                deleteRecipeTitle.textContent = 'Are you sure you want to delete the recipe?';
                createRecipeText.textContent = 'Create';
                deleteRecipeText.textContent = 'Delete';
                cancelBtns.forEach(text => {
                    text.textContent = 'Cancel';
                })
                recipeText.textContent = 'Recipe:';
                descriptionText.textContent = 'Description:';
                addIngridientText.textContent = 'Add ingredient';
                addDescriptionText.textContent = 'Add description';
                deleteDescriptionText.textContent = 'Delete description';
                addIngridientText.style.maxWidth = '250px';
                addDescriptionText.style.maxWidth = '265px';
                deleteDescriptionText.style.maxWidth = '300px';
                break;
        }
    })
})