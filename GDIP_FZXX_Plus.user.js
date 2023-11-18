// ==UserScript==
// @name         轻工犯在学xi
// @namespace    qg
// @version      0.1
// @description  看电影
// @author       Biaogo
// @match        https://study.gdip.edu.cn/LearnSpace/RecordedLearning*
// ==/UserScript==

(function () {
    'use strict';

    function playVideo() {
        var playButton = document.querySelector('.prism-play-btn');
        if (playButton && !playButton.classList.contains('playing')) {
            playButton.click();
        }
    }

    function clickNextTask() {
        var treeItems = document.querySelectorAll('.el-tree-node');
        var currentItemIndex = -1;

        treeItems.forEach((item, index) => {
            if (item.classList.contains('is-current')) {
                currentItemIndex = index;
            }
        });

        if (currentItemIndex !== -1) {
            for (var i = currentItemIndex + 1; i < treeItems.length; i++) {
                var task = treeItems[i].querySelector('.chapter-status.unfinished');
                if (task) {
                    treeItems[i].querySelector('.el-tree-node__content').click();
                    break;
                }
            }
        }
    }

    setInterval(playVideo, 1000);

    setInterval(function () {
        var currentTimeElement = document.querySelector('.current-time');
        var durationElement = document.querySelector('.duration');

        if (currentTimeElement && durationElement) {
            var currentTime = currentTimeElement.textContent;
            var duration = durationElement.textContent;

            if (currentTime === duration) {
                clickNextTask();
            }
        }
    }, 1000);
})();