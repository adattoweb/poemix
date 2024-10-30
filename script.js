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
function trimAll(str){
	let arr = str.split("");
	for(let i = 0; i < arr.length; i++){
		if(arr[i] === " "){
			for(let j = i + 1; j < arr.length; j++){
				if(arr[j] === " "){
					arr.splice(j, 1);
					j--;
				} else j = Infinity;
			}
		}
	}
	return arr.join("")
}

let historyLimit = 4;
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
let poslidov = document.getElementById("poslidov")
let mozaika = document.getElementById("mozaika")
let kombinov = document.getElementById("kombinov")
let difbl = document.getElementById("difbl")
let difcheck = document.getElementById("difcheck")
let amountstring = document.getElementById("amounstring")
let selectBlocks = document.getElementById("select-block")
let mozaikaBlocks = document.getElementById("mozaika-blocks")
let mozaikaanswer = document.getElementById("mozaikaanswer")
let poslidovNow = 0;
const checknow = document.getElementById("checknow")
let mozaikanow = document.getElementById("mozaikanow")
let historycontent = document.getElementById("history-con")
let content = document.getElementById("content")
let ht = document.getElementById('ht')
let timer = document.getElementById('timer')
let timerBlock = document.querySelector('.timer')
let timerInterval;
let timeTimeout;
let countShow = 0;
let countCicle = 0;
let howNeed = 0;
let countRender = 0;
let d1 = document.getElementById("d1")
let numofpoemix = 10;

if(localStorage.getItem("arrKeys") === null){
	localStorage.setItem('arrKeys', '')
}
let historyArr = localStorage.getItem("arrKeys").split(",");


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

function convertToISO(dateString) {
    // Розбиваємо рядок на частини
    const [day, month, yearTime] = dateString.split(".");
    const [year, time] = yearTime.split(" ");
    
    // Формуємо новий рядок у форматі ISO
    return `${year}-${month}-${day}T${time}`;
}


// Перевірка умов
function checkBox(id){
	if(document.getElementById(id).checked){
		if(id !== "mozaika") difcheck.style.display="flex"
	} else {
		difcheck.style.display="none";
	}
}


let isDifficult = false;
function checkStart(){
	if(virsh.value.length <= 2) {
		if(lang.innerHTML.toLowerCase() === "en"){
			viewError("Довжина вірша повинна бути більше ніж 2 рядка", 4000)
		} else viewError("The length of the poem should be more than 2 lines", 4000)
		return false;
	}
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
		if(mozaika.checked && poslidov.checked){
			if(lang.innerHTML.toLowerCase() === "en"){
					viewError("Оберіть один чекбокс!", 4000)
				} else viewError("Select one checkbox", 4000)
			return false
		}
		if(poslidov.checked){
			if(!amountstring.value.length) {
				amounstring.value = 3
				if(lang.innerHTML.toLowerCase() === "en"){
					viewError("Заповніть рядок 'кількість варіантів'", 4000)
				} else viewError("Fill in the field 'the number of options'", 4000)
				return false;
			}
			if(+amounstring.value <= 1){
				if(lang.innerHTML.toLowerCase() === "en"){
					viewError("В поле 'кількість варіантів' введіть значення більше", 4000)
				} else viewError("Enter a bigget value in the 'the number of options' field", 4000)
				return false;
			} 
			if(+amountstring.value > strings.length){
				if(lang.innerHTML.toLowerCase() === "en"){
					viewError("В поле 'кількість варіантів' введіть значення менше", 4000)
				} else viewError("Enter a smaller value in the 'the number of options' field", 4000)
				return false;		
			}
		}
			if(timer.value.length > 0 && +timer.value < 0 || timer.value.length > 0 && +timer.value > 10000){
				if(lang.innerHTML.toLowerCase() === "en"){
					viewError("Введіть значення в поле 'таймер' більше або менше: мінімум 5 максімум 10000", 4000)
				} else viewError("Enter a value in the 'timer' field greater or less than: minimum 5 maximum 10000", 4000)
				return false;	
			} else if(timer.value.length > 0){
				timerBlock.innerHTML = timer.value
				timerBlock.style.display="block";
				let time = 0;
				timerInterval = setInterval(() => {
					time++;
					timerBlock.innerHTML = timer.value - time;
					console.log("Інтервал працює")
				}, 1000)
				timeTimeout = setTimeout(() => {
					if(poslidov.checked && window.getComputedStyle(timerBlock).display != "none"){
						gotoForm(`form6`, `form5`)
						endPoemix(false)
					} else if(mozaika.checked && window.getComputedStyle(timerBlock).display != "none"){
						gotoForm(`form7`, `form5`)
						endPoemix(false)
					} else {
						if(window.getComputedStyle(timerBlock).display != "none"){
							endPoemix()
						}
					}
					clearInterval(timerInterval)
					time = 0;
					timerBlock.style.display="none"
				}, timer.value * 1000)
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
let views = 0;
function viewTrue(){
	views += 1;
	console.log(views)
	if(poslidov.checked) gotoForm(`form3`, `form6`);
	else if(mozaika.checked) gotoForm(`form3`, `form7`);
	else gotoForm(`form3`, `form2`);
}
let answerik;

// Початок Віршича
function startPoemix(){
	// обнулення
	clearMozaika();
	selectBlocks.innerHTML = "";
	blackArr = []
	percent.innerHTML = "0%"
	errors = 0;
	views = 0;
	mozaikanow.innerHTML = "1"

	if(now && !start.value) now = 1;
	else if(now && start.value) now = +start.value;
	enter.innerHTML = now + "";
	checknow.innerHTML = poslidovNow + 1 + "";
	if(poslidov.checked){
		poslidovNow = 0;
		checknow.innerHTML = poslidovNow + 1 + "";
		gotoForm(`form1`, `form6`)
		generatePoslidov(poslidovNow, +amounstring.value, true)
	} else if(mozaika.checked) {
		gotoForm(`form1`, `form7`)
		renderMozaika(now-1)
	} else {
		gotoForm(`form1`, `form2`)
	}
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
	let twoRightAnswer = answerik.toLowerCase().replace(/[\.\?,!\-]/g, "").trim()
	twoRightAnswer = trimAll(twoRightAnswer)
	if(mozaika.checked) {
		userAnswer.value = mozaikaUserAnswer.join("").trim()
	}
	if(userAnswer.value.toLowerCase() === twoRightAnswer.trim() || 
		userAnswer.value.toLowerCase() === answerik.toLowerCase()){
		if(now === strings.length && !mozaika.checked) {
			endPoemix()
			return false
		}
		if(now === strings.length && mozaika.checked) {
			endPoemix(false);
			gotoForm(`form7`, `form5`)
			return false
		}
		enter.innerHTML = now + 1 + "";
		answerik = strings[now]
		anscheck.innerHTML = anscheckOne()
		now++;
		userAnswer.value = "";
		userAnswer.focus();
		if(mozaika.checked){
			mozaikaUserAnswer = [];
			mozaikaanswer.innerHTML = ""
			console.log(mozaikanow, now)
			clearMozaika()
			renderMozaika(now-1)
			mozaikanow.innerHTML = now + "";
		}
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




// checkboxes functions

function randomaiser(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomString(idCurrent){
	let randN = randomaiser(0, strings.length - 1)
	while(randN === idCurrent){
		randN = randomaiser(0, strings.length - 1)
	}
	return [randN, strings[randN]]
}

let blackArr = []
function generatePoslidov(idCurrent, amount=3, isClear = false){
	if(isClear){
		selectBlocks.innerHTML = "";
		blackArr = [];
	}
	let randX = randomaiser(1, amount);
	for(let i = 1; i < amount; i++){
		if(i === randX){
			selectBlocks.innerHTML +=  `<div onclick="choosePoslidov('rightanswer')" id="rightanswer" class="select-child">${strings[idCurrent]}</div>`
		}
		let res = randomString(idCurrent)
		while(blackArr.includes(res[0])) {
			res = randomString(idCurrent)
			console.log(res[0])
			console.log(blackArr)
		}
		selectBlocks.innerHTML += `<div onclick="choosePoslidov(${i})" id="${i}" class="select-child">${res[1]}</div>`
		blackArr.push(res[0])
	}
	if(randX === amount){
		selectBlocks.innerHTML +=  `<div onclick="choosePoslidov('rightanswer')" id="rightanswer" class="select-child">${strings[idCurrent]}</div>`
	}
}

let poslidovAnswer = "AIN";

function choosePoslidov(id){
	let currentEl = document.getElementById(id)
	currentEl.classList.toggle('active')
	selectBlocks.childNodes.forEach(el => {
		if(el.classList.value.includes("active") && el.id != id){
			el.classList.toggle('active')
		}
	})
	poslidovAnswer = currentEl.innerHTML;
}

function nextPoslidov(){
	console.log(answerik)
	if(poslidovAnswer === answerik){
		poslidovNow +=1;
		console.log(poslidovNow + "(Змінено)")
		answerik = strings[poslidovNow]
		console.log(answerik + "(Змінено)")
		if(answerik === undefined){
			endPoemix(false);
			gotoForm(`form6`, `form5`)
			poslidovAnswer = "AIN"
			return false;
		}
		poslidovAnswer = "AIN" // answer is none
		anscheck.innerHTML = anscheckOne()
		checknow.innerHTML = poslidovNow + 1 + "";
		generatePoslidov(poslidovNow, +amounstring.value, true)
	} else if(poslidovAnswer === "AIN"){
		if(lang.innerHTML.toLowerCase() === "en"){
			viewError("Оберіть Вашу відповідь!", 4000)
		} else viewError("Select your answer", 4000)
	} else {
		selectBlocks.childNodes.forEach(el => {
			if(el.classList.value.includes("active")){
				el.classList.toggle('active')
				el.classList.toggle('false')
				setTimeout(() => {
					el.classList.toggle('false')
				}, 3000)
			}
		})
		errors++;
	}
}

function clearMozaika(){
	mozaikaUserAnswer = []
	mozaikaanswer.innerHTML = "";
	mozaikaBlocks.innerHTML = "";
}

let mozaikaUserAnswer = [];
function renderMozaika(id){
	let usesArr = []
	console.log(strings[id])
	let mozArr = trimAll(strings[id].toLowerCase().replace(/[\.\?,!\-]/g, "").trim()).split(" "); // по суті wordsArr
	console.log(mozArr)
	while(usesArr.length !== mozArr.length){
		let randN = randomaiser(0, mozArr.length-1)
		if(usesArr.includes(randN) === false){
			mozArr[randN] = trimAll(mozArr[randN].toLowerCase().replace(/[\.\?,!\-]/g, "").trim())
			mozaikaBlocks.innerHTML += `<div id="moz-${randN}" onclick = "chooseMozaika('moz-${randN}')" class="mozaika-child">${mozArr[randN]}</div>`
			usesArr.push(randN)
		}
	}
}

function chooseMozaika(id){
	let currentEl = document.getElementById(id)
	currentEl.classList.toggle('active')
	setTimeout(function(){
		currentEl.classList.toggle('active')
	}, 500)
	mozaikaUserAnswer.push(currentEl.innerHTML + " ")
	mozaikaanswer.innerHTML = mozaikaUserAnswer.join("")}

function deleteMozaika(){
	mozaikaUserAnswer.pop()
	mozaikaanswer.innerHTML = mozaikaUserAnswer.join("")
}



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

function addHistory(historyKey, historyValue){
	let currentHistory = localStorage.getItem(`history${historyKey}`)
	if(localStorage.getItem("arrKeys") === null || localStorage.getItem("arrKeys").length === 0) {
		localStorage.setItem('arrKeys', `history${historyKey}`)
	} else {
		localStorage.setItem('arrKeys', localStorage.getItem("arrKeys") + ',' + `history${historyKey}`)
	}
	// console.log(localStorage.getItem("arrKeys"))
	// console.log(currentHistory)
	if(currentHistory) {
		console.error("Помилка у функції addHistory: Збіг параметрів.")
		return false
	} else {
		localStorage.setItem(`history${historyKey}`, historyValue)
	}
}

if(historyArr.length > historyLimit){
	let tempArr = historyArr.reverse();
	tempArr = tempArr.slice(0, historyLimit)
	historyArr = tempArr.reverse();
	localStorage.setItem('arrKeys', historyArr)
	console.log("СПРАЦЮВАЛО")
	console.log(historyArr)
	console.log(localStorage.getItem('arrKeys'))
}
console.log(historyArr)
console.log(localStorage.getItem(historyArr[0]))

function plusHistory(n){
	if(numofpoemix >= historyLimit){
		if(lang.innerHTML.toLowerCase() === "en"){
			viewError("Більше не можна вивести елементи", 4000)
		} else viewError("More elements cannot be displayed", 4000)
	} else {
		numofpoemix += n;
		renderHistory(n, false)
		document.getElementById('numofpoemix').innerHTML = numofpoemix
	}
}

function deleteHistory(historyKey){
	if(localStorage.getItem(historyKey) === null){
		console.log("Такого елемента не існує!")
		return false
	}
	for(let i = 0; i < historyArr.length; i++){
		if(historyArr[i].includes(historyKey)){
			historyArr.splice(i, 1)
		}
	}
	localStorage.removeItem(historyKey)
	document.getElementById(historyKey).style.display = "none";
	console.log(historyArr)
	localStorage.setItem('arrKeys', historyArr)
	console.log(`Успішно видалено ${historyKey}`)
}
function historyShow(){
	countShow++;
	content.classList.toggle('active')
	historycontent.classList.toggle('active')
	if(ht.innerHTML=== "Історія" || ht.innerHTML === "History") {
		if(countShow === 1) renderHistory(10) // якщо хочеш зробити щоб рендерилось тільки перший раз
		if(lang.innerHTML === "EN") {ht.innerHTML = "Головна"; d1.innerHTML = "Головна"}
		else {ht.innerHTML = "Main"; d1.innerHTML = "Main"}
	}
	else {
		if(lang.innerHTML === "EN") {ht.innerHTML = "Історія"; d1.innerHTML = "Історія"}
		else {ht.innerHTML = "History"; d1.innerHTML = "History"}
	}
}
function updateHistory(){
	countCicle = 0;
	howNeed = 0;
	countRender = 0;
	historyArr = localStorage.getItem("arrKeys").split(",");
	for(let i = 0; i < historycontent.children.length; i++){
		if(historycontent.children[i].classList.value.includes("history-block")){
			historycontent.children[i].style.display="none"
		}
	}
	renderHistory(numofpoemix)
}
function copyPoemix(data){
	data = data.split(",")
	name.value = data[1]
	virsh.value = data[0];
	historyShow()
}
function renderHistory(n=50, startWithStart = true){
	countRender++;

	if(historyArr.length === 0 || historyArr[0].length === 0 || localStorage.getItem('arrKeys') === null) {
		if(lang.innerHTML === "EN"){
			historycontent.innerHTML = "Упс... Історія пуста, повивчайте декілька віршів щоб поповити її!"
			return false;
		} else {
			historycontent.innerHTML = "Oops... The story is empty, learn some verses to fill it up!"
			return false;
		}
	}

	if(startWithStart === true || countRender === 0) howNeed = historyArr.length;
	else {
		howNeed -= n - 1;
	}
	console.log(howNeed)
	console.log(howNeed - n - 1)
	console.log("---------")
	for(let i = howNeed-1; i >= 0; i--){
		countCicle++;
		if(i === howNeed - n - 1) break;
		let arrValues = localStorage.getItem(historyArr[i]).split(",")
		if(lang.innerHTML === "EN"){
			historycontent.innerHTML += `
		<div id=${historyArr[i]} class="history-block flex dt">
			<div class="history-one">
				<div class="history-header flex">
				<h4 class="history-name">${arrValues[0]}</h4>
			</div>
				<div class="history-stats">
					<h3>Статистика</h3>
					<p>Всього рядків: <span>${arrValues[1]}</span></p>
					<p>Всього помилок допущено: <span>${arrValues[2]}</span></p>
					<p>Всього підглядувань: <span>${arrValues[3]}</span></p>
				</div>
			</div>
			<div class="history-two flex flexdc">
				<p class="history-date">${historyArr[i].replace("history", "").replace("_", " ")}</p>
				<img onclick="deleteHistory('${historyArr[i]}')" class="history-img" src="./delete.png" alt="Видалити">
				<img onclick="copyPoemix('${[arrValues[4], arrValues[0]]}')" class="history-img" src="./copy.png" alt="Копіювати">
			</div>
		</div>`
		} else {
		historycontent.innerHTML += `
		<div id=${historyArr[i]} class="history-block flex dt">
			<div class="history-one">
				<div class="history-header flex">
				<h4 class="history-name">${arrValues[0]}</h4>
			</div>
				<div class="history-stats">
					<h3>Statistics</h3>
					<p>Total lines: <span>${arrValues[1]}</span></p>
					<p>Total errors made: <span>${arrValues[2]}</span></p>
					<p>Total peeks: <span>${arrValues[3]}</span></p>
				</div>
			</div>
			<div class="history-two flex flexdc">
				<p class="history-date">${historyArr[i].replace("history", "").replace("_", " ")}</p>
				<img onclick="deleteHistory('${historyArr[i]}')" class="history-img" src="./delete.png" alt="Видалити">
				<img onclick="copyPoemix('${[arrValues[4], arrValues[0]]}')" class="history-img" src="./copy.png" alt="Копіювати">
			</div>
		</div>`
	}}
	console.log(countCicle-1)
}
function showPercent(){
	let percentvalue = 0;
	let percentcount = 0;
	let percentanswer = answerik.toLowerCase().replace(/[\.\?,!\-]/g, "").trim();
	percentanswer = trimAll(percentanswer)
	let percentUserAnswer = userAnswer.value.toLowerCase().replace(/[\.\?,!\-]/g, "").trim();

	if(userAnswer.value.length > 0){
		percentvalue = 100 * (percentcount / percentanswer.length).toFixed(2)
	}
	if(percentvalue <= 0) percent.innerHTML = 0 + "%";
	else percent.innerHTML = percentvalue.toFixed(0) + "%";
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
// Кінець Віршича
function endPoemix(isNeed = true){
	clearTimeout(timeTimeout)
	clearInterval(timerInterval)
	timerBlock.style.display="none"
	isDifficult = false;
	if(isNeed) gotoForm(`form2`, `form5`);
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
	console.log(views)
	incrementStat("statPoems", 1);
	incrementStat("statStrings", strings.length);
	incrementStat("statErrors", errors);
	incrementStat("statViews", views);
	console.log(strings.length)
	let date = new Date();
	let dateKey = date.toLocaleDateString('uk-UA') + "_" + date.toLocaleTimeString('uk-UA')
	addHistory(dateKey, [
		name.value.length === 0 ? strings[0].replaceAll(",", "") : name.value.replaceAll(",", ""),
		strings.length,
		errors,
		views,
		strings.join("").replaceAll(",", "")
		])
	// for(let i = 0; i < 200; i++){
	// 	addHistory(dateKey + i, [
	// 	name.value.length === 0 ? strings[0].replaceAll(",", "") : name.value.replaceAll(",", ""),
	// 	strings.length,
	// 	errors,
	// 	views,
	// 	strings.join("").replaceAll(",", "")
	// 	])
	// }
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
function setTheme(isClick = false){
let inputs = document.querySelectorAll(".dt-input");
let btnElements = document.querySelectorAll('#btn1');
let checkBoxElements = document.querySelectorAll('.custom-checkbox')
let cmarks = document.querySelectorAll('.checkmark')
let themeElements = document.querySelectorAll('.dt');
let arrow = document.getElementById('arrow');
let body = document.getElementById('body')
let clicks = 0;
  // Перевіряємо стан чекбокса
	if(isClick) clicks++;
  if (toggle.checked || clicks % 2 !== 0) {
    themeElements.forEach(el => {
      el.style.backgroundColor = '#242424'; // Темний фон
      console.log(el)
    });
    btnElements.forEach(el => {
    	el.classList.add("dt-btn")
    })
    inputs.forEach(el => {
    	el.classList.add("dark-input")
    })
    checkBoxElements.forEach(el => {
    	el.classList.toggle('dark')
    })
    cmarks.forEach(el => {
    	el.classList.toggle('dark')
    })
    historycontent.style.color="#fff"
    document.querySelector(".adaptive-menu").style.background = "rgba(0, 0, 0, 0.40)"
    arrow.classList.add("white-Arrow")
    body.style.backgroundColor = "#161616"
    document.documentElement.style.setProperty('--scrollbar-track-bg', '#505050');
  } else if(toggle.checked === false || clicks % 2 === 0){
  	historycontent.style.color="#000"
    themeElements.forEach(el => {
      el.style.backgroundColor = '#0F0F10'; // Світлий фон
    });
       btnElements.forEach(el => {
    	el.classList.remove("dt-btn")
    })
    inputs.forEach(el => {
    	el.classList.remove("dark-input")
    })
    checkBoxElements.forEach(el => {
    	el.classList.toggle('dark')
    })
    cmarks.forEach(el => {
    	el.classList.toggle('dark')
    })
    arrow.classList.remove("white-Arrow")
    document.querySelector(".adaptive-menu").style.background = "rgba(0, 0, 0, 0.90)"
    body.style.backgroundColor = "#fff"
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
