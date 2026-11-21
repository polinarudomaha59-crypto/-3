// ==========================================
// 1. ВАШИ ДАННЫЕ (массив из пары 21)
// ==========================================
const catalog = [{
        position: 1,
        name: "Карточка 1",
        specs: "Характеристика 1",
        description: "Описание первой карточки"
    },
    {
        position: 2,
        name: "Карточка 2",
        specs: "Характеристика 2",
        description: "Описание второй карточки"
    },
    {
        position: 3,
        name: "Карточка 3",
        specs: "Характеристика 3",
        description: "Описание третьей карточки"
    }
];

// ==========================================
// 2. ВАША ФУНКЦИЯ (из пары 22)
// ==========================================
function filterByText(items, query) {
    const normalized = query.trim().toLowerCase();
    if (normalized === "") {
        return items;
    }
    return items.filter(item => item.name.toLowerCase().includes(normalized));
}

// ==========================================
// 3. ЛОГИКА ВЫВОДА КАТАЛОГА
// ==========================================
const catalogList = document.querySelector("#catalog-list");
const statusText = document.querySelector("#status");
const searchInput = document.querySelector("#search");

function renderCatalog(items) {
    // Очищаем старые карточки
    catalogList.replaceChildren();

    // Создаем новые карточки
    for (const item of items) {
        const card = document.createElement("article");
        card.className = "card";

        const title = document.createElement("h2");
        title.textContent = item.name;

        const specs = document.createElement("p");
        specs.textContent = item.specs;

        const description = document.createElement("p");
        description.textContent = item.description;

        // Собираем карточку
        card.append(title, specs, description);
        catalogList.append(card);
    }

    // Обновляем счетчик
    if (items.length === 0) {
        statusText.textContent = "Ничего не найдено";
    } else {
        statusText.textContent = "Показано: " + items.length + " из " + catalog.length;
    }
}

// ==========================================
// 4. ЗАПУСК И ОБРАБОТКА ПОИСКА
// ==========================================
// Первый вывод при загрузке страницы
renderCatalog(catalog);

// Слушаем ввод в поле поиска
searchInput.addEventListener("input", function() {
    const found = filterByText(catalog, searchInput.value);
    renderCatalog(found);
});