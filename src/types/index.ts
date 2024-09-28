/* export interface Portfolio {
    id?: number
    name: string
    content?: {
        projects?: Project[]
        skills?: string
        about?: string
    }
} */

export interface Link {
    title: string
    url: string
}

export interface Project {
    id?: number
    title: string
    description: string
    links: Link[]
}

export interface About {
    bio: string
    links: Link[]
}

export interface PortfolioContent {
    projects?: Project[]
    skills?: string[]
    about?: About
}

export interface UnsavedPortfolio {
    name: string
    ownerId: number
    content?: PortfolioContent
}

export interface SavedPortfolio extends UnsavedPortfolio {
    _id: number
    published: boolean
}

export interface User {
    username: string,
    password: string
}