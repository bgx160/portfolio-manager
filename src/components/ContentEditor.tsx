import { Box, Button, Stack, Typography } from '@mui/material'
import { Project, SavedPortfolio } from '../types'
import { ContentCard } from './ContentCard'
import { basicInfoBoxStyles, commonTypographyStyles, projectsBoxStyles } from '../styles'
import { updatePortfolio } from '../services/api'
import { useState } from 'react'
import { ConfirmationDialog } from './ConfirmationDialog'
import { Link } from 'react-router-dom'

interface ContentEditorProps {
    portfolio: SavedPortfolio
    onEdit: (arg:
        { type: 'about' } |
        { type: 'skills' } |
        { type: 'project', project: Project } |
        null
    ) => void
    refetchPortfolios: () => void
}


export const ContentEditor = ({ portfolio, onEdit, refetchPortfolios }: ContentEditorProps) => {
    const [deleteContentConfirmationOpen, setDeleteContentConfirmationOpen] = useState<null | string>(null)
    const [deleteProjectConfirmationOpen, setDeleteProjectConfirmationOpen] = useState(false)
    const [publishConfirmationOpen, setPublishConfirmationOpen] = useState(false)

    const { content } = portfolio

    const contentItems = [
        { key: 'about', title: 'About me', content: content?.about?.bio, onEdit: () => onEdit({ type: 'about' }) },
        { key: 'skills', title: 'Skills', content: content?.skills?.join(', '), onEdit: () => onEdit({ type: 'skills' }) },
    ]

    const deleteBasicInfo = async (key: string) => {
        try {
            const updatedPortfolio = { ...portfolio, content: { ...content, [key]: null } }

            await updatePortfolio(updatedPortfolio)

            refetchPortfolios()
        } catch (error) {
            console.error('Error deleting', key, error)
        }
        setDeleteContentConfirmationOpen(null)
    }

    const deleteProject = async (projectId: number | undefined) => {
        if (!content?.projects) return

        try {
            const updatedProjects = content?.projects.filter(project => project.id != projectId)
            const updatedPortfolio = { ...portfolio, content: { ...content, projects: updatedProjects } }

            await updatePortfolio(updatedPortfolio)

            refetchPortfolios()
        } catch (error) {
            console.error('Error deleting project', error)
        }
        setDeleteProjectConfirmationOpen(false)
    }

    const publishPortfolio = async (portfolio: SavedPortfolio) => {

        try {
            await updatePortfolio({ ...portfolio, published: portfolio.published ? false : true })

            refetchPortfolios()
        } catch (error) {
            console.error('Error publishing portfolio', error)
        }

        setPublishConfirmationOpen(false)
    }

    const isContentEmpty = (): boolean => {
        if (!content) return true

        const { projects = [], about, skills } = content
        return (!projects || projects.length === 0) && (!skills || skills.length === 0) && !about  
    }

    if (isContentEmpty()) return <Typography variant='h6' component='h2' sx={commonTypographyStyles}>This portfolio is empty</Typography>

    return (
        <>
            {/* List basic information section */}

            {contentItems.some(item => item.content) && (
                <Box sx={basicInfoBoxStyles}>
                    <Typography variant='h5' component='h2' sx={commonTypographyStyles}>
                        Basic information
                    </Typography>
                    <Stack
                        direction='row'
                        spacing={3}
                        useFlexGap
                        sx={{ mb: 2 }}
                        flexWrap='wrap'
                    >
                        {contentItems.map(
                            item =>
                                item.content && (
                                    <Box key={item.key}
                                    >
                                        <ConfirmationDialog
                                            open={deleteContentConfirmationOpen === item.key}
                                            title={`Delete ${item.title}`}
                                            details={`${item.title} will be deleted. Continue?`}
                                            onClose={() => setDeleteContentConfirmationOpen(null)}
                                            onConfirm={() => deleteBasicInfo(item.key)} />
                                        <ContentCard
                                            title={item.title}
                                            content={item.content}
                                            onEdit={item.onEdit}
                                            onDelete={() => setDeleteContentConfirmationOpen(item.key)}
                                        />
                                    </Box>
                                )
                        )}
                    </Stack>
                </Box>
            )}

            {/* List projects section */}

            {content?.projects && content.projects.length > 0 && (
                <Box sx={projectsBoxStyles}>
                    <Typography variant='h5' component='h2' sx={commonTypographyStyles}>
                        Projects
                    </Typography>
                    <Stack
                        direction='row'
                        spacing={3}
                        useFlexGap
                        flexWrap='wrap'
                    >
                        {content.projects.map((project, index) => (
                            <Box key={index}>
                                <ConfirmationDialog
                                    open={deleteProjectConfirmationOpen}
                                    title={`Delete ${project.title}`}
                                    details={`${project.title} will be deleted. Continue?`}
                                    onClose={() => setDeleteProjectConfirmationOpen(false)}
                                    onConfirm={() => deleteProject(project.id)} />
                                <ContentCard
                                    key={index}
                                    title={project.title}
                                    content={project.description}
                                    onDelete={() => setDeleteProjectConfirmationOpen(true)}
                                    onEdit={() => onEdit({ type: 'project', project })}
                                />
                            </Box>
                        ))}
                    </Stack>
                </Box>
            )}
            {!isContentEmpty() && (
                <>
                    <Button
                        sx={{ mt: 2 }}
                        onClick={() => setPublishConfirmationOpen(true)}
                        variant='outlined'
                        color={portfolio.published ? 'warning' : 'success'}
                        size='large'>
                        {portfolio.published ? 'Unpublish portfolio' : 'Publish portfolio'}
                    </Button>
                    <ConfirmationDialog
                        open={publishConfirmationOpen}
                        title={portfolio.published ? 'Unpublish portfolio' : 'Publish portfolio'}
                        details={
                            portfolio.published
                                ? 'Portfolio will be unpublished and not available on the public web. Continue?'
                                : 'Portfolio will be published on the web. Continue?'
                        }
                        onClose={() => setPublishConfirmationOpen(false)}
                        onConfirm={() => publishPortfolio(portfolio)} />
                </>
            )}

            {portfolio.published &&
                <Typography sx={{ mt: 1 }} gutterBottom variant='body2'>
                    {`Portfolio available at `}
                    <Link to={`/published/${portfolio._id}`}>{window.location.origin}/published/{portfolio._id}</Link>
                </Typography>}
        </>
    )
}