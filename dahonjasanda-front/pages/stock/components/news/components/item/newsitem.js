import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

const NewsItem = ({ article }) => {

    const { title, description, url, urlToImage } = article;
    const handleClick = (url) => {
        window.location.href = url;
    };

    return (

        <Card sx={{ flex: 1, maxWidth: 500, marginBottom: 3}} >
            <CardActionArea onClick={() => handleClick(url)}>
                <CardMedia
                    sx={{ height: 350 }}
                    image={urlToImage}
                    alt="thumbnail"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default NewsItem;
