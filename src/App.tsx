import { Box } from '@mui/material';
import { TabMenu } from './components/TabMenu';
import { SyntheticEvent, useEffect, useState } from 'react';
import { PortfolioManagement } from './pages/PortfolioManagement';
import { ProjectManagement } from './pages/ProjectManagement';
import { TopAppBar } from './components/TopAppBar';
import { getPortfolios } from './services/api';
import { SavedPortfolio } from './types';
import { getUserInfo } from './utils/utlis';

export const App = () => {
    const [value, setValue] = useState('one')
    const [tabMenuOpen, setTabMenuOpen] = useState(true)

    const [selectedPortfolioId, setSelectedPortfolioId] = useState<null | number>(null)
    const [portfolios, setPortfolios] = useState<SavedPortfolio[] | null>(null)
    const [refetch, setRefetch] = useState(false)

    const selectPortfolio = (id: number | null) => setSelectedPortfolioId(id)

    const triggerRefetch = () => {
        setRefetch(prev => !prev)
    }

    useEffect(() => {
        fetchPortfolios()
    }, [refetch])

    const fetchPortfolios = async () => {
        const user = getUserInfo()

        if (!user || !user._id) {
            console.error('User information not found in localStorage or missing user._id')
            setPortfolios(null)
            return
        }

        const res = await getPortfolios(user._id)
        if (res.ok) {
            console.log(`Fetched portfolios with userId ${user._id} from database`)
            const portfolios = await res.json()
            setPortfolios(portfolios)
        } else {
            setPortfolios(null)
            console.log('Error fetching portfolios')
        }

    }

    const handleMenuClick = () => {
        setTabMenuOpen(tabMenuOpen ? false : true)
    }

    const handleChange = (_e: SyntheticEvent, value: string) => {
        setValue(value)
    }

    const changeTab = (tab: string) => {
        setValue(tab)
    }


    return (
        <>
            <TopAppBar handleButtonClick={handleMenuClick} />
            <Box display="flex">
                <Box
                    sx={{
                        width: tabMenuOpen ? '250px' : '0px',
                        transition: 'width 0.3s ease',
                        borderColor: 'divider',
                        height: '100vh',

                    }}
                >
                    {tabMenuOpen &&
                        <TabMenu handleChange={handleChange} selectedTab={value} />
                    }
                </Box>
                <Box sx={{ flexGrow: 1, p: 3 }}>
                    {value === 'one' && <PortfolioManagement refetchPortfolios={triggerRefetch} portfolios={portfolios} changeTab={changeTab} selectPortfolio={selectPortfolio} />}
                    {value === 'two' && <ProjectManagement refetchPortfolios={triggerRefetch} portfolios={portfolios} selectedPortfolioId={selectedPortfolioId} selectPortfolio={selectPortfolio} />}
                    {value === 'three' && <h1>Settings page coming soon...</h1>}
                </Box>
            </Box >
        </>
    )
}