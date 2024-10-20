// ==UserScript==
// @name         BGG Video Resizer
// @namespace    https://github.com/kofaysi/bgg-userscripts/blob/main/bgg-video-resizer.user.js
// @version      1.2
// @description  Resize BGG videos to not be full width of the column and maintain proper aspect ratio and alignment
// @match        https://boardgamegeek.com/*
// @author       https://github.com/kofaysi/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to resize YouTube video elements
    function resizeVideos() {
        // Select all YouTube video elements
        const videos = document.querySelectorAll('gg-markup-youtube gg-youtube-video-masked');

        // Apply new styles to each video element
        videos.forEach(video => {
            // Set the desired width and height
            const desiredWidth = 712; // Adjust this to your desired width
            const aspectRatio = 16 / 9;
            const desiredHeight = desiredWidth / aspectRatio;

            // Adjust the main video container
            video.style.width = `${desiredWidth}px`;
            video.style.height = `${desiredHeight}px`;
            video.style.margin = '0 auto';
            video.style.maxWidth = '700px';
            video.style.position = 'relative';
        });

        // Adjust parent containers to ensure no overflow and proper alignment
        const parents = document.querySelectorAll('gg-markup-youtube');
        parents.forEach(parent => {
            parent.style.overflow = 'hidden';
            parent.style.display = 'flex';
            parent.style.justifyContent = 'center';
        });
    }

    // Run the resize function when the page loads
    window.addEventListener('load', resizeVideos);

    // Optional: Run the resize function when new content is loaded via AJAX (e.g., infinite scroll)
    const observer = new MutationObserver(resizeVideos);
    observer.observe(document.body, { childList: true, subtree: true });
})();
