import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import FeaturedPost from 'components/FeaturedPost';

const featuredPosts = [
  {
    title: 'Posco International to invest 3.8 trillion won in energy business',
    date: 'Dec 6',
    description:
      'Posco International, which is set for a merger with Posco Energy, will invest 3.8 trillion won ($2.7 billion) over the next three years in its energy businesses, the trading company said Friday. Posco International’s merger with Posco Energy, a liquefied natural gas (LNG) plant operator, was approved at an extraordinary shareholders’ meeting held at the company’s headquarters in Songdo, Incheon, Friday.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text'
  },
  {
    title: 'POSCO International Aims to Become Global Energy Giant',
    date: 'Dec 5',
    description:
      'According to the Data Analysis, Retrieval and Transfer System (DART) of the Financial Supervisory Service on Oct. 30, POSCO International achieved solid results in the third quarter based on a diversified business portfolio amid a global economic downturn. Its sales came in at 9.41.2 trillion won in the third quarter, down 1.2 percent from the same period last year. Its operating profit swelled 32.7 percent to 197 billion won and its net profit 63.5 percent to 112.8 billion won.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text'
  }
];

function News (props) {
  return (
    <Box sx={props.sx}>
      <Typography variant='h3' mt={2} mb={4}>News</Typography>
      <Grid container spacing={4}>
        {featuredPosts.map((post) => (
          <FeaturedPost key={post.title} post={post} />
        ))}
      </Grid>
    </Box>
  );
}

export default News;
