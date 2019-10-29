
var dom = require("../lib/core/web/dom");

window.addEventListener("DOMContentLoaded", function(event) {

	adjustLinkGroupMenus();
	setTableHoverClick();
	setSelectEmptyClassOnChange();
});

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

function setTableHoverClick() {

	var hoverTables = document.querySelectorAll(".table-hover-clickable");

	for (var hoverTable of hoverTables) {

		hoverTable.addEventListener("click", function(event) {

			if (!dom.hasTagNameOrChild(event.target, ["a", "button", "input"])) {

				event.preventDefault();
				event.stopPropagation();

				var row = event.target.closest("tr");
				if (row) {
					var clickElement = row.querySelector(".table-hover-click");
					if (clickElement) {
						clickElement.click();
					}

				}
			}
		});
	}
}

function setSelectEmptyClassOnChange() {

	var selectElements = document.querySelectorAll("select[data-empty-class]");

	for (var selectElement of selectElements) {

		selectElement.addEventListener("change", function(event) {
			setSelectEmptyClass(event.target);
		});

		setSelectEmptyClass(selectElement);
	}
}

function setSelectEmptyClass(selectElement) {

	var isEmptySelected = false;

	for (var selectedOption of selectElement.selectedOptions) {
		if (selectedOption.value === "") {
			isEmptySelected = true;
			break;
		}
	}

	if (isEmptySelected) {
		selectElement.classList.add(selectElement.dataset.emptyClass);
	} else {
		selectElement.classList.remove(selectElement.dataset.emptyClass);
	}
}