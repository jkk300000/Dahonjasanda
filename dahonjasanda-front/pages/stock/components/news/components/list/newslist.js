import React from 'react';
import styled from 'styled-components';
import NewsItem from '../item';
import axios from 'axios';
import usePromise from '../../lib/usePromise';
import { Grid } from '@mui/material';

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NewsList = ({ category }) => {
  const [loading, response, error] = usePromise(() => {
    const query = category === 'all' ? '' : `&category=${category}`;
    return axios.get(
      `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=0a8c4202385d4ec1bb93b7e277b3c51f`,
    );
  }, [category]);

  // 대기중일 때
  if (loading) {
    return <NewsListBlock>대기중...</NewsListBlock>;
  }
  // 아직 response 값이 설정되지 않았을 때
  if (!response) {
    return null;
  }

  // 에러가 발생했을 때
  if (error) {
    return <NewsListBlock>에러 발생!</NewsListBlock>;
  }

  // response 값이 유효할 때
  const { articles } = response.data;

  const groupedArticles = [];
  for(let i = 0; i < 6; i += 2) {
    groupedArticles.push(articles.slice(i, i + 2));
  }

  return (
    <NewsListBlock>
      {groupedArticles.map((group, index) => (
        <Grid key={index} container spacing={2}>
          {group.map(article => (
            <Grid key={article.url} item xs={6}>
              <NewsItem article={article} />
            </Grid>
          ))}
        </Grid>
      ))}
    </NewsListBlock>
  );
};

export default NewsList;
