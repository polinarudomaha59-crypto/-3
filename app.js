document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const wasteCards = document.querySelectorAll(".waste-card");
    const resultCount = document.getElementById("resultCount");
    const emptyMessage = document.getElementById("emptyMessage");

    if (searchInput) {
        function searchWaste() {
            const query = searchInput.value.toLowerCase().trim();
            let visibleCards = 0;

            wasteCards.forEach((card) => {
                const cardText = card.textContent.toLowerCase();
                const cardData = card.dataset.name.toLowerCase();

                const isVisible =
                    cardText.includes(query) ||
                    cardData.includes(query);

                card.style.display = isVisible ? "block" : "none";

                if (isVisible) {
                    visibleCards++;
                }
            });

            resultCount.textContent =
                `Найдено материалов: ${visibleCards}`;

            emptyMessage.style.display =
                visibleCards === 0 ? "block" : "none";
        }

        searchInput.addEventListener("input", searchWaste);
        searchWaste();
    }

    const ecoForm = document.getElementById("ecoForm");
    const calculationResult =
        document.getElementById("calculationResult");

    if (ecoForm) {
        ecoForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const wasteType = document.getElementById("wasteType").value;
            const weight = Number(
                document.getElementById("weight").value
            );

            const names = {
                plastic: "пластика",
                paper: "бумаги и картона",
                glass: "стекла",
                metal: "металла",
                textile: "текстиля"
            };

            const coefficients = {
                plastic: 2.5,
                paper: 1.8,
                glass: 1.2,
                metal: 3.0,
                textile: 2.0
            };

            if (!wasteType || weight <= 0) {
                calculationResult.textContent =
                    "Заполни все поля корректно.";
                return;
            }

            const ecoPoints = Math.round(
                weight * coefficients[wasteType]
            );

            calculationResult.innerHTML = `
        Ты сдал(а) <strong>${weight} кг ${names[wasteType]}</strong>.<br>
        Твой результат — <strong>${ecoPoints} экобаллов</strong>!<br>
        Спасибо за заботу о природе 🌱
      `;
        });
    }
});