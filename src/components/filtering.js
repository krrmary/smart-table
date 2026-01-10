import { createComparison, defaultRules } from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes).forEach((elementName) => {
        const options = Object.values(indexes[elementName]).map(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            return option;
        });
        elements[elementName].append(...options);
    });

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action?.name === 'clear') {
            const field = action.dataset.field; // имя поля из data-field кнопки
            const input = action.closest('[data-field]')?.querySelector('input, select');
            if (input) {
                input.value = ''; // сбрасываем значение в DOM
                // Сбрасываем и в состоянии — хотя на самом деле state формируется заново из формы,
                // но для единообразия и будущей гибкости можно явно это отразить.
                // Однако в текущей архитектуре collectState() читает форму после сброса,
                // поэтому достаточно сбросить input — state обновится автоматически.
            }
        }

        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    };
}