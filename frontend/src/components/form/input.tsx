import React, { ReactNode } from 'react'
import { Controller } from 'react-hook-form'
import { TextField, InputAdornment } from '@mui/material'

interface FormInputProps {
  control: any;
  errors: any;
  name: string;
  Icon: ReactNode;
  label: string;
  type?: string
  autoComplete?: string;
  placeholder?: string
}
const FormInput: React.FC<FormInputProps> = ({ 
    control, 
    errors, 
    name, 
    Icon, 
    label, 
    type = "string",
    autoComplete,
    placeholder
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <TextField
          {...field}
          margin="normal"
          required
          fullWidth
          type={type}
          id={name}
          label={label}
          autoComplete={autoComplete ?? name}
          autoFocus
          placeholder={placeholder ?? `e.g. ${label}`}
          error={!!errors[name]}
          helperText={errors[name]?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {Icon}
              </InputAdornment>
            ),
          }}
          
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused': {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#633CFF',
                },
              },
            },
          }}
          InputLabelProps={{
            sx: {
              [`&.Mui-focused`]: {
                color: "#633CFF"
              }
            }
          }}
        />
      )}
    />
  )
}

export default FormInput
