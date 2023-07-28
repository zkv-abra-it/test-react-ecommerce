export function addOrReplaceById(array, element) {
    return [...array.filter((obj) => obj.id !== element.id), element];
}

// Ask why doesn't work useEffect
export function addOrReplace(array, element) {
    const i = array.findIndex(_element => _element.id === element.id);

    if (i > -1) {
        array[i] = element ;
    } else {
        array.push(element);
    }

    return array;
} 