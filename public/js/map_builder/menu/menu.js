export const initializeMenu = (mapContainerId, selectedLayerCallback) => {
    const menuElement = selectElementInsideMapContainer(mapContainerId, '.menu');

    initializeShowMenuButton(mapContainerId, menuElement);

    const layerSelectorElement = selectElementInsideMapContainer(mapContainerId, '.layer-selector');

    layerSelectorElement.id = `${mapContainerId}-layer-selector`;
    layerSelectorElement.addEventListener('change', function () {
        selectedLayerCallback(this.selectedOptions[0].value);
    })
}

export const selectElementInsideMapContainer = (mapContainerId, elementSelector) => document.querySelector(`#${mapContainerId} ${elementSelector}`);

export const isHidden = (element) => {
    return element.style.display === 'none' || element.classList.contains('hidden');
}

export const hideElement = (element) => {
    element.classList.add('hidden');
}

export const showElement = (element) => {
    element.classList.remove('hidden');
}

const initializeShowMenuButton = (mapContainerId, menuElement) => {
    const showMenuButtonElement = selectElementInsideMapContainer(mapContainerId, '.show-menu-button');
    
    showMenuButtonElement.addEventListener('click', () => {
        if (isHidden(menuElement)) {
            showElement(menuElement);
            showMenuButtonElement.style.backgroundColor = 'rgb(132, 35, 35)';
        } else {
            hideElement(menuElement);
            showMenuButtonElement.style.backgroundColor = 'rgb(42, 99, 191, 0.5)';
        }
    });
}

