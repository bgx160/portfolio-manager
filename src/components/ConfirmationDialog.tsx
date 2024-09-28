import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"

interface ConfirmationDialogProps {
    open: boolean
    title: string
    details?: string
    onConfirm: () => void
    onClose: () => void
}

export const ConfirmationDialog = ({ open, title, details, onConfirm, onClose }: ConfirmationDialogProps) => {
    return (
        <>
            <Dialog sx={{
                '& .MuiDialog-paper': {
                    padding: 1,
                    borderRadius: 1,
                    maxWidth: 300
                },
            }} open={open}>
                <DialogTitle>
                    {title}
                </DialogTitle>

                {details &&
                    <DialogContent>
                        {details}
                    </DialogContent>}

                <DialogActions sx={{ justifyContent: 'space-between', mt: 2 }}>
                    <Button
                        onClick={onConfirm}
                        variant='outlined'
                        color='success'
                        type='submit'>
                        Yes
                    </Button>
                    <Button
                        onClick={onClose}
                        variant='outlined'
                        color='error'>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
