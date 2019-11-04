
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

module.exports = setSelectEmptyClassOnChange;