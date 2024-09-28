import { Typography } from '@mui/material'
import { NewPortfolio } from '../components/NewPortfolio'
import { PortfolioList } from '../components/PortfolioList'
import { commonTypographyStyles } from '../styles'
import { SavedPortfolio } from '../types'

interface PortFolioManagementProps {
    changeTab?: (value: string) => void
    selectPortfolio: (id: number | null) => void
    portfolios: SavedPortfolio[] | null
    refetchPortfolios: () => void
}

export const PortfolioManagement = ({ changeTab, selectPortfolio, portfolios, refetchPortfolios }: PortFolioManagementProps) => {
    return (
        <>
            <Typography variant='h2' component='h1' sx={{ ...commonTypographyStyles, mt: 2 }}>Portfolio Management</Typography>

            <NewPortfolio refetchPortfolios={refetchPortfolios} />

            <PortfolioList refetchPortfolios={refetchPortfolios} portfolios={portfolios} onChangeTab={changeTab} onSelectPortfolio={selectPortfolio} />
        </>
    )
}
