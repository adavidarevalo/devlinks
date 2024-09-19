import { Button } from '@mui/material'

interface SubmitButtonProps {
    text: string
    disabled?: boolean
}

const SubmitButton = ({text, disabled}: SubmitButtonProps) => (
  <Button
    type="submit"
    fullWidth
    variant="contained"
    disabled={disabled}
    sx={{ 
      mt: 3, 
      mb: 2, 
      bgcolor: '#633CFF', 
      '&:hover': { bgcolor: '#4A22C3' }, 
      textTransform: 'none', 
      py: 1.5,
      fontSize: '1rem',
      borderRadius: ".5rem"
    }}
  >
    {text}
  </Button>
)

export default SubmitButton
