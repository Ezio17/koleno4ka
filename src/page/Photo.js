import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import { Formik, Form } from 'formik';
import * as yup from "yup";
import FormHelperText from '@material-ui/core/FormHelperText';
import FormikSelect from '../components/FormikSelect'
import ImageLightBox from '../components/ImageLightBox'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';

const useStyles = makeStyles((theme) => ({
  upload: {
    width: '150px',
    [theme.breakpoints.down('xs')]: {
      width: '95%',
      marginBottom: '20px'
    },
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  avatar: {
    width: '100%',
    marginBottom: '15px',
    objectFit: 'contain',
    maxHeight: '500px',
  },
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
  },
  select: {
    width: '300px',

    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  formControl: {
    [theme.breakpoints.down('xs')]: {
      width: '95%',
    },
  },

  modal: {
    overflowY: 'scroll',
    margin: '20px 0'
  }
}));

const validationSchema = yup.object({
  file: yup
    .mixed()
    .required("Фотография обязательна."),
  select: yup
    .string()
    .required('Категория обязательная.')
})

const Photo = ({ getPhoto, addPhoto, deletePhoto, photo, width }) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('Все')
  const [filterPhoto, setFilterPhoto] = useState([])

  useEffect(() => {
    getPhoto();
  }, [])

  useEffect(() => {
    setCurrentCategory('Все')
    setFilterPhoto(photo);
  }, [photo])

  useEffect(() => {
    if (currentCategory === 'Все') {
      return setFilterPhoto(photo)
    }

    setFilterPhoto(photo.filter(item => item.category === currentCategory))
  }, [currentCategory])

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  return (
    <main>
      <div className={classes.header}>
        <Button onClick={handleOpen} className={classes.upload} variant="contained" color="primary" component="span">
          Добавить
       </Button>
        <FormControl className={classes.formControl}>
          <InputLabel id="category">Категория</InputLabel>
          <Select
            className={classes.select}
            label='Категория'
            id="category"
            value={currentCategory}
            onChange={(event) => setCurrentCategory(event.target.value)}
          >
            <MenuItem value='Все'>Все</MenuItem>
            <MenuItem value='Разное'>Разное</MenuItem>
            <MenuItem value='Леночка'>Леночка</MenuItem>
            <MenuItem value='Коля'>Коля</MenuItem>
            <MenuItem value='Общее'>Общее</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <Formik
          initialValues={{
            file: "",
            select: "",
          }}
          onSubmit={(values, { resetForm }) => {
            addPhoto(values.file, values.select)
            resetForm();
          }}
          validationSchema={validationSchema}
        >
          {({ errors, touched, values, setFieldValue }) => {
            return (
              <Form>
                <div className={classes.paper}>
                  <img src={values.file ? URL.createObjectURL(values.file) : require('../assets/img/person.png')} className={classes.avatar} alt='avatar' />
                  <Grid alignItems='flex-end' justify='center' container xs={12} spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <label htmlFor="upload-photo">
                        <input
                          style={{ display: "none", marginTop: '15px' }}
                          id="upload-photo"
                          name="upload-photo"
                          type="file"
                          onChange={(e) => {
                            setFieldValue("file", e.currentTarget.files && e.currentTarget.files[0])
                          }}
                        />
                        <Fab
                          color="primary"
                          size="small"
                          component="span"
                          aria-label="add"
                          variant="extended"
                          style={{ width: '100%', height: '35px', paddingBottom: '0px' }}
                        >
                          Загрузить фото
                       </Fab>
                      </label>
                      <FormHelperText error>{errors.file && touched.file && errors.file}</FormHelperText>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormikSelect name='select' />
                    </Grid>
                    <Grid item xs={12}>
                      <Button style={{ width: '100%', height: '40px' }} type="submit" variant="outlined" color="secondary">Добавить</Button>
                    </Grid>
                    {isWidthDown('xs', width) && (
                      <Grid item xs={12}>
                        <Button style={{ width: '100%', height: '40px' }} onClick={handleClose} variant="outlined" color="primary">Закрыть</Button>
                      </Grid>
                    )}
                  </Grid>
                </div>
              </Form>
            )
          }}
        </Formik>
      </Modal>
      <ImageLightBox photo={filterPhoto} deletePhoto={deletePhoto} />
    </main >
  )
}

export default withWidth()(Photo)