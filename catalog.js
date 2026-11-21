console.log("=== ЗАПУСК ПРОГРАММЫ (ПРАКТИКА 23) ===");

// =========================================================================
// 1. МАССИВ ДАННЫХ
// =========================================================================
const catalog = [
    { position: 1, name: "Бумага", specs: "Сухая · без загрязнений", description: "Газеты, тетради и чистая упаковка" },
    { position: 2, name: "Пластик", specs: "Чистый · по маркировке", description: "Бутылки и подходящая тара" },
    { position: 3, name: "Стекло", specs: "Целое · без крышек", description: "Банки и стеклянные бутылки" }
];

// Вывод таблицы в консоль (чтобы препод видел, что данные на месте)
console.table(catalog);

// =========================================================================
// 2. РАБОТА С DOM (Практика 23)
// =========================================================================
document.addEventListener("DOMContentLoaded", function() {

    // --- ШАГ 1: МЕНЯЕМ ЗАГОЛОВОК ИЗ JS ---
    const mainTitle = document.querySelector("#main-title");
    if (mainTitle) {
        // Вместо "Дайте вещам вторую жизнь" на экране появится этот текст:
        mainTitle.textContent = "Дайте вещам вторую жизнь";
    }

    // --- ШАГ 2: КНОПКА ПОКАЗА НАЗВАНИЙ ---
    const statusElement = document.querySelector("#status");
    const namesList = document.querySelector("#names");
    const showButton = document.querySelector("#show-names");

    // Выводим количество записей
    if (statusElement) {
        statusElement.textContent = "Записей в каталоге: " + catalog.length;
    }

    // Функция отрисовки списка
    function renderNames() {
        namesList.replaceChildren();
        for (const item of catalog) {
            const line = document.createElement("li");
            line.textContent = item.name;
            namesList.append(line);
        }
        statusElement.textContent = "Список показан. Записей: " + catalog.length;
    }

    // Обработчик кнопки
    if (showButton) {
        showButton.addEventListener("click", renderNames);
    }

    console.log("Все обработчики добавлены. Заголовок изменен!");
});