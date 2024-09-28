import { SxProps, Theme } from '@mui/material';

export const commonBoxStyles: SxProps<Theme> = {
  borderRadius: 2,
  padding: 2,
  boxShadow: 3,
  border: '1px solid #2a4d4d',
}

export const commonTypographyStyles: SxProps<Theme> = {
  mb: 2,
  color: '#fff',
}

export const basicInfoBoxStyles: SxProps<Theme> = {
  ...commonBoxStyles,
  background: 'linear-gradient(145deg, #2F4F4F, #1c1c1c)',
  borderRadius: 3,
  mb: 2
}

export const projectsBoxStyles: SxProps<Theme> = {
  ...commonBoxStyles,
  borderRadius: 3,
  background: 'linear-gradient(145deg, #437070, #345d5d)',
}

export const contentCardStyles = {
  width: 420, height: 300, boxShadow: 3
}

export const portfolioListCardStyles: SxProps<Theme> = {

  width: { xs: 300, md: 420 },
  height: 300,
  boxShadow: 3,
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    // Lift on hover and make shadows stronger
    transform: 'translateY(-4px)',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)',
    cursor: 'pointer'
  }
}

export const tabMenuStyles: SxProps<Theme> = {
  borderRight: 1,
  borderColor: 'divider',
  height: '100%',
  width: 240,
  '& .MuiTab-root': {
    color: 'lightgray !important',   // Default color for inactive tabs
  },
  '& .Mui-selected': {
    color: '#70a9a9 !important',   // Color for the active tab
  },
  '& .MuiTabs-indicator': {
    backgroundColor: '#70a9a5 !important',  // Color for the selected tab indicator (underline)
  },
}

export const publishedPortfolioPageStyles: SxProps<Theme> = {
  width: '100vw',
  height: '100vh',
}

export const publishedPortfolioStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  padding: 3,
  flexDirection: 'column',
  // backgroundColor: '#1a1a1a',// 'linear-gradient(135deg, #2F4F4F 0%, #1C3A3A 100%)', 
  maxWidth: 1024,
  minHeight: '100vh',
  mx: 'auto',
  overFlow: 'auto'
}

export const aboutMeSectionStyles: SxProps<Theme> = {
  padding: 4,
  backgroundColor: '#1a1a1a',
  borderRadius: 1,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth hover effect
  '&:hover': {
    backgroundColor: '#132020',
    transform: 'translateY(-5px)', // Lift on hover
    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)', // Slightly stronger shadow
  }
}

export const projectSectionStyles: SxProps<Theme> = {
  backgroundColor: '#383838',
  mt: 2,
  padding: 2,
  borderRadius: 1,
}

export const projectDisplayStyles: SxProps<Theme> = {
  backgroundColor: '#1a1a1a',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth hover effect
  mt: 1,
  padding: 2,
  borderRadius: 1,
  '&:hover': {
    backgroundColor: '#132020',
    transform: 'translateY(-5px)', // Lift on hover
    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)', // Slightly stronger shadow
  }
}

export const loginStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 3,
}

export const loginPageStyles: SxProps<Theme> = {
  minWidth: '100vw',
  minHeight: '100vh',
}