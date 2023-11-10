function objectString(str) { 
    const array = str.split('');
    const result = {};
    array.forEach(element => {
        if (result[element]) {
            result[element] += 1;
        } else {
            result[element] = 1;
        }
    });
    return result;
}