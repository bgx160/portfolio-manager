import { Card, Box, Stack, Typography, Divider } from "@mui/material"
import { SavedPortfolio } from "../types"
import { commonBoxStyles, commonTypographyStyles, portfolioListCardStyles } from "../styles"
import { CardActionsMenu } from "./CardActionsMenu"
import { deletePortfolio } from "../services/api"
import { useState } from "react"
import { ConfirmationDialog } from "./ConfirmationDialog"

interface PortfolioListProps {
    portfolios?: SavedPortfolio[] | null
    onSelectPortfolio?: (id: number) => void
    onChangeTab?: (value: string) => void
    refetchPortfolios: () => void

}

export const PortfolioList = ({ portfolios = null, onSelectPortfolio, onChangeTab, refetchPortfolios }: PortfolioListProps) => {
    const [confirmationOpen, setConfirmationOpen] = useState(false)

    const handleSelect = (id: number) => {
        onSelectPortfolio && onSelectPortfolio(id)
        navigateToProjectEditor()
    }

    const handleDelete = async (portfolioId: number) => {
        try {
            await deletePortfolio(portfolioId)
            refetchPortfolios()
        } catch (error) {
            console.error('Error deleting portfolio', error)
        }
        setConfirmationOpen(false)
    }

    const navigateToProjectEditor = () => {
        onChangeTab && onChangeTab('two')
    }

    if (!portfolios || portfolios.length < 1) return <Typography variant='h6' component='h2' sx={{ ...commonTypographyStyles, mt: 2 }}>You don't have any portfolios</Typography>

    return (
        <>
            <Box sx={{ maxWidth: 1600 }}>
                <Typography variant='h5' component='h2' sx={{ ...commonTypographyStyles, mt: 2 }}>My portfolios</Typography>
                <Box sx={{ ...commonBoxStyles, mt: 1, border: '1px solid #1d3030', background: 'linear-gradient(145deg, #1d3030, #292830)' }}>
                    <Stack direction='row' spacing={2} flexWrap='wrap' useFlexGap>
                        {portfolios.map(portfolio => (
                            <Box key={portfolio._id}>
                                <ConfirmationDialog
                                    open={confirmationOpen}
                                    title='Delete portfolio'
                                    details='Portfolio and all its contents will be deleted. Continue?'
                                    onClose={() => setConfirmationOpen(false)}
                                    onConfirm={() => handleDelete(portfolio._id)} />
                                <Card
                                    onClick={() => handleSelect(portfolio._id)}
                                    variant='outlined' sx={portfolioListCardStyles}>
                                    <Box sx={{ p: 2 }}>
                                        <Stack
                                            direction='row'
                                            sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                                        >
                                            <Typography gutterBottom variant='h5' component='div'>
                                                {portfolio.name}
                                            </Typography>
                                            <CardActionsMenu onDelete={() => setConfirmationOpen(true)} />
                                        </Stack>
                                    </Box>
                                    <Divider />
                                    <Box sx={{ p: 2 }}>
                                        {portfolio.content && portfolio.content.projects ?
                                            portfolio.content.projects.map(project => (
                                                <Typography key={project.id} gutterBottom variant='body2'>
                                                    {project.title}
                                                </Typography>
                                            ))
                                            :
                                            <Typography>
                                                No projects found
                                            </Typography>}
                                    </Box>
                                </Card>
                            </Box>
                        ))}
                    </Stack>
                </Box>
            </Box>
        </>
    )
}
