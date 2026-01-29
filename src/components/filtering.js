export function initFiltering(elements) {
    const updateIndexes = (indexes) => {
    Object.keys(indexes).forEach((elementName) => {
        const select = elements[elementName];
        if (select && select.tagName === 'SELECT') {
            select.innerHTML = '';
            
            const emptyOption = document.createElement('option');
            emptyOption.value = '';
            emptyOption.textContent = 'Все';
            select.appendChild(emptyOption);

            Object.values(indexes[elementName]).forEach(name => {
                const option = document.createElement('option');
                option.value = name;
                option.textContent = name;
                select.appendChild(option);
            });

            select.value = '';
        }
    });
};

    const applyFiltering = (query, state, action) => {
        // Обработка очистки поля
        if (action?.name === 'clear') {
            const field = action.dataset.field;
            const container = action.closest('[data-field]');
            if (container) {
                const input = container.querySelector('input, select');
                if (input) {
                    input.value = '';
                }
            }
        }

        // Формируем параметры фильтрации
        const filter = {};
        Object.keys(elements).forEach(key => {
            const el = elements[key];
            if (el && ['INPUT', 'SELECT'].includes(el.tagName) && el.value.trim()) {
                // Используем name элемента как ключ фильтра
                filter[`filter[${el.name}]`] = el.value;
            }
        });

        return Object.keys(filter).length
            ? Object.assign({}, query, filter)
            : query;
    };

    return {
        updateIndexes,
        applyFiltering
    };
}