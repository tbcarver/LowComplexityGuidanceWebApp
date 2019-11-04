
var dom = require("../../../lib/core/web/dom");

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
						if (clickElement instanceof HTMLAnchorElement && event.ctrlKey) {
							window.open(clickElement.href, '_blank');
						} else {
							clickElement.click();
						}
					}
				}
			}
		});
	}
}

module.exports = setTableHoverClick;