/**
 * Menu Toggle
 */
(function(window, undefined){

	var document = window.document;

	document.querySelector('.js-mobile-expandable-toggle').addEventListener('click', toggleMenu);
	window.addEventListener('scroll', toggleScrollClass);
	document.addEventListener("DOMContentLoaded", toggleScrollClass);

	function toggleClass( el, className, force ) {
		if (el.classList) {
			el.classList.toggle(className, force);
		} else {
			var classes = el.className.split(' ');
			var existingIndex = classes.indexOf(className);

			if( typeof force !== 'undefined' ) {
				if( force && existingIndex < 0 ) {
					classes.push(className);
				} else if( ! force && existingIndex >= 0 ) {
					classes.splice(existingIndex, 1);
				}
			} else {
				if (existingIndex >= 0)
					classes.splice(existingIndex, 1);
				else
					classes.push(className);
			}

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

	function toggleScrollClass() {

		if( window.scrollY == 0 ) {
			toggleClass( document.querySelector('body'), 'scroll-at-top', true );
		} else {
			toggleClass( document.querySelector('body'), 'scroll-at-top', false );
		}
	}

})(window);