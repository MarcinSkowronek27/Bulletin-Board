import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from '@material-ui/core';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Header.module.scss';

const Component = ({ className, user }) => {

  const handleUserChange = (e) => {
    e.preventDefault();
    if (e.target.value === 'Logged') user = 'OK';
    else user = 'NOK';
  };
  return (
    <div className={clsx(className, styles.root)}>
      <AppBar position="static">
        <Toolbar disableGutters className={clsx(className, styles.toolbar)}>
          <InputLabel id="demo-simple-select-label">User</InputLabel>
          <Select
            value={user}
            label='User'
            onChange={handleUserChange}
          >
            <MenuItem value={'Logged'}>Logged</MenuItem>
            <MenuItem value={'notLogged'}>Not logged</MenuItem>
          </Select>
          <Link href="/">Posts</Link>
          {user === 'Logged' ?
            <Link component={Button} href="https://">Login</Link>
            :
            <>
              <Link component={Button} href="https://google.com">Login</Link>
            </>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  user: PropTypes.object,
  setUser: PropTypes.func,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Header,
  // Container as Header,
  Component as HeaderComponent,
};
