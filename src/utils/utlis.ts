export const getUserInfo = () => {
    const userInfoString = window.localStorage.getItem('AuthPayload')
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null

    return userInfo
}