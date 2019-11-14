/**
 * Menu Toggle
 */
(function(window, undefined){

	var document = window.document;

	document.querySelector('.js-mobile-expandable-toggle').addEventListener('click', toggleMenu);

	function toggleClass( el, className ) {
		if (el.classList) {
			el.classList.toggle(className);
		} else {
			var classes = el.className.split(' ');
			var existingIndex = classes.indexOf(className);

			if (existingIndex >= 0)
				classes.splice(existingIndex, 1);
			else
				classes.push(className);

			el.className = classes.join(' ');
		}
	}
	/**
	 * Toggle the menu
	 * Open if closed, close if opened.
	 * Accomplished by adding and removing the class .is-open
	 */
	function toggleMenu(e) {

		toggleClass( document.querySelector('.js-mobile-expandable'), 'is-open' );
		toggleClass( document.querySelector('body'), 'js-mobile-expandable-is-open' );

		return false;

	}

})(window);