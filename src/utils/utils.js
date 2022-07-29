export const checkStorage = (name) => {
    return JSON.parse(localStorage.getItem(name)) || false
}

export const getExpireDate = (seconds) => {
    let date = new Date();
    date.setSeconds( date.getSeconds() + seconds)
    return date
}