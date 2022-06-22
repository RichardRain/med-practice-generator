$(document).ready(function () {
	// Определяем варианты практики по курсу и факультету
	var lookup = {
		year1facLech: ["Уход-за-больными"],
		year1facPed: ["Уход-за-больными-детьми"],
		year1facStom: ["Сестринское-дело"],
		year2facLech: ["Первая-помощь-и-уход-за-больными"],
		year2facPed: ["Первая-помощь-и-уход-за-больными-детьми"],
		year2facStom: ["Помощник-врача-стоматолога", "Помощник-врача-гигиениста"],
		year3facLech: ["Сестринская"],
		year3facPed: ["Сестринские-манипуляции-в-педиатрии"],
		year3facStom: [
			"Помощник-врача-стоматолога-терапевта",
			"Помощник-врача-стоматолога-хирурга",
		],
		year4facLech: ["Терапевтическая", "Хирургическая"],
		year4facPed: [
			"Терапевтическая-ped",
			"Хирургическая-ped",
			"Акушерско-гинекологическая-ped",
		],
		year4facStom: [
			"Помощник-врача-стоматолога-терапевта-4",
			"Помощник-врача-стоматолога-ортопеда",
		],
		year5facLech: ["Поликлиническая", "Акушерско-гинекологическая"],
		year5facPed: [
			"Педиатрическая",
			"Акушерско-гинекологическая-ped-5",
			"Поликлиническая",
		],
		year5facStom: ["Помощник-врача-стоматолога-общей-практики"],
		year6facLech: ["Поликлиническая-леч-6"],
		year6facPed: ["Поликлиническая-в-педиатрии"],
	};
	// Курс, Факультет и Практика (Курс+Факультет)
	var yearNum = "";
	var facultyNum = "";
	var practiceNum = "";
	var startDate = new Date();
	var endDate = new Date();
	var startWork = "";
	var endWork = "";
	var practice;
	var row;
	var table = $("<table>").addClass("workTable");
	var pageRow;
	var numOfWork;
	var patient;
	var whichIb;
	var numOfIb;

	$("#yearSelect").on("change", function () {
		// При выборе нового варианта в графе Курс - записываем этот вариант во временную переменную
		var selectValue = $(this).val();

		// Записываем это значение в переменную Курса
		yearNum = selectValue;
		// Задаем значение переменной Практики в виде Курс + Факультет
		practiceNum = yearNum + facultyNum;
		// Очищаем варианты графы Практика
		$("#practice").empty();

		// Находим значение переменной Практики в lookup
		for (i = 0; i < lookup[practiceNum].length; i++) {
			// записываем варианты в графу Практика
			$("#practice").append(
				"<option value='" +
					lookup[practiceNum][i] +
					"'>" +
					lookup[practiceNum][i] +
					"</option>"
			);
		}
	});
	$("#faculty").on("change", function () {
		// При выборе нового варианта в графе Факультет - записываем этот вариант во временную переменную
		var selectValue = $(this).val();

		// Записываем это значение в переменную Факультета
		facultyNum = selectValue;
		// Задаем значение переменной Практики в виде Курс + Факультет
		practiceNum = yearNum + facultyNum;
		// Очищаем варианты графы Практика
		$("#practice").empty();

		// Находим значение переменной Практики в lookup
		for (i = 0; i < lookup[practiceNum].length; i++) {
			// записываем варианты в графу Практика
			$("#practice").append(
				"<option value='" +
					lookup[practiceNum][i] +
					"'>" +
					lookup[practiceNum][i] +
					"</option>"
			);
		}
	});
	$("#firstDate").on("change", function () {
		// var selectValue = $(this).val();
		// startDate = selectValue;
		startDate = $(this).val();
		// console.log("начало: " + startDate + ".  конец: " + endDate);
		if (startDate >= endDate) {
			startDate = "";
			alert("Начало практики не может быть позднее её конца.");
			$("#firstDate").val("");
		}
	});
	$("#lastDate").on("change", function () {
		// var selectValue = $(this).val();
		// endDate = selectValue;
		endDate = $(this).val();
		// console.log("начало: " + startDate + ".  конец: " + endDate);
		if (endDate <= startDate) {
			endDate = "";
			alert("Окончание практики не может быть раньше её начала.");
			$("#lastDate").val("");
		}
	});
	$("#patient").on("change", function () {
		if ($("#patient").is(":checked")) {
			$("#whichIb").prop("disabled", false);
			$("#numOfIb").prop("disabled", false);
		} else {
			$("#whichIb").prop("disabled", true);
			$("#numOfIb").prop("disabled", true);
		}
	});
	// Сбрасываем все переменные и устанавливаем в графу Практика плашку с выбором практики
	$("#resButton").click(function () {
		yearNum = "";
		facultyNum = "";
		practiceNum = "";
		startDate = new Date();
		endDate = new Date();
		$("#firstDate").val("");
		$("#lastDate").val("");
		$("#practice").empty();
		$("#practice").append(
			"<option value='' disabled selected>Выберите название практики</option>"
		);
		$("#whichIb").prop("disabled", true);
		$("#numOfIb").prop("disabled", true);
		// Очищаем текст в полях на титульнике, графике работы
		$("#yearText").empty();
		$("#facText").empty();
		$("#practText").empty();
		$("#practDuration").empty();
		$("#workTable").empty();
	});
	$("#subButton").click(function () {
		// Проверяем введены ли все важные данные
		if (
			$("#yearSelect").val() == false ||
			$("#faculty").val() == false ||
			$("#practice").val() == false ||
			$("#firstDate").val() == false ||
			$("#lastDate").val() == false ||
			$("#firstWork").val() == false ||
			$("#lastWork").val() == false
		) {
			alert("Введите все данные!");
		} else {
			// Очищаем текст в полях на титульнике, графике работы
			$("#yearText").empty();
			$("#facText").empty();
			$("#practText").empty();
			$("#practDuration").empty();
			$("#workTable").empty();
			// Пишем курс, факультет и название практики на титульный лист
			$("#yearText").text(yearNum.substring(4));
			switch (facultyNum) {
				case "facLech":
					$("#facText").text("лечебного");
					break;
				case "facPed":
					$("#facText").text("педиатрического");
					break;
				case "facStom":
					$("#facText").text("стоматологического");
					break;
			}
			$("#practText").text(
				$("#practice").val().replace(new RegExp("леч|[0-9]|-|ped", "g"), " ")
			);
			// Определяем переменные для генерации строк выполненной работы и историй болезней
			practice = $("#practice").val();
			numOfWork = Number($("#numOfWork").val()) + 1;
			patient = $("#patient").is(":checked");
			whichIb = $("#whichIb").val();
			numOfIb = $("#numOfIb").val();

			// Преобразовываем строку даты в формат даты для последующих вычислений
			startDate = new Date($("#firstDate").val());
			endDate = new Date($("#lastDate").val());
			// Вычисление длительности практики
			var practLenght =
				Math.ceil((endDate - startDate) / 60 / 60 / 24 / 1000) + 2;

			// Определяем часы работы на отделении
			startWork = $("#firstWork").val();
			endWork = $("#lastWork").val();

			// Определяем таблицу для работы и таблицу для дней в дневнике, а также переменную для вычита выходных дней
			var todayDate = startDate;

			var shiftOffset = 0;
			// Цикл для создания таблицы с расписанием и дней в дневнике
			// Один шаг цикла - один день, первый шаг - только для шапки таблицы расписания
			for (var i = 0; i < practLenght; i++) {
				// Генерация таблицы с расписанием
				// В первой строке таблицы пишем названия столбцов
				if (i == 0) {
					row = $("<tr>").addClass("workRow");
					table.append(row);
					addCells("Смены", "Дата", "Часы работы", "row");
				} else {
					var tableDate;
					var shiftNum;
					var shiftTime = startWork + " - " + endWork;

					// Добавляем строки в таблицу
					row = $("<tr>").addClass("workRow");
					table.append(row);
					// Во второй строке дата соответствует началу практики
					if (i == 1) {
						tableDate = dateFormatter(todayDate);
					} else {
						// В последующих строках прибавляем к начальной дате 1 день с каждой строкой
						todayDate = addDays(todayDate, 1);
						tableDate = dateFormatter(todayDate);
					}
					if (isWeekend(todayDate)) {
						shiftNum = "";
						tableDate = "Выходной";
						shiftTime = "-";
						shiftOffset++;
					} else {
						shiftNum = i - shiftOffset;
						// Генерация страницы дневника
						//--------
						pageGen(practice, tableDate, numOfWork, patient, whichIb, numOfIb);
					}
					// Записываем в ячейки одной строки номер смены, дату и время работы
					addCells(shiftNum, tableDate, shiftTime, "row");
				}
			}
			// Добавляем таблицу с расписанием на сайт
			$("#workTable").append(table);

			// Преобразование даты в формат дд-мм-гг
			// Определяем сроки практики
			startDate = dateFormatter(startDate);
			endDate = dateFormatter(endDate);

			// Пишем срок практики на титульном листе
			$("#practDuration").text(startDate + " - " + endDate);
		}
	});
	// Функция добавляет к дате нужное кол-во дней
	function addDays(date, days) {
		var result = new Date(date);
		result.setDate(result.getDate() + days);
		return result;
	}
	// Функция форматирует дату сначала в формат гггг-мм-дд, а затем в дд-мм-гг
	function dateFormatter(date) {
		date = date.toISOString().split("T")[0];
		var dateSplit = date.split("-");
		var day = dateSplit[2];
		var month = dateSplit[1];
		var year = dateSplit[0][2] + dateSplit[0][3];
		var finalDate = day + "." + month + "." + year;
		return finalDate;
	}
	// Функция возвращает true если дата - воскресенье
	function isWeekend(date = new Date()) {
		return date.getDay() === 0;
	}
	// Функция генерирует 1 день дневника
	// practice - название текущей практики
	// date - дата текущего дня
	// numOfWork - кол-во пунктов таблицы
	// patient - надо ли писать историю болезни
	// whichIb - какую историю болезни писать
	// numOfIb - сколько историй писать
	function pageGen(practice, date, numOfWork, patient, whichIb, numOfIb) {
		var pageTable = $("<table>").addClass("workTable");
		for (var i = 0; i < numOfWork; i++) {
			// Генерация таблицы с работой
			// В первой строке таблицы пишем названия столбцов
			if (i == 0) {
				pageRow = $("<tr>").addClass("workRow");
				pageTable.append(pageRow);
				addCells(
					"Дата",
					"Содержание выполненной работы",
					"Кратность",
					"pageRow"
				);
			} else {
				pageRow = $("<tr>").addClass("workRow");
				pageTable.append(pageRow);
				var textAndMult = textGen(practice);
				if (i == 1) {
					addCells(date, textAndMult[0], textAndMult[1], "pageRow");
				} else {
					addCells("", textAndMult[0], textAndMult[1], "pageRow");
				}
			}
		}

		$("#pages").append(pageTable);
		$("#pages").append($("<br>"));
		if (patient) {
			switch (numOfIb) {
				case "max":
					patientGenMax(whichIb);
					break;
				case "min":
					patientGenMin(whichIb);
					break;
				case "minmax":
					patientGenMax(whichIb);
					$("#pages").append($("<br>"));
					patientGenMin(whichIb);
					break;
			}
		}
		$("#pages").append($("<p>Подпись студента:</p>"));
		$("#pages").append($("<p>Подпись базового руководителя:</p>"));
		$("#pages").append($("<hr>"));
	}
	// Выбирает случайное действие из индивидуального задания и его кратность
	function textGen(practice) {
		// Определяем массив, который будет выдавать текст и кратность
		var textAndMult = [""];
		var array;
		// Далее определяем какая практика нам нужна
		switch (practice) {
			case "Акушерско-гинекологическая":
				// ak - название json-элемента в practice.js, соответствует названию практики
				array = practiceTextAndMult(ak);
				textAndMult[0] = array[0];
				textAndMult[1] = array[1];
				break;
		}
		return textAndMult;
	}
	function practiceTextAndMult(practice) {
		var n = practice.task.length;
		var a = getRandomInt(0, n);
		var min = practice.min[a];
		var max = Number(practice.max[a]) + 1;
		var mult = getRandomInt(Math.floor(min / 4), Math.floor(max / 4));
		var array = [];
		array[0] = ak.task[a];
		array[1] = mult;
		return array;
	}
	function patientGenMax(whichIb) {
		switch (whichIb) {
			case "gynecological":
				var age = getRandomInt(gyn.age[0], gyn.age[1]);
				var ageText = ageToStr(age);
				pagesAddP("Больная " + randLetter() + "., " + ageText + ".");
				var enrolledDays = getRandomInt(1, 10);
				var enrolledDaysText;
				if (enrolledDays >= 5) {
					enrolledDaysText = " дней назад.";
				} else if (enrolledDays > 1) {
					enrolledDaysText = " дня назад.";
				} else {
					enrolledDaysText = " день назад.";
				}
				pagesAddP(
					"Поступила " +
						gyn.enrolled[getRandomInt(0, 2)] +
						" " +
						enrolledDays +
						enrolledDaysText
				);
				var complaints = [];
				var complaintsNum = getRandomInt(1, 4);
				for (i = 0; i < complaintsNum; i++) {
					complaints[i] =
						gyn.complaints[getRandomInt(0, gyn.complaints.length)];
				}
				// Нужно чтобы жалобы писал через запятую
				pagesAddP("Жалобы на: " + "");
				// Дописать генератор
				break;
		}
	}
	function patientGenMin(whichIb) {
		switch (whichIb) {
			case "gynecological":
				pagesAddP(
					"Больная " + randLetter() + "., " + getRandomInt(18, 90) + " лет."
				);
				break;
		}
	}
	function ageToStr(age) {
		var txt;
		count = age % 100;
		if (count >= 5 && count <= 20) {
			txt = "лет";
		} else {
			count = count % 10;
			if (count == 1) {
				txt = "год";
			} else if (count >= 2 && count <= 4) {
				txt = "года";
			} else {
				txt = "лет";
			}
		}
		return age + " " + txt;
	}
	// Функция выдает случайное число в промежутке от min включительно до max (не включительно)
	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}
	function pagesAddP(text) {
		$("#pages").append($("<p>").text(text));
	}
	function randLetter() {
		const alphabet = "АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЯ";
		const randomCharacter =
			alphabet[Math.floor(Math.random() * alphabet.length)];
		return randomCharacter;
	}
	// Функция последовательно записывает в три ячейки таблицы текст
	function addCells(cell1, cell2, cell3, rowName) {
		for (var i = 0; i < 3; i++) {
			var cellText;
			switch (i) {
				case 0:
					cellText = cell1;
					break;
				case 1:
					cellText = cell2;
					break;
				case 2:
					cellText = cell3;
					break;
			}
			switch (rowName) {
				case "row":
					var cell = $("<td>").addClass("workCell").text(cellText);
					row.append(cell);
					break;
				case "pageRow":
					var cell = $("<td>").addClass("workCell").text(cellText);
					pageRow.append(cell);
					break;
			}
		}
	}
});
