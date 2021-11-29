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

import { getOnePost, fetchPostById } from '../../../redux/postsRedux';
import { getAllUsers, setUserStatus } from '../../../redux/usersRedux';

// import { useParams } from 'react-router';

import styles from './Post.module.scss';

const Component = ({ className, post, fetchOnePost, getUser, children }) => {
  // const { id } = useParams();
  const [expanded, setExpanded] = React.useState(false);
  /* eslint-disable-next-line */
  // const getPostById = id => getAllPosts.find(item => item.id == id);
  // console.log('funkcja getPostById', getPostById(id));
  // console.log('id', id);
  // console.log('post', post);
  fetchOnePost();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div className={clsx(className, styles.root)}>
      <h2>Post</h2>
      <Card className={clsx(className, styles.card)}>
        {post.photo &&
          <CardMedia className={styles.image}
            component="img"
            height="250"
            image={post.photo}
            alt="post-image"
          />
        }
        <CardContent>
          <List>
            <ListItem>
              <Typography gutterBottom variant="h4" component="div">
                {post.title}
              </Typography>
            </ListItem>
          </List>
          <Divider />
          <div className={clsx(className, styles.author)}>
            <Typography className={styles.price}>
              {post.price && `Price: ${post.price}PLN`}
            </Typography>
            <Typography>
              Author: {post.author}
            </Typography>
            <Typography >
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
            onClick={handleExpandClick}
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
            <Button size="small" color="primary" component={Link} href={`${post._id}/edit`}>
              Edit
            </Button>
          </CardActions>
        }
      </Card>
      {children}
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  getUser: PropTypes.object,
  post: PropTypes.object,
  fetchOnePost: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
  post: getOnePost(state),
  getUser: getAllUsers(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  userStatus: status => dispatch(setUserStatus(status)),
  fetchOnePost: () => dispatch(fetchPostById(props.match.params.id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Post,
  Container as Post,
  Component as PostComponent,
};
