import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, fetchPublished } from '../../../redux/postsRedux';
import { getAllUsers } from '../../../redux/usersRedux';
// import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';
// import { CssBaseline } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { Link } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import styles from './Homepage.module.scss';

// const theme = createTheme({
//   typography: {
//     // Tell MUI what the font-size on the html element is.
//     htmlFontSize: 10,
//   },
// });

const Component = ({ className, allPosts, allUsers, children, fetchPublishedPosts }) => {

  fetchPublishedPosts();
  return (
    // <ThemeProvider theme={theme}>
    <div className={clsx(className, styles.root)}>
      {/* <CssBaseline /> */}
      {allUsers.logged === true ?
        <Grid
          container
          spacing={1}
          direction="row"
          alignItems="center"
          justifyContent="space-around"
        >
          <Grid item>
            <Button variant="contained" color="primary" component={Link} href="post/add">
              Add post
            </Button>
          </Grid>
        </Grid>
        : ''
      }
      <Typography variant="h5">
        Posts:
      </Typography>
      <div className={clsx(className, styles.postsContainer)}>
        {allPosts.map((post, index) => (
          <Card key={post._id} className={clsx(className, styles.card)}>
            {post.photo &&
              <CardMedia
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
              <div className={clsx(className, styles.details)}>
                <Typography className={styles.price}>
                  {post.price && `Price: ${post.price}PLN`}
                </Typography>
                <Typography>
                  Author: {post.author}
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
            {allUsers.logged === true &&
              <CardActions>
                <Button size="small" color="primary" component={Link} href={`post/${post._id}`}>
                  See more
                </Button>
                {allUsers.email === post.author ? <Button size="small" color="primary" component={Link} href={`post/${post._id}/edit`}>
                  Edit
                </Button>
                  :
                  <Button size="small" color="primary" component={Link} href={`post/${post._id}/edit`}>
                    Edit
                  </Button>
                }
              </CardActions>
            }
          </Card>
        ))}
      </div>
      {children}
    </div >
    // </ThemeProvider>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  allPosts: PropTypes.array,
  allUsers: PropTypes.object,
  fetchPublishedPosts: PropTypes.func,
};

const mapStateToProps = state => ({
  allPosts: getAll(state),
  allUsers: getAllUsers(state),
});

const mapDispatchToProps = dispatch => ({
  fetchPublishedPosts: () => dispatch(fetchPublished()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
