// ==UserScript==
// @name         BGG Expand and Reposition Mark Read Options
// @namespace    https://github.com/kofaysi/bgg-userscripts/blob/main/bgg-expand-reposition-mark-read-options.user.js
// @version      2.2
// @description  Expands the 'Mark All Read' dropdown menu by default and lists its items in a row next to the button.
// @author       https://github.com/kofaysi/
// @match        https://boardgamegeek.com/subscriptions*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function expandAndRepositionMarkRead() {
        // Find the button containing 'Mark All Read'
        const buttons = document.querySelectorAll("button");
        let markAllReadButton = null;

        buttons.forEach(button => {
            if (button.textContent.includes("Mark All Read")) {
                markAllReadButton = button;
            }
        });

        if (!markAllReadButton) return;

        // Get dropdown container from the button's parent
        const dropdownContainer = markAllReadButton.closest("div.dropdown");
        if (!dropdownContainer) return;

        // Try to find dropdown menu within this container
        let dropdownMenu = dropdownContainer.querySelector(".dropdown-menu");
        if (!dropdownMenu) {
            expandAndRepositionMarkRead(); // Retry after delay
            return;
        }

        // Ensure the dropdown is expanded
        dropdownContainer.classList.add("show");
        dropdownMenu.classList.add("show");
        dropdownMenu.style.position = "static";
        dropdownMenu.style.display = "flex";
        dropdownMenu.style.flexDirection = "row";
        dropdownMenu.style.gap = "10px";
        dropdownMenu.style.marginLeft = "10px";

        // Move the dropdown menu to be inline with the button
        dropdownContainer.after(dropdownMenu);
    }

    // Use MutationObserver to wait for dynamically loaded content
    function observePage() {
        const observer = new MutationObserver(() => {
            expandAndRepositionMarkRead();
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    window.addEventListener('load', () => {
        expandAndRepositionMarkRead(); // Delay execution to ensure elements are fully loaded
        observePage();
    });
})();
