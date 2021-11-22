import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { Typography } from '@material-ui/core';
// import { CssBaseline } from '@material-ui/core';
import { connect } from 'react-redux';
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

import { getAll } from '../../../redux/postsRedux';
import { getAllUsers } from '../../../redux/usersRedux';

import styles from './Post.module.scss';

const Component = ({ className, getAllPosts, getUser, children, id, image, title, }) => {

  const [expanded, setExpanded] = React.useState(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  console.log(id, title);
  return (
    <div className={clsx(className, styles.root)}>
      <Card key={getAllPosts[0].id} className={clsx(className, styles.card)}>
        {getAllPosts[0].image &&
          <CardMedia
            component="img"
            height="250"
            image={getAllPosts[0].image}
            alt="post-image"
          />
        }
        {/* <CardContent>
            <List>
              <ListItem>
                <Typography gutterBottom variant="h4" component="div">
                  {title}
                </Typography>
              </ListItem>
            </List>
            <Divider />
            <div className={clsx(className, styles.details)}>
              <Typography className={styles.price}>
                {post.price && `Price: ${post.price}PLN`}
              </Typography>
              <Typography>
                Author: {post.email}
              </Typography>
              <Typography className={styles.test}>
                Created: {post.created}
              </Typography>
              {(post.updated !== post.created) &&
                <Typography>
                  Updated: {post.updated}
                </Typography>
              }
              <Typography>
                {post.phone && `Phone number: ${post.phone}`}
              </Typography>
              <Typography>
                {post.location && `Location: ${post.location}`}
              </Typography>
            </div>
          </CardContent>
          <Divider />
          <CardActions disableSpacing>
            <Typography gutterBottom component="div">
              See description
            </Typography>
            <IconButton
              className={clsx(styles.expand, {
                [styles.expandOpen]: expanded,
              })}
              onClick={() => handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph className={clsx(className, styles.text)}>
                {post.text}
              </Typography>
            </CardContent>
          </Collapse>
          {getUser.logged === true &&
            <CardActions>
              {getUser.email === post.email ? <Button size="small" color="primary" component={Link} href="*">
                Edit
              </Button>
                : ''
              }
            </CardActions>
          } */}
      </Card>
      {children}
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.number,
  title: PropTypes.string,
  image: PropTypes.string,
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
  getUser: PropTypes.object,
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
  // Component as Post,
  Container as Post,
  Component as PostComponent,
};
