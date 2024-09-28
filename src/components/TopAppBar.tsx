import { Box, Toolbar, IconButton, Typography, Button, AppBar } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate } from "react-router-dom"
import { getUserInfo } from "../utils/utlis"

interface TopAppBarProps {
    handleButtonClick: () => void
}

export const TopAppBar = ({ handleButtonClick }: TopAppBarProps) => {
    const user = getUserInfo()
    const navigate = useNavigate()

    const handleLogOut = () => {
        window.localStorage.removeItem('AuthPayload')
        navigate('/')
    }


    return (
        <Box sx={{ flexGrow: 1, width: '100vw', mb: '64px' }}>
            <AppBar sx={{ backgroundColor: "#1c1c1c" }} position="fixed">
                <Toolbar>
                    <IconButton
                        onClick={handleButtonClick}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Portfolio manager v1.0
                    </Typography>
                    <p>Logged in as {user.username}</p>
                    <Button onClick={handleLogOut} color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
