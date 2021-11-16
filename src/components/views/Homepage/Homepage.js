import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, getAllUsers } from '../../../redux/postsRedux';

import { Typography } from '@material-ui/core';
import { CssBaseline } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { Link } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';

import styles from './Homepage.module.scss';

const Component = ({ className, getAllPosts, getUser, children }) => {



  return (
    <div className={clsx(className, styles.root)}>
      <CssBaseline />
      <Typography variant="h5">
        Posts:
      </Typography>
      <div className={clsx(className, styles.postsContainer)}>
        {getAllPosts.map((post) => (
          <Card key={post.id} className={clsx(className, styles.card)}>
            {post.image &&
              <CardMedia
                component="img"
                height="250"
                image={post.image}
                alt="post-image"
              />
            }
            <CardContent>
              <List>
                <ListItem>
                  <Typography gutterBottom variant="h5" component="div">
                    {post.title}
                  </Typography>
                </ListItem>
              </List>
              <Divider />
              <div className={clsx(className, styles.email)}>
                <Typography>
                  Author: {post.email}
                </Typography>
                <Typography>
                  Created: {post.created}
                </Typography>
                {(post.updated !== post.created) &&
                  <Typography>
                    Updated: {post.updated}
                  </Typography>
                }
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {children}
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  getAllPosts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      text: PropTypes.string,
      created: PropTypes.string,
      updated: PropTypes.string,
      email: PropTypes.string,
      status: PropTypes.string,
      image: PropTypes.string,
      price: PropTypes.string,
      phone: PropTypes.string,
      location: PropTypes.string,
    })
  ),
  getUser: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      logged: PropTypes.string,
      email: PropTypes.string,
    })
  ),
};

const mapStateToProps = state => ({
  getAllPosts: getAll(state),
  getUser: getAllUsers(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
