// =====================================================================
// 1. НАСТРОЙКИ ИЗ ПАРЫ 20 (поменяйте цифры, если у вас были другие)
// =====================================================================
const unitValue = 500; // Цена за 1 единицу
const extraValue = 100; // Добавка к заказу

// Ваша функция getResult (готовая)
function getResult(quantityText, unitValue, extraValue) {
    const quantity = Number(quantityText);

    // Проверка на пустоту
    if (quantityText.trim() === "") {
        return "Укажите количество";
    }
    // Проверка на то, что ввели не число
    if (isNaN(quantity)) {
        return "Введите число";
    }
    // Проверка на ноль, отрицательное или дробное число
    if (quantity <= 0 || !Number.isInteger(quantity)) {
        return "Нужно положительное целое количество";
    }

    // Расчёт итоговой суммы
    const total = quantity * unitValue + extraValue;
    return "Итог: " + total;
}

// =====================================================================
// 2. ОБРАБОТКА ФОРМЫ
// =====================================================================
const form = document.querySelector("#orderForm");
const result = document.querySelector("#result");

form.addEventListener("submit", function(event) {
    // Отменяем перезагрузку страницы
    event.preventDefault();

    // Получаем количество (это строка)
    const quantityText = document.querySelector("#quantity").value;

    // Получаем выбранную позицию (берем .text, чтобы было название, а не item1)
    const select = document.querySelector("#item");
    const itemName = select.options[select.selectedIndex].text;

    // Получаем сообщение от функции
    const message = getResult(quantityText, unitValue, extraValue);

    // Выводим сообщение на страницу
    result.textContent = itemName + ". " + message;
});