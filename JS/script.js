function redirectToResultPage() {

	event.preventDefault();
	// Retrieve the values from the input fields
	var initialLocation = document.getElementById("email").value;
	var goal = document.getElementById("password").value;

	if (!initialLocation || !goal) {
		return;
	}
	// Construct the URL for the result page with query parameters
	var url = "result.html?initialLocation=" + encodeURIComponent(initialLocation) + "&goal=" + encodeURIComponent(goal);

	// Redirect the user to the result page
	window.location.href = url;
}

let locations = ["Purabaya", "Dukuh Menanggal", "Siwalankerto", "Taman Pelagi", "RS Bhayangkara", "UBHARA", "PUSVETMA", "Wonokromo",
	"Joyoboyo", "Museum BI", "Rumah Sakit Darmo", "Pandegiling", "Basra", "Kaliasin", "Embong Malang", "Blauran", "Pringadi", "Pasar Turi",
	"Masjid Kemayoran", "Indrapura", "Rajawali", "Jembatan Merah", "Veteran", "Tugu Pahlawan", "Alun Alun Contong", "Siola", "Tunjungan",
	"Simpang Dukuh", "Gubernur Suryo", "Pangsud", "Sono Kembang", "Urip Sumoharjo", "Santa Maria", "RSAL", "Margorejo", "UIN",
	"Jemur Ngawinan", "Kerto Menanggal", "Terminal Purabaya", "Ketintang", "Mayjen Yono Suwoyo", "Ir Muhammad", "Mayjen Sungkono",
	"Adityawarman", "Kutai", "Bengawan", "Raya Darmo", "Urip Sumohario", "Embong Malang", "Praban", "Tunjungan", "Gubenur Suryo",
	"Yos Sudarso", "Walikota Mustajab", "Prof Dr Moestopo", "Jalam Dramawangsa", "Kertajaya", "Manyar Kortoarjo", "Kertajaya Indah",
	"Bundaran ITS", "Gubeng Pojok", "Pemuda", "Panglima Sudirman", "HR Muhammad"];
// Sort locations in ascending order
let sortedLocations = locations.sort();

// Reference the input fields with ids "email" and "password"
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");

// Execute function on keyup for the email input
emailInput.addEventListener("input", () => {
	handleAutocomplete(emailInput);
});

// Execute function on keyup for the password input
passwordInput.addEventListener("input", () => {
	handleAutocomplete(passwordInput);
});

function handleAutocomplete(input) {
	// Create or get the autocomplete list for the specific input field
	let list = getOrCreateAutocompleteList(input);

	// Clear previous suggestions
	removeElements(list);

	// Loop through the array of locations
	for (let loc of sortedLocations) {
		// Convert input to lowercase and compare with each location
		if (
			loc.toLowerCase().startsWith(input.value.toLowerCase()) &&
			input.value != ""
		) {
			// Create li element
			let listItem = document.createElement("li");
			// One common class name
			listItem.classList.add("list-items");
			listItem.style.cursor = "pointer";
			listItem.setAttribute("onclick", `displayLocation('${loc}', '${input.id}')`);
			// Display matched part in bold
			let word = "<b>" + loc.substr(0, input.value.length) + "</b>";
			word += loc.substr(input.value.length);
			// Display the value in the array
			listItem.innerHTML = word;
			list.appendChild(listItem);
		}
	}
}

function displayLocation(value, inputId) {
	// Display the selected value in the corresponding input field
	document.getElementById(inputId).value = value;

	// Clear the autocomplete list for the specific input field
	let list = getOrCreateAutocompleteList(document.getElementById(inputId));
	removeElements(list);
}

function removeElements(list) {
	// Clear all the items in the specified list
	let items = list.querySelectorAll(".list-items");
	items.forEach((item) => {
		item.remove();
	});
}

function getOrCreateAutocompleteList(input) {
	// Try to find an existing list associated with the input field
	let list = input.nextElementSibling;
	if (!list || !list.classList.contains("list")) {
		// If the list doesn't exist, create a new one
		list = document.createElement("ul");
		list.classList.add("list");
		input.parentNode.insertBefore(list, input.nextSibling);
	}
	return list;
}


'use strict';

$(function () {

	$("input[type='password'][data-eye]").each(function (i) {
		var $this = $(this),
			id = 'eye-password-' + i,
			el = $('#' + id);

		$this.wrap($("<div/>", {
			style: 'position:relative',
			id: id
		}));

		$this.css({
			paddingRight: 60
		});
		$this.after($("<div/>", {
			html: 'Show',
			class: 'btn btn-primary btn-sm',
			id: 'passeye-toggle-' + i,
		}).css({
			position: 'absolute',
			right: 10,
			top: ($this.outerHeight() / 2) - 12,
			padding: '2px 7px',
			fontSize: 12,
			cursor: 'pointer',
		}));

		$this.after($("<input/>", {
			type: 'hidden',
			id: 'passeye-' + i
		}));

		var invalid_feedback = $this.parent().parent().find('.invalid-feedback');

		if (invalid_feedback.length) {
			$this.after(invalid_feedback.clone());
		}

		$this.on("keyup paste", function () {
			$("#passeye-" + i).val($(this).val());
		});
		$("#passeye-toggle-" + i).on("click", function () {
			if ($this.hasClass("show")) {
				$this.attr('type', 'password');
				$this.removeClass("show");
				$(this).removeClass("btn-outline-primary");
			} else {
				$this.attr('type', 'text');
				$this.val($("#passeye-" + i).val());
				$this.addClass("show");
				$(this).addClass("btn-outline-primary");
			}
		});
	});

	$(".my-login-validation").submit(function () {
		var form = $(this);
		if (form[0].checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}
		form.addClass('was-validated');
	});
});
