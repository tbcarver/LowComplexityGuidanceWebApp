
class CompareValidator extends HTMLElement {

	constructor() {
		super();

		this.hasConnected = false;
	}

	static get observedAttributes() {
		return ["source-id, target-id, message"];
	}

	get sourceId() {
		return this.getAttribute("source-id");
	}

	set sourceId(value) {
		this.setAttribute("source-id", value);
	}

	get targetId() {
		return this.getAttribute("target-id");
	}

	set targetId(value) {
		this.setAttribute("target-id", value);
	}

	get message() {
		return this.getAttribute("message");
	}

	set message(value) {
		this.setAttribute("message", value);
	}

	connectedCallback() {

		this.hasConnected = true;
		this.render();
	}

	attributeChangedCallback(name, oldValue, newValue) {

		if (this.hasConnected) {
			this.render();
		}
	}

	render() {

		this.sourceElement = document.getElementById(this.sourceId);
		this.targetElement = document.getElementById(this.targetId);

		if (this.sourceElement && this.targetElement) {

			this.sourceElement.addEventListener("input", validate.bind(this));
			this.targetElement.addEventListener("input", validate.bind(this));
		}
	}
}

function validate() {

	var areRequired = (this.sourceElement.required && this.targetElement.required);
	var isValid = true;

	if (areRequired) {
		if (this.sourceElement.value && this.targetElement.value) {
			if (this.sourceElement.value != this.targetElement.value) {
				isValid = false;
			}
		}
	} else if (this.sourceElement.value != this.targetElement.value) {
		isValid = false;
	}

	if (isValid) {
		this.sourceElement.setCustomValidity("");
	} else {
		this.sourceElement.setCustomValidity(this.message);
	}
}

customElements.define("core-compare-validator", CompareValidator);

export default CompareValidator;