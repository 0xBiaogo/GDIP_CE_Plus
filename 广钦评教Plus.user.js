// ==UserScript==
// @name         广钦评教Plus
// @namespace    none
// @version      0.1
// @description  广钦评教Plus
// @author       Biaogo
// @match        https://my.gdip.edu.cn/EducationEvaluation/EducationEvaluation-EvaluationFillAdd*
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
	let isFormSubmitted = false;
	const observer = new MutationObserver(() => {
		const suggestionInput = document.querySelector('textarea.el-textarea__inner');
		const ratingButtons = document.querySelectorAll('.el-radio__label');
		ratingButtons.forEach(button => {
			if (button.innerText.includes('良好')) {
				button.click();
			}
		});

		if (suggestionInput && suggestionInput.placeholder.match(/\d+/)) {
			const requiredCount = parseInt(suggestionInput.placeholder.match(/\d+/)[0]) + 1;

			suggestionInput.value = '无'.repeat(requiredCount);
		}
		const submitButton = document.querySelector('.view_layout_wf_footer_action_fill button.el-button--primary');
		if (submitButton) {
			submitButton.click();
			isFormSubmitted = true;
		}
	});

	observer.observe(document.body, {
		childList: true,
		subtree: true
	});
})();