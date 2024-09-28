import { useParams } from "react-router-dom"
import { SavedPortfolio } from "../types"
import { useEffect, useState } from "react"
import { getPublishedPortfolioById } from "../services/api"
import { Box, Typography } from "@mui/material"
import { aboutMeSectionStyles, commonTypographyStyles, projectSectionStyles, publishedPortfolioPageStyles, publishedPortfolioStyles } from "../styles"
import { AboutMeSection } from "../components/AboutMeSection"
import { ProjectsSection } from "../components/ProjectsSection"
import { SkillsSection } from "../components/SkillsSection"
import Grid from '@mui/material/Grid2';
import { LinksSection } from "../components/LinksSection"


export const PublishedPortfolio = () => {
    const params = useParams()
    const [portfolio, setPortfolio] = useState<SavedPortfolio | null>(null)

    const { content } = portfolio || {}

    const fetchPortfolio = async () => {
        const id = params.id

        const res = await getPublishedPortfolioById(id!)

        if (res.ok) {
            const data = await res.json()
            setPortfolio(data[0])
        } else {
            setPortfolio(null)
        }

    }

    useEffect(() => {
        fetchPortfolio()
    }, [])

    if (!portfolio) return <h1>Page not found</h1>


    return (
        <Box sx={publishedPortfolioPageStyles}>
            <Box sx={publishedPortfolioStyles}>

                <Grid sx={{ mt: 3 }} container spacing={6}>
                    <Grid size={9}>
                        <Box sx={aboutMeSectionStyles}>
                            <Typography variant='h4' component='h4' sx={{ ...commonTypographyStyles }}>{portfolio.name}</Typography>
                            <AboutMeSection content={content?.about || { bio: '', links: [] }} />
                        </Box>

                        <Box sx={projectSectionStyles}>
                            <Typography variant='h5' component='h4' sx={{ ...commonTypographyStyles, mt: 2 }}>Projects</Typography>

                            <ProjectsSection projects={content?.projects || []} />
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>
                        <LinksSection links={content?.about?.links || []} />
                       {content?.skills && content.skills.length > 0 && <SkillsSection skills={content?.skills} /> }
                    </Grid>
                </Grid>


            </Box>
        </Box>
    )
}
