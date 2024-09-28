import { useState } from "react"
import { PortfolioList } from "../components/PortfolioList"
import { ProjectForm } from "../components/ProjectForm"
import { AboutMeForm } from "../components/AboutMeForm"
import { Button, IconButton, Stack, Typography } from "@mui/material"
import { SkillsForm } from "../components/SkillsForm"
import { ContentEditor } from "../components/ContentEditor"
import { commonTypographyStyles } from "../styles"
import { Project, SavedPortfolio } from "../types"
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

interface ProjectManagementProps {
    selectedPortfolioId?: number | null
    selectPortfolio?: (id: number | null) => void
    portfolios: SavedPortfolio[] | null
    refetchPortfolios: () => void
}

type FormState =
    | { type: 'about' }
    | { type: 'skills' }
    | { type: 'project', project?: Project }
    | null


export const ProjectManagement = ({ selectedPortfolioId, selectPortfolio, portfolios, refetchPortfolios }: ProjectManagementProps) => {
    const [openForm, setOpenForm] = useState<FormState>(null)

    const portfolio = portfolios ? portfolios.find(portfolio => portfolio._id === selectedPortfolioId) : null

    const handleOpenForm = (formType: FormState) =>  setOpenForm(formType)
    const handleCloseForm = () => setOpenForm(null)

    return (

        <>
            {!portfolios || !portfolio ?
                <>
                    <Typography variant='h2' component='h1' sx={{ ...commonTypographyStyles, mt: 2 }}>Choose a portfolio</Typography>
                    <PortfolioList refetchPortfolios={refetchPortfolios} portfolios={portfolios} onSelectPortfolio={selectPortfolio} />
                </>
                :
                <>
                    <Typography variant='h2' component='h1' sx={commonTypographyStyles}>{portfolio.name}</Typography>
                    <Stack direction='row' spacing={1} sx={{ mb: 3 }}>
                        <IconButton onClick={() => selectPortfolio && selectPortfolio(null)}>
                            <ArrowBackIcon sx={{ color: 'white' }} />
                        </IconButton>
                        <Button
                            variant='outlined'
                            color='success'
                            size='large'
                            onClick={() => setOpenForm({ type: 'project' })}>
                            New project
                        </Button>
                        <Button
                            variant='outlined'
                            color='info'
                            size='large'
                            onClick={() => setOpenForm({ type: 'about' })}>
                            About me
                        </Button>
                        <Button
                            variant='outlined'
                            color='warning'
                            size='large'
                            onClick={() => setOpenForm({ type: 'skills' })}>
                            Skills
                        </Button>
                    </Stack>
                    <ContentEditor refetchPortfolios={refetchPortfolios} portfolio={portfolio} onEdit={handleOpenForm} />
                    {openForm?.type === 'about' && <AboutMeForm refetchPortfolios={refetchPortfolios} selectedPortfolio={portfolio} onClose={handleCloseForm} />}
                    {openForm?.type === 'skills' && <SkillsForm refetchPortfolios={refetchPortfolios} selectedPortfolio={portfolio} onClose={handleCloseForm} />}
                    {openForm?.type === 'project' && <ProjectForm refetchPortfolios={refetchPortfolios} selectedPortfolio={portfolio} selectedProject={openForm.project ? openForm.project : undefined} onClose={handleCloseForm} />}
                </>
            }
        </>
    )
}
