import { Box, Button, Stack, TextField } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { UnsavedPortfolio } from '../types'
import { createPortfolio } from '../services/api'
import { getUserInfo } from '../utils/utlis'

interface NewPortfolioProps {
    refetchPortfolios: () => void
}

export const NewPortfolio = ({ refetchPortfolios }: NewPortfolioProps) => {
    const user = getUserInfo()

    const [buttonVisible, setButtonVisible] = useState(true)
    const [portfolio, setPortfolio] = useState<UnsavedPortfolio>({ name: '', ownerId: user._id })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value
        setPortfolio({ ...portfolio, name: name })
    }

    const handleSave = async () => {
        try {
            const res = await createPortfolio(portfolio)
            if (res.ok) {
                console.log('New portfolio', portfolio, 'saved successfully')
            }
            refetchPortfolios()
        } catch (error) {
            console.error('Error saving new portfolio', error)
        }
        setButtonVisible(true)
    }

    return (
        <Box>
            {buttonVisible ?
                <Button
                    variant='outlined'
                    color='success'
                    size='large'
                    onClick={() => setButtonVisible(false)}>
                    New portfolio
                </Button>
                :
                <Box>
                    <TextField
                        type='text'
                        label='Portfolio name'
                        onChange={handleChange}
                        variant='outlined'
                        color='warning'
                        size='small'
                        focused
                        fullWidth
                        sx={{
                            mb: 1,
                            '& .MuiInputBase-input': {
                                color: 'white',
                            }
                        }}
                    />
                    <Stack
                        direction='row'
                        spacing={1}
                    >
                        <Button
                            variant='outlined'
                            color='success'
                            size='small'
                            onClick={handleSave}>Save</Button>
                        <Button
                            variant='outlined'
                            color='error'
                            size='small'
                            onClick={() => setButtonVisible(true)}>Cancel</Button>
                    </Stack>
                </Box>}
        </Box>
    )
}
