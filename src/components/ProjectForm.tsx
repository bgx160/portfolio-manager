import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextareaAutosize, TextField } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { Project, SavedPortfolio } from '../types'
import { updatePortfolio } from '../services/api'
import { LinkInput } from './LinkInput'

interface ProjectFormProps {
    selectedPortfolio: SavedPortfolio
    selectedProject?: Project
    onClose: () => void
    refetchPortfolios: () => void
}

export const ProjectForm = ({ onClose, selectedPortfolio, selectedProject, refetchPortfolios }: ProjectFormProps) => {
    const [project, setProject] = useState<Project>(() => selectedProject || { id: Date.now(), title: '', description: '', links: [] })

    const { content } = selectedPortfolio

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setProject({ ...project, [name]: value });
    }
    const updateProjects = (): SavedPortfolio => {
        const existingProjects = content?.projects || []
        const existingProjectIndex = existingProjects.findIndex(p => p.id === project.id)

        let updatedProjects

        if (existingProjectIndex !== -1) {
            updatedProjects = [...existingProjects]
            updatedProjects[existingProjectIndex] = project
        } else {
            updatedProjects = [...existingProjects, project]
        }

        const updatedPortfolio: SavedPortfolio = {
            ...selectedPortfolio,
            content: {
                ...content,
                projects: updatedProjects,
            },
        }

        return updatedPortfolio
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const updatedPortfolio = updateProjects()
            await updatePortfolio(updatedPortfolio)
            refetchPortfolios()
        } catch (error) {
            console.error('Error updating portfolios projects', error)
        }
        onClose()
    }

    const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = event.target;

        // Update the specific link in the links array
        const updatedLinks = project.links.map((item, i) =>
            i === index ? { ...item, [name]: value } : item
        )
        setProject({ ...project, links: updatedLinks })
    }

    const handleAddLinkButton = () => {
        setProject({ ...project, links: [...project.links, { title: '', url: '' }] })
    }

    return (
        <>
            <Dialog open={true} maxWidth='lg'>
                <DialogTitle>{selectedProject ? 'Edit project' : 'Add project'}</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name='title'
                            value={project.title}
                            required
                            label='Title'
                            margin='dense'
                            fullWidth
                            onChange={handleChange}
                        />
                        <TextareaAutosize
                            name='description'
                            value={project.description}
                            className='project-description'
                            minRows={6}
                            placeholder='Project description'
                            onChange={handleChange}
                        />

                        <Box sx={{ mb: 1 }}>
                            {project.links.map((link, index) => (
                                <LinkInput key={index} index={index} link={link} onLinkChange={(e: ChangeEvent<HTMLInputElement>) => handleLinkChange(e, index)} />
                            ))}
                        </Box>

                        <Button
                            size='small'
                            variant='outlined'
                            color='info'
                            onClick={handleAddLinkButton}>
                            Add link
                        </Button>

                        <DialogActions>
                            <Button
                                variant='outlined'
                                color='error'
                                onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                variant='outlined'
                                color='success'
                                type='submit'>
                                Save
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}
