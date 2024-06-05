'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const descr = document.querySelector('textarea');

    function autoResizeTextarea(){
        descr.style.height = 'auto';
        descr.style.height = descr.scrollHeight + 'px';
        descr.scrollIntoView();
    }
    descr.addEventListener('keyup', autoResizeTextarea())
    descr.addEventListener('keydown', autoResizeTextarea())
    window.addEventListener('resize', autoResizeTextarea());
})