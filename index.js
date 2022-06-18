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
	// Сбрасываем все переменные и устанавливаем в графу Практика плашку с выбором практики
	$("#resButton").click(function () {
		yearNum = "";
		facultyNum = "";
		practiceNum = "";
		$("#practice").empty();
		$("#practice").append(
			"<option value='' disabled selected>Выберите название практики</option>"
		);
	});
	$("#subButton").click(function () {
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
		startDate = dateFormatter($("#firstDate").val());
		endDate = dateFormatter($("#lastDate").val());
		$("#practDuration").text(startDate + " - " + endDate);
	});
	function dateFormatter(date) {
		var dateSplit = date.split("-");
		var day = dateSplit[2];
		var month = dateSplit[1];
		var year = dateSplit[0][2] + dateSplit[0][3];
		var finalDate = day + "-" + month + "-" + year;
		return finalDate;
	}
});
