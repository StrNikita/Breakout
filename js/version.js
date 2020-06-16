var versionButton = document.getElementById("informationButton");
var infoBlock = document.querySelector('.informationBlock');

var isInfoOpen = false;

versionButton.addEventListener('click',openInfo);

function openInfo() {
	if (!isInfoOpen) {
		console.log('1');
		infoBlock.style.display = 'block';
		isInfoOpen = true;
	}
	else {
		infoBlock.style.display = 'none';
		isInfoOpen = false;
	}
}