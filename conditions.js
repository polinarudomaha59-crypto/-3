console.log("Расчёт моего приложения");

// ===== Исходные данные варианта 25 (учебные, вымышленные) =====
const itemName = "Бумага"; // название выбранной позиции
const quantityText = "2"; // текст количества упаковок — строка из файла
const unitValue = 4; // кг сырья в одной упаковке — число
const extraValue = 2; // кг общего запаса сырья, учитывается один раз
const isTraining = true; // признак учебных данных, в формулу не входит

// ===== Функция (объявлена один раз, возвращает строку) =====
function getResult(quantityText, unitAmount, extraAmount) {
    // 1) До преобразования: пустая строка или только пробелы
    if (quantityText.trim() === "") {
        return "Ошибка: укажите количество";
    }

    const quantity = Number(quantityText);

    // 2) После преобразования: нечисловое или бесконечное
    if (!Number.isFinite(quantity)) {
        return "Ошибка: введите число";
    }

    // 3) Неположительное количество
    if (quantity <= 0) {
        return "Ошибка: нужно положительное целое количество";
    }

    // 4) Нецелое количество
    if (!Number.isInteger(quantity)) {
        return "Ошибка: нужно положительное целое количество";
    }

    // 5) Расчёт и возврат
    const totalAmount = unitAmount * quantity + extraAmount;
    return "Итого: " + totalAmount;
}

// ===== Вывод снаружи функции =====
const resultMessage = getResult(quantityText, unitValue, extraValue);
console.log("Всего сырья:", resultMessage, "кг");
// Результат: Всего сырья: Итого: 10 кг

// ===== 11 испытаний (unitValue = 4, extraValue = 2) =====
console.log("Мой вариант:          ", `"2"`, "->", getResult("2", 4, 2));
console.log("Одна единица:         ", `"1"`, "->", getResult("1", 4, 2));
console.log("Три единицы:          ", `"3"`, "->", getResult("3", 4, 2));
console.log("Пустое поле:          ", `""`, "->", getResult("", 4, 2));
console.log("Только пробелы:       ", `"   "`, "->", getResult("   ", 4, 2));
console.log("Слово:                ", `"два"`, "->", getResult("два", 4, 2));
console.log("Бесконечность:        ", `"Infinity"`, "->", getResult("Infinity", 4, 2));
console.log("Ноль:                 ", `"0"`, "->", getResult("0", 4, 2));
console.log("Отрицательное:        ", `"-1"`, "->", getResult("-1", 4, 2));
console.log("Дробное:              ", `"1.5"`, "->", getResult("1.5", 4, 2));
console.log("Пробелы вокруг числа: ", `" 2 "`, "->", getResult(" 2 ", 4, 2));

// ===== 2 дополнительных испытания (только меняем один числовой аргумент) =====
console.log("Единица +10:          ", `"2"`, "| 14, 2  ->", getResult("2", 14, 2));
console.log("Добавка +10:          ", `"2"`, "| 4, 12  ->", getResult("2", 4, 12));