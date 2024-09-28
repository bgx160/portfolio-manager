import { Box, Typography } from "@mui/material"
import { About } from "../types"

interface AboutMeSectionProps {
    content: About
}

export const AboutMeSection = ({ content }: AboutMeSectionProps) => {
    return (
        <Box>
            <Typography variant='body1' gutterBottom>
                {content.bio}
            </Typography>
        </Box>
    )
}
