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
	var row;

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

			// Преобразовываем строку даты в формат даты для последующих вычислений
			startDate = new Date($("#firstDate").val());
			endDate = new Date($("#lastDate").val());
			// Вычисление длительности практики
			var practLenght =
				Math.ceil((endDate - startDate) / 60 / 60 / 24 / 1000) + 2;

			// Определяем часы работы на отделении
			startWork = $("#firstWork").val();
			endWork = $("#lastWork").val();

			// Цикл для создания таблицы с расписанием
			// i можно взять как номер смены (но надо расчитать выходные)
			var todayDate = startDate;
			var table = $("<table>").addClass("workTable");
			var shiftOffset = 0;
			for (var i = 0; i < practLenght; i++) {
				// В первой строке таблицы пишем названия столбцов
				if (i == 0) {
					row = $("<tr>").addClass("workRow");
					table.append(row);
					addCells("Смены", "Дата", "Часы работы");
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
					}
					// Записываем в ячейки одной строки номер смены, дату и время работы
					addCells(shiftNum, tableDate, shiftTime);
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
	// Функция последовательно записывает в три ячейки таблицы текст
	function addCells(cell1, cell2, cell3) {
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
			var cell = $("<td>").addClass("workCell").text(cellText);
			row.append(cell);
		}
	}
});
