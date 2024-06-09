'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const descrParent = document.querySelector('.recipe-open--block');
    function autoResizeTextarea(item){
        item.style.height = 'auto';
        item.style.height = item.scrollHeight + 'px';
        item.scrollIntoView();
    }
    descrParent.addEventListener('keyup', e => {
        if(e.target.tagName.toLowerCase() === 'textarea'){
            autoResizeTextarea(e.target);
        }
    })
    descrParent.addEventListener('keydown', e => {
        if(e.target.tagName.toLowerCase() === 'textarea'){
            autoResizeTextarea(e.target);
        }
    })
    window.addEventListener('resize', e => {
        autoResizeTextarea(e.target);
    });
})