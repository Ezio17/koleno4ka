import React from 'react'
import { useField } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%'
  }
}));

const FormikSelect = ({ ...props }) => {
  const classes = useStyles();

  const [field, meta] = useField(props);

  const error = meta.error && meta.touched && meta.error

  return (
    <FormControl className={classes.formControl} error={error}>
      <InputLabel id="demo-simple-select-error-label">Категория</InputLabel>
      <Select {...field}>
        <MenuItem value='Разное'>
          Разное
        </MenuItem>
        <MenuItem value='Леночка'>Леночка</MenuItem>
        <MenuItem value='Коля'>Коля</MenuItem>
        <MenuItem value='Общее'>Общее</MenuItem>
      </Select>
      <FormHelperText>{error && error}</FormHelperText>
    </FormControl>
  )
}

export default FormikSelect;