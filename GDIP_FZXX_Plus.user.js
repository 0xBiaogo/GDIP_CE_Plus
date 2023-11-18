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

    var hasClickedNextTask = false;

    function playVideo() {
        var playButton = document.querySelector('.prism-play-btn');
        if (playButton && !playButton.classList.contains('playing')) {
            playButton.click();
        }
    }

    function clickNextTask() {
        if (hasClickedNextTask) return;
        hasClickedNextTask = true;

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

    function timeStringToSeconds(timeStr) {
        var parts = timeStr.split(':').map(Number);
        var seconds = 0;
        for (var i = 0; i < parts.length; i++) {
            seconds = seconds * 60 + parts[i];
        }
        return seconds;
    }

    function waitForVideoAndStartIntervals() {
        var videoElement = document.querySelector('video');

        if (videoElement) {
            setTimeout(function() {
                setInterval(playVideo, 1000);
                setInterval(checkVideoEndAndClickNextTask, 1000);
            }, 1000);
        } else {
            setTimeout(waitForVideoAndStartIntervals, 1000);
        }
    }

    function checkVideoEndAndClickNextTask() {
        if (hasClickedNextTask) return;

        var currentTimeElement = document.querySelector('.current-time');
        var durationElement = document.querySelector('.duration');

        if (currentTimeElement && durationElement) {
            var currentTime = timeStringToSeconds(currentTimeElement.textContent);
            var duration = timeStringToSeconds(durationElement.textContent);

            if (currentTime >= duration) {
                clickNextTask();
            }
        }
    }

    waitForVideoAndStartIntervals();
})();
