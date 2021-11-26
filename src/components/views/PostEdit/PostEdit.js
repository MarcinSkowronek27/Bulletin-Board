import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/postsRedux';
import { getAllUsers, getUserStatus } from '../../../redux/usersRedux';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link } from '@material-ui/core';
import { NotFound } from '../NotFound/NotFound';

import styles from './PostEdit.module.scss';

const Component = ({ className, children, getUser }) => {

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
          <h2>Edit post</h2>
          <Grid
            container
            spacing={1}
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <Button variant="contained" color="primary" component={Link} href="/">
                Homepage
              </Button>
            </Grid>
          </Grid>

          <form className={clsx(className, styles.form)} noValidate autoComplete="off">
            <TextField id="author" label="Email" variant="outlined" defaultValue={`admin@example.com`} />
            <TextField id="phone" label="Phone number" variant="outlined" defaultValue={null} />
            <TextField id="title" label="Title" variant="outlined" defaultValue={`Welcome to our bulletin board!`} />
            <TextField
              id="text"
              label="Post description"
              multiline
              rows={12}
              variant="outlined"
              defaultValue={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Error molestias omnis officiis illo repellendus consequuntur eligendi accusamus tempore ex maxime voluptatibus dolorum inventore officia eius iusto optio quisquam, odit vel, recusandae.`}
            />
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
              <OutlinedInput
                id="price"
                onChange={handleChange('amount')}
                startAdornment={<InputAdornment position="start">PLN</InputAdornment>}
                labelWidth={60}
                defaultValue={`200`}
              />
            </FormControl>
            <TextField id="location" label="Location" variant="outlined" defaultValue={`Warsaw, PL, street Lorem ipsum 42`} />
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
      {children}
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  getUser: PropTypes.object,
};

const mapStateToProps = state => ({
  getAllPosts: getAll(state),
  getUser: getAllUsers(state),
});

const mapDispatchToProps = dispatch => ({
  userStatus: status => dispatch(getUserStatus(status)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostEdit,
  Container as PostEdit,
  Component as PostEditComponent,
};
