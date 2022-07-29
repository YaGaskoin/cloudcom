export const makeFormData = (obj) => {
    let bodyForm = new FormData();
    for (let key in obj) {
        bodyForm.append(key, obj[key]);
    }
    return bodyForm;
}