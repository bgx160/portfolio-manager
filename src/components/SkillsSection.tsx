import { Box, Chip, Typography } from "@mui/material"
import { commonTypographyStyles } from "../styles"

interface SkillsSectionProps {
    skills: string[]
}


export const SkillsSection = ({ skills }: SkillsSectionProps) => {
    return (
        <>
            <Typography variant='h6' component='h4' sx={{ ...commonTypographyStyles, mt: 2 }}>Skills</Typography>

            <Box flexWrap='wrap' sx={{
                '& .MuiChip-label': {
                    color: 'white',
                },
                '&.MuiChip-root': {
                    backgroundColor: '#000'
                }
            }}>
                {skills.map((skill, index) => (
                    <Chip key={index} label={skill} />
                ))}
            </Box>
        </>
    )
}
