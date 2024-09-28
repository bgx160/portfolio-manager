import { Typography } from "@mui/material"
import { Link } from "../types"

interface LinksSectionProps {
    links: Link[]
}


export const LinksSection = ({ links }: LinksSectionProps) => {
    return (
        <>
            {links.map(link => (
                <Typography variant='body1'>
                    <a target='_blank' rel='noopener' href={link.url}>{link.title} </a>
                </Typography>
            ))}
        </>
    )
}
