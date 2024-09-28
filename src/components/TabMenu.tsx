import { Box, Tabs } from "@mui/material";
import { Tab } from "@mui/material";
import { SyntheticEvent } from "react";
import { tabMenuStyles } from "../styles";

interface TabMenuProps {
    handleChange: (e: SyntheticEvent, value: string) => void
    selectedTab: string
}

export const TabMenu = ({ handleChange, selectedTab }: TabMenuProps) => {

    return (
        <Box sx={{ position: 'fixed', display: 'flex', height: '100vh', backgroundColor: '#1e1e1e' }}>
            <Tabs textColor='primary' indicatorColor='primary' color='primary' sx={tabMenuStyles}
                orientation='vertical'
                value={selectedTab}
                onChange={handleChange}>
                <Tab value='one' label='Portfolio management'></Tab>
                <Tab value='two' label='Project editor'></Tab>
                <Tab value='three' label='Settings'></Tab>
            </Tabs>

        </Box>

    )
}
