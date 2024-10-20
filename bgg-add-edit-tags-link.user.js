// ==UserScript==
// @name         BGG Add Edit Tags Link
// @namespace    https://github.com/kofaysi/bgg-userscripts/blob/main/bgg-add-edit-tags-link.user.js
// @version      2.1
// @description  Add an "Edit Tags" link to each div with the class 'tagouter' aligned to the right within the row of the board game name
// @author       https://github.com/kofaysi/
// @match        https://boardgamegeek.com/tag/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to add the new link
    function addEditTagsLink() {
        // Select all divs with the class 'tagouter'
        var tagOuterDivs = document.querySelectorAll("div.tagouter");

        tagOuterDivs.forEach(function(div) {
            // Find the div containing the board game name
            var boardGameDiv = div.querySelector("div > a[href^='/boardgame/']").parentElement;

            if (boardGameDiv) {
                // Get the href attribute of the anchor tag
                var originalHref = boardGameDiv.querySelector("a[href^='/boardgame/']").getAttribute("href");

                // Create the new URL by appending '/mygames/tags/'
                var newHref = originalHref + "/mygames/tags/";

                // Create a new anchor element
                var newAnchor = document.createElement("a");
                newAnchor.setAttribute("href", newHref);
                newAnchor.textContent = "Edit Tags";

                // Create a span to align the new link to the right
                var span = document.createElement("span");
                span.style.float = 'right';

                // Append the new anchor to the span
                span.appendChild(newAnchor);

                // Append the span to the board game div
                boardGameDiv.appendChild(span);
            }
        });
    }

    // Run the function on page load
    window.addEventListener('load', addEditTagsLink);
})();
