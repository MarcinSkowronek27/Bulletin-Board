import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link } from '@material-ui/core';

import { connect } from 'react-redux';
import { getAllUsers, getUserStatus } from '../../../redux/usersRedux';
import { NotFound } from '../NotFound/NotFound';

import styles from './PostAdd.module.scss';

const Component = ({ className, getUser, children }) => {

  const [values, setValues] = React.useState({
    amount: '',
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div className={clsx(className, styles.root)}>
      {getUser.logged === true ?
        <>
          <h2>Add post</h2>
          <Grid
            container
            spacing={1}
            direction="row"
            alignItems="center"
            justifyContent="left"
          >
            <Grid item>
              <Button variant="contained" color="primary" component={Link} href="/">
                Homepage
              </Button>
            </Grid>
          </Grid>

          <form className={clsx(className, styles.form)} noValidate autoComplete="off">
            <TextField id="author" label="Email" variant="outlined" />
            <TextField id="phone" label="Phone number" variant="outlined" />
            <TextField id="title" label="Title" variant="outlined" />
            <TextField
              id="text"
              label="Post description"
              multiline
              rows={12}
              variant="outlined"
            />
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
              <OutlinedInput
                id="price"
                value={values.amount}
                onChange={handleChange('amount')}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                labelWidth={60}
              />
            </FormControl>
            <TextField id="location" label="Location" variant="outlined" />
            <div>
              <input
                accept=".jpg, .jpeg, .png, .gif"
                className={clsx(className, styles.input)}
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                  Upload image
                </Button>
              </label>
            </div>
            <Button variant="contained" color="secondary" type="submit" className={clsx(className, styles.submit)}>
              Submit
            </Button>
          </form>
        </>
        : <NotFound />
      }
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  getUser: PropTypes.object,
};

const mapStateToProps = state => ({
  getUser: getAllUsers(state),
});

const mapDispatchToProps = dispatch => ({
  userStatus: status => dispatch(getUserStatus(status)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
