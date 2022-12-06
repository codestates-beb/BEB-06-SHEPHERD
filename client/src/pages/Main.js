import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainFeaturedPost from 'components/MainFeaturedPost';
import FeaturedPost from 'components/FeaturedPost';
import About from 'components/About';
import post1 from 'components/shepherd.md'
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';

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
    title: 'Posco International to invest 3.8 trillion won in energy business',
    date: 'Dec 6',
    description:
      'Posco International, which is set for a merger with Posco Energy, will invest 3.8 trillion won ($2.7 billion) over the next three years in its energy businesses, the trading company said Friday. Posco International’s merger with Posco Energy, a liquefied natural gas (LNG) plant operator, was approved at an extraordinary shareholders’ meeting held at the company’s headquarters in Songdo, Incheon, Friday.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
  {
    title: 'POSCO International Aims to Become Global Energy Giant',
    date: 'Dec 5',
    description:
      'According to the Data Analysis, Retrieval and Transfer System (DART) of the Financial Supervisory Service on Oct. 30, POSCO International achieved solid results in the third quarter based on a diversified business portfolio amid a global economic downturn. Its sales came in at 9.41.2 trillion won in the third quarter, down 1.2 percent from the same period last year. Its operating profit swelled 32.7 percent to 197 billion won and its net profit 63.5 percent to 112.8 billion won.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
];

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
  );
}

export default Main;
