import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography, Grid, Paper } from '@mui/material';

interface FormData {
  platform: string;
  link: string;
}

export default function CreatePage() {
  const { control, handleSubmit } = useForm<FormData>();
  
  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Customize your links
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {[1, 2].map((index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Controller
                  name={`platform${index}`}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label={`Platform #${index}`}
                      fullWidth
                      variant="outlined"
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value="GitHub">GitHub</option>
                      <option value="YouTube">YouTube</option>
                      <option value="LinkedIn">LinkedIn</option>
                    </TextField>
                  )}
                />
                <Controller
                  name={`link${index}`}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={`Link #${index}`}
                      fullWidth
                      variant="outlined"
                      margin="normal"
                    />
                  )}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
          Save
        </Button>
      </form>
    </Box>
  );
}
