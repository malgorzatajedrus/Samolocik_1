document.addEventListener("DOMContentLoaded", function () {
	const nav = document.querySelector(".navbar");
	const allNavItems = document.querySelectorAll(".nav-link");
	const navList = document.querySelector(".navbar-collapse");
	const wrapper = document.querySelector(".wrapper");
	const loginLink = document.querySelector(".login-link");
	const registerLink = document.querySelector(".register-link");
	const btnPopup = document.querySelector(".btnLogin");
	const iconClose = document.querySelector(".icon-close");

	function addShadow() {
		if (window.scrollY >= 300) {
			nav.classList.add("shadow-bg");
		} else {
			nav.classList.remove("shadow-bg");
		}
	}

	allNavItems.forEach((item) =>
		item.addEventListener("click", () => navList.classList.remove("show"))
	);

	window.addEventListener("scroll", addShadow);

	// logowanie/rejestracja //

	registerLink.addEventListener("click", () => {
		wrapper.classList.add("active");
	});
	loginLink.addEventListener("click", () => {
		wrapper.classList.remove("active");
	});
	btnPopup.addEventListener("click", () => {
		wrapper.classList.add("active-popup");
	});
	iconClose.addEventListener("click", () => {
		wrapper.classList.remove("active-popup");
	});

	$(document).ready(function () {
		//DISABLED PAST DATES IN RESERVATION DATE //
		var dateToday = new Date();
		var month = dateToday.getMonth() + 1;
		var day = dateToday.getDate();
		var year = dateToday.getFullYear();

		if (month < 10) month = "0" + month.toString();
		if (day < 10) day = "0" + day.toString();

		var maxDate = year + "-" + month + "-" + day;

		$("#flight-date").attr("min", maxDate);
	});
});

// pobieranie wybranej ilosci pasazerow //
function selectSeats() {
	let passengers = document.getElementById("passengers");
	let numOfPassengers = passengers.options[passengers.selectedIndex].value;
	console.log(numOfPassengers);
	sessionStorage.setItem("numOfPassengers", numOfPassengers);
	return numOfPassengers;
}

// pobieranie wybranego lotniska przylotu //
function arrivalCity() {
	let arrival = document.getElementById("flight-to");
	let arrivalCitySelected = arrival.options[arrival.selectedIndex].value;
	sessionStorage.setItem("arrivalCitySelected", arrivalCitySelected);
	return arrivalCitySelected;
}

// pobieranie wybranej daty wylotu //
function flightDate() {
	let date = new Date($("#flight-date").val());
	let day = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();
	let flightDateSelected = [day, month, year].join("/");
	sessionStorage.setItem("flightDateSelected", flightDateSelected);
	return flightDateSelected;
}

// blokada wyboru wiekszej ilosci miejsc w samolocie od wybranej ilosci pasazerow //
function checkBoxLimit() {
	const checkBoxGroup = document.forms["plane-seat"]["check[]"];
	let numToSelect = sessionStorage.getItem("numOfPassengers");
	for (let i = 0; i < checkBoxGroup.length; i++) {
		checkBoxGroup[i].onclick = function () {
			let checkedcount = 0;
			for (let i = 0; i < checkBoxGroup.length; i++) {
				checkedcount += checkBoxGroup[i].checked ? 1 : 0;
			}
			if (checkedcount > numToSelect) {
				console.log("Możesz wybrać maksymalnie miejsc " + numToSelect);
				alert("Możesz wybrać maksymalnie miejsc " + numToSelect);
				this.checked = false;
			}
		};
	}
}

// sprawdzenie czy wybrano taka sama ilosc miejsc w samolocie, co wybrana ilosc pasazerow // 
function checkSelectedSeats() {
	function countSelectedSeats() {
		const checkBoxGroup = document.forms["plane-seat"]["check[]"];
		let count = 0;
		let checkedSeats = [];
		for (let i = 0; i < checkBoxGroup.length; i++) {
			if (
				checkBoxGroup[i].type === "checkbox" &&
				checkBoxGroup[i].checked === true
			) {
				count++;
				checkedSeats.push(checkBoxGroup[i].id);
				console.log(checkedSeats);
				sessionStorage.setItem("checkedSeats", checkedSeats);
			}
		}

		return count;
	}
	let numToSelect = sessionStorage.getItem("numOfPassengers");
	let selectedSeats = countSelectedSeats();
	const selectedBtn = document.getElementById("submitSeats");

	if (selectedSeats < numToSelect) {
		console.log(
			"Wybrałeś za małą ilość miejsc, proszę wybrać miejsc " + numToSelect
		);
		alert(
			"Wybrałeś za małą ilość miejsc, proszę wybrać miejsc " + numToSelect
		);
	} else {
		selectedBtn.href = "reservationdetails.html";
	}
}
// pobieranie danych z podstrony reservationdetails.html // 
function getReservationDetails() {
	const nameDetails = document.getElementById("pass-name").value;
	const emailDetails = document.getElementById("email").value;
	const phoneDetails = document.getElementById("phone-number").value;

	console.log(nameDetails, emailDetails, phoneDetails);

	sessionStorage.setItem("nameDetails", nameDetails);
	sessionStorage.setItem("emailDetails", emailDetails);
	sessionStorage.setItem("phoneDetails", phoneDetails);

	return nameDetails, emailDetails, phoneDetails;
}

// przekazanie danych z podstrony reservationdetails.html do podstrony summary.html // 
function reservationSummary() {
	const summaryName = sessionStorage.getItem("nameDetails");
	const summaryEmail = sessionStorage.getItem("emailDetails");
	const summaryPhone = sessionStorage.getItem("phoneDetails");
	const summaryArrival = sessionStorage.getItem("arrivalCitySelected");
	const summaryPassengers = sessionStorage.getItem("numOfPassengers");
	const summaryDate = sessionStorage.getItem("flightDateSelected");
	const summarySeats = sessionStorage.getItem("checkedSeats");

	document.getElementById("name-details").innerHTML = summaryName;
	document.getElementById("email-details").innerHTML = summaryEmail;
	document.getElementById("phone-details").innerHTML = summaryPhone;
	document.getElementById("destination-flight").innerHTML = summaryArrival;
	document.getElementById("passengers-number").innerHTML = summaryPassengers;
	document.getElementById("flight-date").innerHTML = summaryDate;
	document.getElementById("seats-numbers").innerHTML = summarySeats;
}



function bookFlight() {
	const email = sessionStorage.getItem("emailDetails");
	const bookFlightBtn = document.getElementById("book-flight");
	alert(
		"Lot został zarezerwowany. Twój nr rezerwacji to: 123456789. Potwierdzenie zostało wysłane na podany adres e-mail: " +
			email +
			". Dziękujemy! :)"
	);

	bookFlightBtn.href = "index.html";
}
