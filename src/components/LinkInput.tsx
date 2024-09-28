import { Box, TextField } from "@mui/material"
import { Link } from "../types"
import { ChangeEvent } from "react"

interface LinkInputProps {
    link: Link
    index: number
    onLinkChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void
}

export const LinkInput = ({ link, onLinkChange, index }: LinkInputProps) => {

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onLinkChange(event, index)
    }

    return (
        <Box sx={{ mb: 1 }}>
            <TextField onChange={handleChange} value={link.title} size='small' name='title' placeholder='Title' />
            <TextField onChange={handleChange} value={link.url} size='small' name='url' placeholder='Link' />
        </Box>
    )
}
