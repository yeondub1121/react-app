import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_KEY } from '../components/Movie';
import { useQuery } from 'react-query';

const Container = styled.div`
  position: relative;
  color: white;
  width: 100vw;
  height: 100vh;
  display: flex;
  gap: 60px;
  justify-content: center;
  align-items: center;
  margin-top: 65px;
`;

const OpacityBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(37, 50, 100, 0.6);
`;

const MovieImg = styled.img`
  width: 300px;
  z-index: 1;
`;

const ExplainBox = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const Box = styled.div`
  display: flex;
  margin-top: 18px;
  gap: 3px;
`;

const MainText = styled.div`
  font-size: 16px;
`;

const OverviewBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 18px;
`;

const Overview = styled.div`
  font-size: 13px;
  width: 600px;
`;

export default function DetailPage() {
  const params = useParams();
  const [movie, setMovie] = useState({});
  const star = [];


  const getMovieList = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${params.title}&api_key=${API_KEY}&language=ko-KR&page=1`,
    );
    return response.data;
  };

  const movieDetailList = useQuery(['movieDetail', params.title], () => getMovieList(), {
    onSuccess: data => {
      console.log(data.results);
      setMovie(data.results);
    },
    onError: error => {
      console.log(error);
    },
  });

  const getStar = num => {
    for (let i = 0; i < Math.floor(num); i++) {
      star.push('⭐');
    }
    return [...star];
  };


  return (
    <Container
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie[0]?.backdrop_path})`,
        backgroundSize: 'cover',
      }}
    >
      <OpacityBox />
      <MovieImg src={`https://image.tmdb.org/t/p/w500${movie[0]?.poster_path}`} alt={movie[0]?.title} />
      <ExplainBox>
        <Title>{movie[0]?.title}</Title>
        <Box>
          <MainText>평점</MainText>
          {getStar(movie[0]?.vote_average)}
        </Box>
        <Box>
          <MainText>개봉일</MainText>
          <MainText>{movie[0]?.release_date}</MainText>
        </Box>
        <OverviewBox>
          <MainText>줄거리</MainText>
          <Overview>
            {movie[0]?.overview == '' ? 'TMDB에서 제공하는 API에 상세 줄거리 정보가 없습니다.' : movie[0]?.overview}
          </Overview>
        </OverviewBox>
      </ExplainBox>
    </Container>
  );
}