import { Box, Typography } from "@mui/material"
import { commonTypographyStyles, loginPageStyles } from "../styles"
import { LoginForm } from "../components/LoginForm"
import { getUserInfo } from "../utils/utlis"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export const Login = () => {
    const user = getUserInfo() || null
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate('/app')
        }
    }, [user, navigate])


    return (
        <Box sx={loginPageStyles}>
            <Typography variant='h5' component='h2' sx={{ ...commonTypographyStyles, mt: 5, display: 'flex', justifyContent: 'center' }}>
                Login to your account
            </Typography>

            <LoginForm />
        </Box>
    )
}