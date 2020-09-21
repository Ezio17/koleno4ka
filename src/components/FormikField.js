import React from 'react'
import { useField } from 'formik';
import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  input: {
    height: '50px',
    width: '100%',

    '& label': {
      fontSize: '14px'
    }
  },
}));

const FormikField = ({ label, type = 'text', ...props }) => {
  const classes = useStyles(props);

  const [field, meta] = useField(props);

  const error = meta.error && meta.touched && meta.error

  return (
    <TextField
      label={label}
      type={type}
      error={!!error}
      helperText={error}
      className={classes.input}
      {...field}
    />
  )
}

export default FormikField 