import { Card, Box, Stack, Typography, Divider } from '@mui/material'
import { CardActionsMenu } from './CardActionsMenu'
import { contentCardStyles } from '../styles'

interface ContentCardProps {
    title: string
    content: string
    onEdit?: () => void
    onDelete?: () => void
}

export const ContentCard = ({ title, content, onEdit, onDelete }: ContentCardProps) => {
    return (
        <Card onClick={onEdit} variant='outlined' sx={contentCardStyles}>
            <Box sx={{ p: 2 }}>
                <Stack
                    direction='row'
                    sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                >
                    <Typography gutterBottom variant='h5' component='div'>
                        {title}
                    </Typography>
                    <CardActionsMenu onEdit={onEdit} onDelete={onDelete} />
                </Stack>
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
                <Typography gutterBottom variant='body2'>
                    {content}
                </Typography>

            </Box>
        </Card>
    )
}
