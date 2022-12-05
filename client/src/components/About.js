import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Markdown from './Markdown';

function About(props) {
  const { posts, title } = props;

  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        overflowWrap: 'anywhere',
        '& .markdown': {
          py: 3,
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {posts.map((post) => (
        <Markdown className="markdown" key={post.substring(0, 40)}>
          {post}
        </Markdown>
      ))}
    </Grid>
  );
}

About.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};

export default About;