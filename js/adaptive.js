'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const list = document.querySelector('.list');
    window.addEventListener('resize', function(event) {
        if (window.innerWidth === 770) {
            list.style.minHeight = '';
        }
    });
})