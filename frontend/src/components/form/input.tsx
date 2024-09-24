import React, { ReactNode } from 'react'
import { Controller } from 'react-hook-form'
import { TextField, InputAdornment } from '@mui/material'
import _ from 'lodash';

interface FormInputProps {
  control: any;
  errors: any;
  name: string;
  Icon?: ReactNode;
  label: string;
  type?: string
  autoComplete?: string;
  placeholder?: string
  disabled?: boolean
}
const FormInput: React.FC<FormInputProps> = ({ 
    control, 
    errors, 
    name, 
    Icon, 
    label, 
    type = "string",
    autoComplete,
    placeholder,
    disabled
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
          disabled={disabled}
          label={label}
          autoComplete={autoComplete ?? name}
          autoFocus
          placeholder={placeholder ?? `e.g. ${label}`}
          error={!!_.get(errors, `[${name}]`)}
          helperText={_.get(errors, `[${name}].message`)}
          InputProps={{
            startAdornment: (
              <>
              {Icon && (
              <InputAdornment position="start">
                {Icon}
              </InputAdornment>
              )}
              </>
            ),
          }}
          
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused': {
                '& .MuiOutlinedInput-notchedOutline': {
                  border: '1px solid #633CFF',
                  boxShadow: '0 0 32px 0 rgba(99,60,255,.25)', // Added focus box shadow

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
