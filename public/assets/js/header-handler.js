/* eslint-disable no-undef, no-unused-vars */

const header = document.querySelector('header');
const dropdownButtonWrapper = document.querySelector('.dropdown-button-wrapper');
const dropdown = document.querySelector('header div.dropdown');
const allDropdownButtons = dropdownButtonWrapper.querySelectorAll('button.dropdown-button');
function navbarDropdownHandler(buttonID) {
	const allDropdownContents = dropdown.querySelectorAll('div.dropdown-content');
	const dropdownContent = document.querySelector(`.dropdown-content#${buttonID}-dropdown-content`);
	const dropdownButton = document.querySelector(`button.dropdown-button#${buttonID}-button`);
	const dropdownArrow = document.querySelector('.dropdown-arrow#navbar-dropdown-arrow');

	// hide all contents
	allDropdownContents.forEach((content) => {
		content.classList.remove('show');
	});
	// deselect all buttons
	allDropdownButtons.forEach((button) => {
		button.classList.remove('active');
	});
	// show the content of the clicked button
	dropdownContent.classList.add('show');
	// select the clicked button
	dropdownButton.classList.add('active');
	// set the dropdown height to the height of the content
	dropdown.style.height = `${dropdownContent.offsetHeight}px`;

	// move the arrow to the selected button
	dropdownArrow.style.left = `${dropdownButton.offsetLeft + dropdownButton.offsetWidth / 2 - 5}px`;

	const buttonRect = dropdownButton.getBoundingClientRect();
	const dropdownRect = dropdown.getBoundingClientRect();

	// dim the rest of the page
	header.classList.add('dropdown-active');

}

const navbarDropdownBtns = document.querySelectorAll('header .dropdown-button-wrapper button.dropdown-button');
navbarDropdownBtns.forEach((btn) => {
	[ 'click', 'mouseover' ].forEach((event) => {
		btn.addEventListener(event, () => {
			const id = btn.id.replace('-button', '');
			navbarDropdownHandler(id);
		});
	});
});
dropdownButtonWrapper.addEventListener('mouseleave', (e) => {
	const targetElement = e.relatedTarget || e.toElement;
	if (targetElement !== dropdown && !dropdown.contains(targetElement)) {
		dropdown.style.height = '0';
		header.classList.remove('dropdown-active');
		// deselect all buttons
		allDropdownButtons.forEach((button) => {
			button.classList.remove('active');
		});
	}
});
dropdown.addEventListener('mouseleave', (e) => {
	const targetElement = e.relatedTarget || e.toElement;
	if (targetElement !== dropdownButtonWrapper && !dropdown.contains(targetElement)) {
		dropdown.style.height = '0';
		header.classList.remove('dropdown-active');
		// deselect all buttons
		allDropdownButtons.forEach((button) => {
			button.classList.remove('active');
		});
	}
});

// Account widget handler
const userWidgetToggle = document.querySelector('.user-widget-toggle') ;
const userWidget = document.querySelector('.user-widget');

// Open widget on click, close locale dropdown
userWidgetToggle?.addEventListener('click', () => {
	userWidget.classList.toggle('active');
	localeOptionsContainer.classList.toggle('active');
	localeDropdownToggle.classList.toggle('active');
});

// Locale dropdown handler
function localeDropdownHandler(selectedLocale) {
	document.cookie = `preferredLocale=${selectedLocale};max-age=31536000`;
	window.location.reload();
}

const localeDropdown = document.querySelector(
	'.locale-dropdown[data-dropdown]'
);
const localeDropdownOptions = document.querySelectorAll(
	'.locale-dropdown[data-dropdown] .options-container'
);
const localeDropdownToggle = document.querySelector('.locale-dropdown-toggle');

const localeOptionsContainer = localeDropdown.querySelector('.options-container');
const localeOptionsList = localeDropdown.querySelectorAll('.option');

// click dropdown element will open dropdown
localeDropdownToggle.addEventListener('click', () => {
	localeOptionsContainer.classList.toggle('active');
	localeDropdownToggle.classList.toggle('active');
});

// clicking on any option will close dropdown and change value
localeOptionsList.forEach((option) => {
	option.addEventListener('click', () => {
		localeDropdownToggle.classList.remove('active');
		localeOptionsContainer.classList.remove('active');
		const selectedLocale = option.querySelector('label').getAttribute('for');
		localeDropdownHandler(selectedLocale);
	});
});

// close all dropdowns on scroll
document.addEventListener('scroll', () => {
	localeDropdownOptions.forEach((el) => el.classList.remove('active'));
	localeDropdownToggle.classList.remove('active');

	userWidget?.classList.remove('active');
});

// click outside of dropdown will close all dropdowns
document.addEventListener('click', (e) => {
	const targetElement = e.target;

	let found = false;
	if (
		localeDropdown == targetElement ||
		localeDropdown?.contains(targetElement)
	) {
		found = true;
		userWidget?.classList.remove('active');
	}

	if (
		userWidget == targetElement ||
	userWidget?.contains(targetElement) ||
	userWidgetToggle == targetElement ||
	userWidgetToggle?.contains(targetElement)
	) {
		found = true;
		localeDropdownToggle.classList.remove('active');
		localeOptionsContainer.classList.remove('active');
	}

	if (found) return;

	// click outside of dropdowns
	userWidget?.classList.remove('active');
	localeDropdownToggle.classList.remove('active');
	localeOptionsContainer.classList.remove('active');
});
