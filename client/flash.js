
var typesIconCssClasses = {
	"success": "fas fa-check",
	"danger": "fas fa-bomb",
	"warning": "fas fa-exclamation",
	"info": "fas fa-info",
}

function flash(type, message) {

	notify(typesIconCssClasses[type], type, message);
}

flash.success = function(message) {

	flash("success", message);
}

flash.danger = function(message) {

	flash("danger", message);
}

flash.warning = function(message) {

	flash("warning", message);
}

flash.info = function(message) {

	flash("info", message);
}

function notify(icon, type, message) {

	var options = {
		icon: icon,
		message: message,
	};

	var settings = {
		type: type,
	}

	if (type === "danger") {
		settings.animate = {
			enter: "animated shake",
			exit: "animated fadeOutRight"
		};
	}

	$.notify(options, settings);
}

$.notifyDefaults({
	element: "body",
	position: null,
	type: "info",
	allow_dismiss: false,
	newest_on_top: true,
	showProgressbar: false,
	placement: {
		from: "bottom",
		align: "right"
	},
	offset: 30, // Bootstrap gutter $grid-gutter-width
	spacing: 16, // Bootstrap spacing 1rem
	z_index: 1031,
	delay: 5000,
	timer: 1000,
	url_target: "_blank",
	mouse_over: null,
	animate: {
		enter: "animated bounceInRight",
		exit: "animated fadeOutRight"
	},
	onShow: null,
	onShown: null,
	onClose: null,
	onClosed: null,
	icon_type: "class",
	template: `
		<div data-notify="container" class="col-xs-11 col-sm-2 alert alert-{0}" role="alert">
			<span class="mr-2" data-notify="icon"></span>
			<span data-notify="title">{1}</span>
			<span data-notify="message">{2}</span>
			<div class="progress" data-notify="progressbar">
			<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>
			</div>
			<a href="{3}" target="{4}" data-notify="url"></a>
		</div>`,
});


export default flash;