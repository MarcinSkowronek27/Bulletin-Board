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

// import { useParams } from 'react-router';

import styles from './Post.module.scss';

const Component = ({ className, getAllPosts, getUser, children, props }) => {
  // const { id } = useParams();
  let id = props.match.params.id;
  const [expanded, setExpanded] = React.useState(false);
  const getPostById = id => getAllPosts.find(item => item.id == id);
  console.log('funkcja getPostById', getPostById(id));
  console.log('id', id);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={clsx(className, styles.root)}>
      <h2>Post</h2>
      <Card key={getPostById(id).id} className={clsx(className, styles.card)}>
        {getPostById(id).image &&
          <CardMedia className={styles.image}
            component="img"
            height="250"
            image={getPostById(id).image}
            alt="post-image"
          />
        }
        <CardContent>
          <List>
            <ListItem>
              <Typography gutterBottom variant="h4" component="div">
                {getAllPosts[id - 1].title}
              </Typography>
            </ListItem>
          </List>
          <Divider />
          <div className={clsx(className, styles.details)}>
            <Typography className={styles.price}>
              {getAllPosts[id - 1].price && `Price: ${getAllPosts[id - 1].price}PLN`}
            </Typography>
            <Typography>
              Author: {getAllPosts[id - 1].email}
            </Typography>
            <Typography className={styles.test}>
              Created: {getAllPosts[id - 1].created}
            </Typography>
            {(getAllPosts[id - 1].updated !== getAllPosts[id - 1].created) &&
              <Typography>
                Updated: {getAllPosts[id - 1].updated}
              </Typography>
            }
            <Typography>
              {getAllPosts[id - 1].phone && `Phone number: ${getAllPosts[id - 1].phone}`}
            </Typography>
            <Typography>
              {getAllPosts[id - 1].location && `Location: ${getAllPosts[id - 1].location}`}
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
              {getAllPosts[id - 1].text}
            </Typography>
          </CardContent>
        </Collapse>
        {getUser.logged === true &&
          <CardActions>
            {(getUser.email === getAllPosts[id - 1].email || getUser.name === 'admin') ? <Button size="small" color="primary" component={Link} href={`${id}/edit`}>
              Edit
            </Button>
              : ''
            }
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
  id: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
  match: PropTypes.object,
  props: PropTypes.object,
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

const mapStateToProps = (state, props) => ({
  getAllPosts: getAll(state),
  getUser: getAllUsers(state),
  props,
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
