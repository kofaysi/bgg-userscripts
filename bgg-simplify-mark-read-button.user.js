// ==UserScript==
// @name         BGG Simplify Mark Read Button
// @namespace    https://github.com/kofaysi/bgg-userscripts/blob/main/bgg-simplify-mark-read-button.user.js
// @version      1.0
// @description  Replaces 'Mark All Read' with a direct 'Mark Current Page Read' button and hides unnecessary elements.
// @author       https://github.com/kofaysi/
// @match        https://boardgamegeek.com/subscriptions*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function simplifyMarkReadButton() {
        // Find the 'Mark All Read' button by its content
        const buttons = document.querySelectorAll("button");
        let markAllReadButton = null;

        buttons.forEach(button => {
            if (button.textContent.includes("Mark All Read")) {
                markAllReadButton = button;
            }
        });

        if (!markAllReadButton) return;

        // Find its dropdown container
        const dropdownContainer = markAllReadButton.closest("div.dropdown");
        if (!dropdownContainer) return;

        // Find the dropdown menu
        let dropdownMenu = dropdownContainer.querySelector(".dropdown-menu");
        if (!dropdownMenu) return;

        // Find the 'Mark Current Page Read' button inside the dropdown
        let markCurrentPageButton = null;
        dropdownMenu.querySelectorAll("button").forEach(button => {
            if (button.textContent.includes("Mark Current Page Read")) {
                markCurrentPageButton = button;
            }BGG
        });

        if (!markCurrentPageButton) return;

        // Clone 'Mark Current Page Read' and replace the main button
        const newButton = markCurrentPageButton.cloneNode(true);
        newButton.onclick = () => markCurrentPageButton.click();
        newButton.className = markAllReadButton.className;
        newButton.textContent = "Mark Current Page Read";

        // Replace 'Mark All Read' button with new one
        markAllReadButton.replaceWith(newButton);

        // Hide the dropdown menu
        dropdownMenu.style.display = "none";
    }

    // Use MutationObserver to wait for dynamically loaded content
    function observePage() {
        const observer = new MutationObserver(() => {
            simplifyMarkReadButton();
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    window.addEventListener('load', () => {
        setTimeout(simplifyMarkReadButton, 2000); // Delay execution to ensure elements are fully loaded
        observePage();
    });
})();

