import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainFeaturedPost from 'components/MainFeaturedPost';
import FeaturedPost from 'components/FeaturedPost';
<<<<<<< Updated upstream

//blog
=======
import About from 'components/About';
import post1 from 'components/shepherd.md'
import { useEffect, useState } from 'react';
>>>>>>> Stashed changes

const mainFeaturedPost = {
  title: 'Shepherd - to Track & Protect!',
  description:
    "Shepherd links the physical world of trade, transport & logistics with the blockchain, by replacing paper documents with smart contracts. Shepherd provides secure tracking of each and every supply from production to finish (End-2-End).",
  image: 'https://source.unsplash.com/random',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
];

<<<<<<< Updated upstream
const theme = createTheme();

function Main() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid Container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
          </Grid>
        </main>
      </Container>
    </ThemeProvider>
=======
function Main() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetch(post1).then
    (res => {
     return res.text()
    }).then(text => {
      setPosts([text])
    })
  });
  return (
    <Container maxWidth='lg'>
      <Box component='main'>
        <MainFeaturedPost post={mainFeaturedPost} />
        <Grid Container spacing={4}>
          {featuredPosts.map((post) => (
            <FeaturedPost key={post.title} post={post} />
          ))}
        </Grid>
        <Grid container spacing={5} sx={{ mt: 3 , overflowWrap : 'anywhere'}}>
          <About title="More info." posts={posts} />
        </Grid>
      </Box>
    </Container>
>>>>>>> Stashed changes
  );
}

export default Main;
