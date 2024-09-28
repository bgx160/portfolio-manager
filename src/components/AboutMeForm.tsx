import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextareaAutosize } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { SavedPortfolio } from '../types'
import { updatePortfolio } from '../services/api'
import { LinkInput } from './LinkInput'

interface AboutMeFormProps {
    selectedPortfolio: SavedPortfolio
    onClose: () => void
    refetchPortfolios: () => void
}

export const AboutMeForm = ({ selectedPortfolio, onClose, refetchPortfolios }: AboutMeFormProps) => {
    const { content } = selectedPortfolio
    const [about, setAbout] = useState(() => content && content.about || { bio: '', links: [] })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target
        setAbout({ ...about, [name]: value })
    }

    const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = event.target;

        // Update the specific link in the links array
        const updatedLinks = about.links.map((item, i) =>
            i === index ? { ...item, [name]: value } : item
        )
        setAbout({ ...about, links: updatedLinks })
    }

    const handleAddLinkButton = () => {
        setAbout({ ...about, links: [...about.links, { title: '', url: '' }] })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const updatedPortfolio = { ...selectedPortfolio, content: { ...content, about: about } }
            await updatePortfolio(updatedPortfolio)
            refetchPortfolios()
        } catch (error) {
            console.error('Error updating portfolios about section ', error)
        }
        onClose()
    }

    return (
        <>
            <Dialog open={true} sx={{ '& .MuiDialog-paper': { width: 480, maxWidth: 'none' } }}
            >
                <DialogTitle>About me</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>

                        <TextareaAutosize
                            className='about-me'
                            name='bio'
                            value={about.bio}
                            minRows={6}
                            placeholder='Tell something about yourself'
                            style={{ width: '80%' }}
                            onChange={handleChange}
                        />

                        <Box sx={{ mb: 1 }}>
                            {about.links.map((link, index) => (
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
