'use strict';

document.addEventListener('DOMContentLoaded', () => {
    //Auto-resize textarea
    const descr = document.querySelector('textarea');

    function autoResizeTextarea(){
        descr.style.height = 'auto';
        descr.style.height = descr.scrollHeight + 'px';
        descr.scrollIntoView();
    }
    descr.addEventListener('keyup', () => {
        autoResizeTextarea();
    })
    descr.addEventListener('keydown', e => {
        autoResizeTextarea();
    })
    window.addEventListener('resize', () => autoResizeTextarea());

    //Auto-resize textarea


})