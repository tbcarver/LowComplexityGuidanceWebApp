
function adjustLinkGroupMenus() {

	var dropdownLinkGroups = document.querySelectorAll(".dropdown.link-group");

	for (var dropdownLinkGroup of dropdownLinkGroups) {

		var dropdownMenu = dropdownLinkGroup.querySelector(".dropdown-menu");
		if (dropdownMenu) {

			var previousSibling = dropdownLinkGroup.previousElementSibling;

			if (previousSibling && previousSibling.classList.contains("link-group")) {
				var width = previousSibling.offsetWidth;

				if (width) {
					dropdownMenu.style.left = `-${width}px`;
				}
			}
		}
	}
}

module.exports = adjustLinkGroupMenus;