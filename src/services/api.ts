import { SavedPortfolio, UnsavedPortfolio, User } from '../types'
import { getUserInfo } from '../utils/utlis'

const apiBaseUrl = 'http://localhost:8888/.netlify/functions'


export const getPortfolios = (userId: number) => {
    const { token } = getUserInfo() || {}

    return fetch(`${apiBaseUrl}/getPortfoliosByUserId?userId=${userId}`,
        {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${token}`
            }
        }
    )
}

export const createPortfolio = (portfolio: UnsavedPortfolio) => {
    const { token } = getUserInfo() || {}

    return fetch(`${apiBaseUrl}/createPortfolio`,
        {
            headers: {
                'Content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            method: 'POST',
            body: JSON.stringify(portfolio)
        })
}

export const updatePortfolio = (portfolio: SavedPortfolio) => {
    const { token } = getUserInfo() || {}

    return fetch(`${apiBaseUrl}/updatePortfolio`,
        {
            headers: {
                'Content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            method: 'POST',
            body: JSON.stringify(portfolio)
        })
}

export const deletePortfolio = (_id: number) => {
    const { token } = getUserInfo() || {}

    return fetch(`${apiBaseUrl}/deletePortfolio`,
        {
            headers: {
                'Content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            method: 'DELETE',
            body: JSON.stringify(_id)
        })
}

export const getPublishedPortfolioById = (_id: string) => {
    return fetch(`${apiBaseUrl}/getPublishedPortfolioById?id=${_id}`)
}

export const signIn = (user: User) => {
    return fetch(`${apiBaseUrl}/signIn`,
        {
            headers: { 'Content-type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(user)
        }
    )
}

/* 
export const createPublicPortfolio = (portfolio: SavedPortfolio) => {
    return fetch(`${apiBaseUrl}/createPublicPortfolio`,
        {
            headers: { 'Content-type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(portfolio)
        }
    )
} */