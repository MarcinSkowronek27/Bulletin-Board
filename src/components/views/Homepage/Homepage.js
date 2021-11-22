import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/postsRedux';
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
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';

import styles from './Homepage.module.scss';

// const theme = createTheme({
//   typography: {
//     // Tell MUI what the font-size on the html element is.
//     htmlFontSize: 10,
//   },
// });

const Component = ({ className, getAllPosts, getUser, children }) => {
  // console.log('getUser', getUser);
  const [expanded] = React.useState(false);
  const [expandedId, setExpandedId] = React.useState(-1);

  const handleExpandClick = (i) => {
    setExpandedId(expandedId === i ? -1 : i);
  };
  return (
    // <ThemeProvider theme={theme}>
    <div className={clsx(className, styles.root)}>
      {/* <CssBaseline /> */}
      {getUser.logged === true ?
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
        {getAllPosts.map((post, index) => (
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
                onClick={() => handleExpandClick(index)}
                aria-expanded={expandedId === index}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={expandedId === index} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph className={clsx(className, styles.text)}>
                  {post.text}
                </Typography>
              </CardContent>
            </Collapse>
            {getUser.logged === true &&
              <CardActions>
                <Button size="small" color="primary" component={Link} href={`post/${post.id}`}>
                  See more
                </Button>
                {getUser.email === post.email ? <Button size="small" color="primary" component={Link} href="post/:id/edit">
                  Edit
                </Button>
                  :
                  <Button size="small" color="primary" component={Link} href="*">
                    Edit
                  </Button>
                }
              </CardActions>
            }
          </Card>
        ))}
      </div>
      {children}
    </div>
    // </ThemeProvider>
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
  getUser: PropTypes.object,
  // getUser: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     id: PropTypes.number,
  //     name: PropTypes.string,
  //     logged: PropTypes.boolean,
  //     email: PropTypes.string,
  //   })
  // ),
};

const mapStateToProps = state => ({
  getAllPosts: getAll(state),
  getUser: getAllUsers(state),
});

// const mapDispatchToProps = dispatch => ({
//   userStatus: status => dispatch(getUserStatus(status)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
