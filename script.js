console.log("---------------------------------------------------")
console.log("Інструменти розробника")
console.log("Функція resetStats - видаляє статистику")
console.log("Функція incremetStats - змінює статистику")
console.log("---------------------------------------------------")

const menuBtn = document.querySelector('.menu-button');
const menu = document.querySelector('.adaptive-menu')

function adaptive(){
	menu.classList.toggle('active');
	menuBtn.classList.toggle('active');
}

let formOne = document.getElementById("form1");
let formTwo = document.getElementById("form2");
let formThree = document.getElementById("form3");
let close = document.getElementById("close");
let header = document.getElementById("header");
let virsh = document.getElementById('virsh');
let name = document.getElementById('name');
let difficult = document.getElementById('difficult');
let start = document.getElementById('start');
let strings = [];
let anscheck = document.getElementById('anscheck');
let userAnswer = document.getElementById('answer');
let enter = document.getElementById('enter');
let btn1 = document.getElementById('btn1');
let percent = document.getElementById('percent')
let toggle = document.getElementById('toggle')
let wrapper = document.querySelector('.wrapper')
let lang = document.getElementById("lang")
let errorDiv = document.getElementById("error")


// Викликаємо помилки
let userCan = true;
let errorCan = true;
let errorCanTwo = true;
function viewError(message, seconds){
	if(errorCan && userCan){
		if(errorCanTwo === false) deshowStats()
		errorCan = false;
		errorDiv.style.display = "flex";
		document.getElementById("error-text").innerHTML = message;
		header.style.borderRadius = "0px 0px 0px 20px";
		setTimeout(function(){
			errorDiv.style.animation = "move 1s ease 1";
		}, 1000)
		setTimeout(function(){
			errorDiv.style.animation = "demove 1s ease 1";
		},seconds)
		setTimeout(function(){
			header.style.borderRadius = "0px 0px 20px 20px";
			errorDiv.style.display = "none";
			errorCan = true;
			errorDiv.style.animation = "move 1s ease 1";
		},seconds+900)
	}
}

// Перевірка умов

let isDifficult = false;
function checkStart(){
	if(!difficult.value.length) isDifficult = false;
	userAnswer.value = "";
	if(virsh.value.length) {
		strings = virsh.value.split("\n");
		for(let i = 0; i < strings.length; i++){
			if(!strings[i] || !strings[i].length){
				strings.splice(i, 1)
				i--;
			}
		}
		if(+difficult.value.length && +difficult.value < 1) {
			if(lang.innerHTML.toLowerCase() === "en"){
				viewError("Складність повинна бути дорівнювати або більше 1", 4000)
			} else viewError("Difficulty must be equal to or greater than 1", 4000)
			isDifficult = false;
			return false;
		} else if(+difficult.value) isDifficult = true;
		if(+start.value.length){
			if(+start.value < 1 || +start.value > strings.length || +start.value === 0){
				if(lang.innerHTML.toLowerCase() === "en"){
					viewError("Значення поля `з якого рядка` повинно бути більше 0, і не більше кількості рядків", 4000)
				} else viewError("The value of the 'starting line' field mustbe greater than 0 and not exceed the number of lines", 4000)
				return false;
			}
		}
		startPoemix()
	} else {
		if(lang.innerHTML.toLowerCase() === "en"){
			viewError("Заповніть поле 'Вірш'", 4000)
		} else viewError("Fill in the 'Poem' field", 4000)
		return false;
	}
}

function anscheckOne(){
	if(isDifficult) {
		let arr = answerik.split(" ");
		arr = arr.slice(0, +difficult.value)
		return arr.join(" ")
	} else return answerik
}

let answerik;
// Початок Віршича
function startPoemix(){
	// обнулення
	percent.innerHTML = "0%"
	errors = 0;
	views = 0;

	if(now && !start.value) now = 1;
	else if(now && start.value) now = +start.value;
	enter.innerHTML = now + "";
	gotoForm(`form1`, `form2`)
	answerik = strings[now-1];
	anscheck.innerHTML = anscheckOne()
}


// Наступна строка
let errors = 0;
let now = 1;

function nextString(){
	// обнулення
	percentvalue = 0;
	percentcount = 0;
	percent.innerHTML = "0%";

	console.log("Правильна відповідь: " + answerik)
	let twoRightAnswer = answerik.toLowerCase().replace(/[\.\?,!]/g, "")
	if(userAnswer.value.toLowerCase() === twoRightAnswer){
		if(now === strings.length) endPoemix()
		enter.innerHTML = now + 1 + "";
		answerik = strings[now]
		anscheck.innerHTML = anscheckOne()
		now++;
		userAnswer.value = "";
		userAnswer.focus();
	} else {
		if(lang.innerHTML.toLowerCase() === "en"){
			viewError("Відповідь не правильна", 4000)
		} else viewError("The answer is incorrect", 4000)
		errors++;
	}
}

window.addEventListener('keydown', function(event) {
	if (event.key === 'Enter' && formTwo.style.display === "flex") {
		nextString()
	}
});

// Відображання статистики
let nowEl;
let isStatsShow = false;
function showStats(id){
	errorCanTwo = false;
	nowEl = document.getElementById(id)
	if(isStatsShow && userCan){
		deshowStats(true)
	} else if(userCan && errorCan){
		nowEl.style.display = "flex";
		nowEl.style.animation = "move 1s ease 1";
		userCan = false;
		header.style.borderRadius = "0px 0px 0px 20px";
		setTimeout(function() {
			isStatsShow = true;
			userCan = true;
		},900)
	}
	document.getElementById("virshstat").innerHTML = getStat("statPoems")
	document.getElementById("strstat").innerHTML = getStat("statStrings")
	document.getElementById("errorstat").innerHTML = getStat("statErrors")
	document.getElementById("viewstat").innerHTML = getStat("statViews")
}
function deshowStats(need = false){
	nowEl.style.animation = "demove 1s ease 1";
	userCan = false;
	setTimeout(function() {
		nowEl.style.display = "none";
		isStatsShow = false;
		if(need === true){
			header.style.borderRadius = "0px 0px 20px 20px";
		}
		userCan = true;
		errorCanTwo = true;
	}, 900)
}
function incrementStat(statName, increment) {
    let currentStat = localStorage.getItem(statName);
    if (currentStat) {
        currentStat = parseInt(currentStat) + increment;
    } else {
        currentStat = increment;
    }
    localStorage.setItem(statName, currentStat);
    console.log("Комірка " + statName + " була успішно змінена на " + increment)
}
function getStat(statName) {
    return localStorage.getItem(statName) || 0;
}
function resetStats(statName) {
	if(statName.toLowerCase() === "all") {
		localStorage.removeItem('statPoems');
		localStorage.removeItem('statErrors');
		localStorage.removeItem('statViews');
		localStorage.removeItem('statStrings');
		console.log("Вся статистика була видалена.")
	} else {
		localStorage.removeItem('statName');
		console.log("Комірка " + statName + "була успішно анульована.")
	}
}
function showPercent(){
	let percentvalue = 0;
	let percentcount = 0;
	let percentanswer = answerik.toLowerCase().replace(/[\.\?,!]/g, "");
	let percentUserAnswer = userAnswer.value.toLowerCase()

	for(let i = 0; i < percentUserAnswer.length; i++){
		if(percentUserAnswer[i] === percentanswer[i]){
			percentcount += 1;
		} else if(percentUserAnswer.length > percentanswer.length){
			percentcount -= (percentUserAnswer.length - percentanswer.length);
		}
	}
	if(userAnswer.value.length > 0){
		percentvalue = 100 * (percentcount / percentanswer.length).toFixed(2)
	}
	if(percentvalue <= 0) percent.innerHTML = 0 + "%";
	else percent.innerHTML = percentvalue.toFixed(0) + "%";
}

let views = 0;
function viewTrue(){
	views++;
	gotoForm(`form3`, `form2`);
}
// Кінець Віршича
function endPoemix(){
	isDifficult = false;
	gotoForm(`form2`, `form5`);
	if(!name.value.length){
	if(lang.innerHTML.toLowerCase() === "en"){
			document.getElementById('nameval').innerHTML = "Назва не вказана"
	} else document.getElementById('nameval').innerHTML = "Title not specified"
	}
	else document.getElementById('nameval').innerHTML = name.value;
	document.getElementById('errorval').innerHTML = errors;
	document.getElementById('viewval').innerHTML = views;
	if(start.value) document.getElementById('lenval').innerHTML = strings.length - start.value + 1;
	else document.getElementById('lenval').innerHTML = strings.length;
	incrementStat("statPoems", 1);
	incrementStat("statStrings", strings.length);
	incrementStat("statErrors", errors);
	incrementStat("statViews", views);
}


let fontCount = 0;
let all = document.querySelectorAll("*") 
function fontFunc(){
	fontCount++;
	if(fontCount === 7) fontCount = 1;
	if(fontCount > 3) {
		all.forEach(el => {
		let fontSize = window.getComputedStyle(el).fontSize;
  		let newFontSize = parseFloat(fontSize) - 1;
  		el.style.fontSize = `${newFontSize}px`;
	})
	} else {
		all.forEach(el => {
		let fontSize = window.getComputedStyle(el).fontSize;
  		let newFontSize = parseFloat(fontSize) + 1;
  		el.style.fontSize = `${newFontSize}px`;
	})
	}

}

// Теми
let inputs = document.querySelectorAll(".dt-input");
let btnElements = document.querySelectorAll('#btn1');
let themeElements = document.querySelectorAll('.dt');
let arrow = document.getElementById('arrow');
let clicks = 0;
function setTheme(isClick = false){
  // Перевіряємо стан чекбокса
	if(isClick) clicks++;
  if (toggle.checked || clicks % 2 !== 0) {
    themeElements.forEach(el => {
      el.style.backgroundColor = '#242424'; // Темний фон
    });
    btnElements.forEach(el => {
    	el.classList.add("dt-btn")
    })
    inputs.forEach(el => {
    	el.classList.add("dark-input")
    })
    document.querySelector(".adaptive-menu").style.background = "rgba(0, 0, 0, 0.40)"
    arrow.classList.add("white-Arrow")
    wrapper.style.backgroundColor = "#161616"
    document.documentElement.style.setProperty('--scrollbar-track-bg', '#505050');
  } else if(toggle.checked === false || clicks % 2 === 0){
    themeElements.forEach(el => {
      el.style.backgroundColor = '#0F0F10'; // Світлий фон
    });
       btnElements.forEach(el => {
    	el.classList.remove("dt-btn")
    })
    inputs.forEach(el => {
    	el.classList.remove("dark-input")
    })
    arrow.classList.remove("white-Arrow")
    document.querySelector(".adaptive-menu").style.background = "rgba(0, 0, 0, 0.90)"
    wrapper.style.backgroundColor = "#fff"
    document.documentElement.style.setProperty('--scrollbar-track-bg', '#fff');
  }
}

// Переходи по формам
function gotoForm(parid, form){
	let oldEl = document.getElementById(parid);
	let newEl = document.getElementById(form);
	oldEl.style.opacity = "1";
	oldEl.style.opacity = "0";
	newEl.style.opacity = "0";
	setTimeout(function(){
		oldEl.style.display = "none";
		newEl.style.display = "flex";
		setTimeout(function(){
			newEl.style.opacity = "1";
		},100)
	},200)
}