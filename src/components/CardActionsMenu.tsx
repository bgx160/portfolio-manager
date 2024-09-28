import { IconButton, Menu, MenuItem } from "@mui/material"
import { useState } from "react"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

interface CardActionsMenuProps {
    onEdit?: () => void
    onDelete?: () => void
}

export const CardActionsMenu = ({ onEdit, onDelete }: CardActionsMenuProps) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (e: any) => {
        e.stopPropagation()
        setAnchorEl(e.currentTarget)
    }
    const handleClose = (e: any) => {
        e.stopPropagation()
        setAnchorEl(null)
    }

    const handleEdit = (e: React.MouseEvent<HTMLLIElement>) => {
        e.stopPropagation()
        onEdit!()
        handleClose(e)
    }

    const handleDelete = (e: React.MouseEvent<HTMLLIElement>) => {
        e.stopPropagation()
        onDelete!()
        handleClose(e)
    }

    return (
        <>
            <IconButton
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>
                <MoreHorizIcon />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {onEdit && <MenuItem onClick={handleEdit}>Edit</MenuItem>}
                {onDelete && <MenuItem onClick={handleDelete}>Delete</MenuItem>}
            </Menu>
        </>
    )
}
