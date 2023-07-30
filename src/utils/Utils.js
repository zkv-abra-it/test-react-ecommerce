// export function addOrReplaceById(array, element) {
//     return [...array.filter((obj) => obj.id !== element.id), element];
// }

export function addOrReplaceById(array, element) {
    const i = array.findIndex(_element => _element.id === element.id);

    if (i > -1) {
        array[i] = element ;
    } else {
        array.push(element);
    }

    return [...array];
} 