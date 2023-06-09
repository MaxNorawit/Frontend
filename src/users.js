import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Users() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ p : 2}}>
    <Box>  
        <Card sx={{ maxWidth: 345 }}>
        <CardMedia
            sx={{ height: 140 }}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="green iguana"
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
            </Typography>
        </CardContent>
        <CardActions>
            <Button variant="contained" size="small">สั่งซื้อ</Button>
        </CardActions>
        </Card>
    </Box>
      </Container>
    </React.Fragment>
  );
}