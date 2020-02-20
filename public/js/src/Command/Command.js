function Command(action, triggerElement, sourceElements, eventName = 'click') {
    let that = {
        elements: sourceElements,
        triggerElement,
        eventName,
        action,
        init: () => {
            that.triggerElement.addEventListener(that.eventName, (event) => {
                that.action(event, that.elements);
            });
        }
    };

    that.init();

    return that;
}