// =========================================================
// ЗАДАНИЕ 19 ПАРЫ: Переменные, типы и расчет массы
// (Выполняется сразу при открытии index.html)
// =========================================================

// 1. Объявляем переменные (const для неизменяемых, let для строки количества)
const itemName = "Бумага"; // string
let quantityText = "2"; // string (изначально строка)
const unitValue = 4; // number (кг в одной упаковке)
const extraValue = 2; // number (кг общего запаса)
const isTraining = true; // boolean

// 2. Явное преобразование строки в число (по заданию)
const quantity = Number(quantityText);

// 3. Вычисление итога
const total = (quantity * unitValue) + extraValue;

// 4. Вывод в консоль с проверкой типов (typeof)
console.log("=== РЕЗУЛЬТАТ ПРАКТИКИ 19 ===");
console.log("Название: " + itemName);
console.log("Учебные данные: " + isTraining);
console.log("Количество упаковок: " + quantity);
console.log("Всего сырья: " + total + " кг");
console.log("Тип строки количества: " + typeof quantityText);
console.log("Тип количества после преобразования: " + typeof quantity);
console.log("Тип итога: " + typeof total);
console.log("Тип учебного признака: " + typeof isTraining);
console.log("==============================");

// =========================================================
// ЗАДАНИЕ 25 ПАРЫ: Вывод и фильтрация каталога
// (Сработает только если мы на странице catalog.html)
// =========================================================

const catalogData = [
    { id: 1, type: "paper", title: "Бумага", condition: "Сухая • без загрязнений", description: "Газеты, тетради и чистая упаковка", colorClass: "bin-paper" },
    { id: 2, type: "plastic", title: "Пластик", condition: "Чистый • по маркировке", description: "Бутылки и подходящая тара", colorClass: "bin-plastic" },
    { id: 3, type: "glass", title: "Стекло", condition: "Целое • без крышек", description: "Банки и стеклянные бутылки", colorClass: "bin-glass" }
];

function renderCards(dataArray) {
    const container = document.getElementById('catalog-container');
    // Если контейнера нет (мы на главной или форме), прерываем выполнение
    if (!container) return;

    container.innerHTML = '';

    if (dataArray.length === 0) {
        container.innerHTML = '<p style="width: 100%; text-align: center; color: #8b3d10;">Ничего не найдено</p>';
        return;
    }

    dataArray.forEach(item => {
        const card = document.createElement('article');
        card.className = item.type === 'glass' ? 'card full-width' : 'card';

        card.innerHTML = `
            <h2>${item.title}</h2>
            <div class="image-box">
                <div class="bin-icon ${item.colorClass}"></div>
            </div>
            <div class="badge-dark">${item.condition}</div>
            <div class="badge-light">${item.description}</div>
        `;
        container.appendChild(card);
    });
}

function filterCatalog(category) {
    if (category === 'all') {
        renderCards(catalogData);
    } else {
        const filtered = catalogData.filter(item => item.type === category);
        renderCards(filtered);
    }
}

// Инициализация каталога (только если мы на странице каталога)
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('catalog-container');
    if (container) {
        renderCards(catalogData);

        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                filterCatalog(e.target.getAttribute('data-filter'));
            });
        });
    }
});