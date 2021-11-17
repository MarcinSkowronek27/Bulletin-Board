import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from '@material-ui/core';

// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import { connect } from 'react-redux';
import { getAllUsers, getUserStatus } from '../../../redux/usersRedux';

import styles from './Header.module.scss';

const Component = ({ className, users, userStatus }) => {

  const handleUserChange = (e) => {
    e.preventDefault();

    if (users.logged === false) userStatus(true);
    else userStatus(false);
  };

  return (
    <div className={clsx(className, styles.root)}>
      <AppBar position="static">
        <Toolbar disableGutters className={clsx(className, styles.toolbar)}>
          {/* <InputLabel id="label">User</InputLabel> */}
          {/* <Select
            value={user}
            label='User'
            onChange={handleUserChange}
          >
            <MenuItem value={'admin'}>Admin</MenuItem>
            <MenuItem value={'userLogged'}>User</MenuItem>
            <MenuItem value={'notLogged'}>Not logged</MenuItem>
          </Select> */}
          <Link href="/">Posts</Link>
          {users.logged === true ?
            <div className={clsx(className, styles.profile)}>
              <Button>My profile</Button>
              <Button>My posts</Button>
              <Button component={Link} href="/" onClick={handleUserChange}>Logout</Button>
              {/* <Link href="/" onClick={handleUserChange}>Logout</Link> */}
            </div>
            :
            <>
              {/* <Link component={Button} href="https://google.com" >Login</Link> */}
              <Button href="/" onClick={handleUserChange}>Login</Button>
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
  users: PropTypes.object,
  userStatus: PropTypes.func,
};

const mapStateToProps = state => ({
  users: getAllUsers(state),
});

const mapDispatchToProps = dispatch => ({
  userStatus: status => dispatch(getUserStatus(status)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Header,
  Container as Header,
  Component as HeaderComponent,
};
