import React, { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Formik, Form } from 'formik';
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TextField } from '@material-ui/core'
import moment from 'moment';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';

import FormikField from '../components/FormikField'
import WordsList from '../components/WordsList'

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
  },
  words: {
    textAlign: 'center',
    color: theme.palette.secondary.main,
    minHeight: '150px'
  },
  date: {
    textAlign: 'center',
    color: theme.palette.primary.main
  },
  wordsAdd: {
    width: '100%',
    fontSize: '12px',
    height: '27px',

    [theme.breakpoints.down('xs')]: {
      height: '37px'
    },
  },
  title: {
    paddingTop: "6px",
    fontSize: '30px'
  },
}));

const validationSchemaWords = yup.object({
  title: yup
    .string()
    .required('Required')
    .min(2, 'Least 2 characters')
    .trim(),
  author: yup
    .string()
    .required('Required')
    .min(2, 'Least 2 characters')
    .trim(),
})

const validationSchemaDate = yup.object({
  titleDate: yup
    .string()
    .required('Required')
    .min(2, 'Least 2 characters')
    .trim(),
  date: yup
    .string()
    .required('Required')
})

const Word = ({ getWords, addWords, deleteWords, words, date, getDate, addDate, deleteDate, width }) => {
  const classes = useStyles();

  useEffect(() => {
    getWords()
    getDate()
  }, []);

  return (
    <main className={classes.main}>
      <Grid container xs={12} spacing={isWidthDown('xs', width) ? 0 : 2}>
        <Grid item xs={12} md={6}>
          <Paper className={classes.words}>
            <h2 className={classes.title}>Слова</h2>
            <Formik
              initialValues={{
                title: "",
                author: "",
              }}
              onSubmit={(values, { resetForm }) => {
                addWords(values.title, values.author);
                resetForm({});
              }}
              validationSchema={validationSchemaWords}
            >
              {() => {
                return (
                  <Form>
                    <Grid style={{ marginBottom: '15px' }} className={classes.wrapper} style={{ alignItems: 'flex-end', marginLeft: '2px' }} container xs={12} spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <FormikField name="title" label='Цитатка' />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <FormikField name="author" label='Гений' />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Button type="submit" className={classes.wordsAdd} variant="outlined" color="primary">
                          Добавить
                     </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )
              }}
            </Formik>
            <WordsList deleteWords={deleteWords} words={words} />
          </Paper>
        </Grid>
        <Grid style={{ marginBottom: '15px' }} item xs={12} md={6}>
          <Paper className={classes.date}>
            <h2 className={classes.title}>Даты</h2>
            <Formik
              initialValues={{
                date: new Date(),
                titleDate: "",
              }}
              onSubmit={(values, { resetForm }) => {
                addDate(values.titleDate, moment(values.date).format('DD/MM/YYYY'));
                resetForm({});
              }}
              validationSchema={validationSchemaDate}
            >
              {({ values, setFieldValue }) => {
                return (
                  <Form>
                    <Grid style={{ alignItems: 'flex-end', marginLeft: '2px' }} container xs={12} spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <DatePicker
                          selected={values.date}
                          onChange={(date) => setFieldValue('date', date)}
                          customInput={<TextField />}
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <FormikField name="titleDate" label='Событие' />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Button type="submit" className={classes.wordsAdd} variant="outlined" color="primary">
                          Добавить
                     </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )
              }}
            </Formik>
            <WordsList deleteWords={deleteDate} words={date} />
          </Paper>
        </Grid>
      </Grid>
    </main >
  )
}

export default withWidth()(Word)