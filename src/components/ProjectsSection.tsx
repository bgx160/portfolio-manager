import { Box, Typography } from "@mui/material"
import { Project } from "../types"
import { commonTypographyStyles, projectDisplayStyles } from "../styles"

interface ProjectSectionProps {
    projects: Project[]
}

export const ProjectsSection = ({ projects }: ProjectSectionProps) => {
    return (
        <>
            {projects.map((project) => (
                <Box key={project.id} sx={projectDisplayStyles}>
                    <Typography variant='h6' component='h4' sx={{ ...commonTypographyStyles, mt: 2 }}>
                        {project.title}
                    </Typography>

                    <Typography variant='body2' gutterBottom>
                        {project.description}
                    </Typography>
                    {project.links.map((link, index) => (
                    <a key={index} target='_blank' rel='noopener' href={link.url}>{link.title} </a>
                ))}
                </Box>
            ))}

        </>
    )
}
