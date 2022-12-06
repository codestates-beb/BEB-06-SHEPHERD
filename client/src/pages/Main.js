import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import MainFeaturedPost from 'components/MainFeaturedPost';
import FeaturedPost from 'components/FeaturedPost';
import Map from '../components/Map';
import ReactTooltip from 'react-tooltip';

// blog

const mainFeaturedPost = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random',
  imageText: 'main image description',
  linkText: 'Continue reading…'
};

const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text'
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text'
  }
];

function Main () {
  return (
    <Container maxWidth='lg'>
      <Box
        component='main' sx={{
          display: 'flex',
          height: '100%'
        }}
      >
        {/* <MainFeaturedPost post={mainFeaturedPost} />
        <Grid container spacing={4}>
          {featuredPosts.map((post) => (
            <FeaturedPost key={post.title} post={post} />
          ))}
        </Grid>
        <Grid container spacing={5} sx={{ mt: 3 }} /> */}
        <Map className='mapbox' marginBottom='20px' title='Shepherd: Current Supplychain' />
        <ReactTooltip place='bottom' effect='solid' type='warning' />
      </Box>
    </Container>
  );
}

export default Main;
