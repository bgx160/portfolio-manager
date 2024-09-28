import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextareaAutosize } from '@mui/material'
import React, { useState } from 'react'
import { SavedPortfolio } from '../types'
import { updatePortfolio } from '../services/api'

interface SkillsFormProps {
    selectedPortfolio: SavedPortfolio
    onClose: () => void
    refetchPortfolios: () => void
}

export const SkillsForm = ({ selectedPortfolio, onClose, refetchPortfolios }: SkillsFormProps) => {
    const { content } = selectedPortfolio

    const [skills, setSkills] = useState(() => content && content.skills?.join(', ') || '')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        setSkills(value);
    }

    const skillsToArray = (skills: string): string[] =>  {
        return skills.split(", ")
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const updatedPortfolio = { ...selectedPortfolio, content: { ...content, skills: skillsToArray(skills) } }
            await updatePortfolio(updatedPortfolio)
            refetchPortfolios()
        } catch (error) {
            console.error('Something went wrong', error)
        }
        onClose()
    }

    return (
        <div>
            <Dialog open={true} sx={{ '& .MuiDialog-paper': { width: 480, maxWidth: 'none' } }}
            >
                <DialogTitle>Your skills</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Seperate each skill with a comma (,)
                    </DialogContentText>
                    <form onSubmit={handleSubmit}>
                        <TextareaAutosize
                            className='skills'
                            value={skills}
                            minRows={6}
                            placeholder='Add skills'
                            style={{ width: '80%' }}
                            onChange={handleChange}
                        />

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
        </div>
    )
}
