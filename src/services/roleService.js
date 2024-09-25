export const getRole = () => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    return userData?.role
}