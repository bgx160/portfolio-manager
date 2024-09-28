import { Box, Button, TextField } from "@mui/material"
import { ChangeEvent, FormEvent, useState } from "react"
import { loginStyles } from "../styles"
import { useNavigate } from "react-router-dom"
import { signIn } from "../services/api"

export const LoginForm = () => {
    const [user, setUser] = useState({ username: '', password: '' })

    const navigate = useNavigate()

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const result = await signIn(user)

            if (result.ok) {
                const userData = await result.json()
                window.localStorage.setItem('AuthPayload', JSON.stringify(userData))
                navigate('/app')
            }
            
        } catch (error) {
            console.error('Error logging in', error)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    return (
        <Box sx={loginStyles}>
            <form onSubmit={handleLogin}>
                <Box sx={{ backgroundColor: 'white', padding: 4, borderRadius: 2, boxShadow: '5px 3px 3px #2F4F4F' }}>
                    <TextField
                        name='username'
                        required
                        label='Username'
                        margin='dense'
                        fullWidth
                        onChange={handleChange}
                    />
                    <TextField
                        name='password'
                        required
                        label='Password'
                        margin='dense'
                        type='password'
                        fullWidth
                        onChange={handleChange}
                    />
                    <Button
                        sx={{ mt: 2 }}
                        variant='contained'
                        color='success'
                        type='submit'
                        fullWidth>
                        Login
                    </Button>
                </Box>
            </form>
        </Box>
    )
}