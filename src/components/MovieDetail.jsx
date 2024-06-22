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
  flex-direction: column;
  align-items: center;
  margin-top: 65px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 30px;
    height: auto;
    padding: 20px;
    margin-top: 55px;
  }
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

   @media (max-width: 768px) {
    width: 200px;
  }
`;

const ExplainBox = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1;

   @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Box = styled.div`
  display: flex;
  margin-top: 18px;
  gap: 3px;

  @media (max-width: 768px) {
    margin-top: 10px;
    gap: 2px;
  }
`;

const MainText = styled.div`
  font-size: 16px;

   @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const OverviewBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 18px;

   @media (max-width: 768px) {
    gap: 15px;
    margin-top: 10px;
  }
`;

const Overview = styled.div`
  font-size: 13px;
  width: 600px;

  @media (max-width: 768px) {
    width: 100%;
    font-size: 12px;
  }
`;

const CastBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin-top: 20px;
  z-index: 1;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

const CastMember = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

const CastImg = styled.img`
  width: 100px;
  height: 150px;
  border-radius: 10px;
  object-fit: cover;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

const CastName = styled.div`
  margin-top: 8px;
  font-size: 14px;
  text-align: center;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState(null);
  const star = [];
  const defaultImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ztleRwzXhFdiwBYqZ8cib9RvEsukVVUS3niN1YQ&s";

  const getMovieDetails = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ko-KR`,
    );
    return response.data;
  };

  const getMovieCredits = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=ko-KR`,
    );
    return response.data;
  };

  const movieDetailQuery = useQuery(['movieDetail', id], () => getMovieDetails(), {
    onSuccess: data => {
      setMovie(data);
    },
    onError: error => {
      console.log(error);
    },
  });

  const movieCreditsQuery = useQuery(['movieCredits', id], () => getMovieCredits(), {
    onSuccess: data => {
      setCast(data.cast);
      const directorData = data.crew.find(member => member.job === 'Director');
      setDirector(directorData);
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
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
        backgroundSize: 'cover',
      }}
    >
      <OpacityBox />
      <MovieImg src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <ExplainBox>
        <Title>{movie.title}</Title>
        <Box>
          <MainText>평점</MainText>
          {getStar(movie.vote_average)}
        </Box>
        <Box>
          <MainText>개봉일</MainText>
          <MainText>{movie.release_date}</MainText>
        </Box>
        <OverviewBox>
          <MainText>줄거리</MainText>
          <Overview>
            {movie.overview === '' ? 'TMDB에서 제공하는 API에 상세 줄거리 정보가 없습니다.' : movie.overview}
          </Overview>
        </OverviewBox>
        {director && (
          <>
            <MainText>감독</MainText>
            <CastBox>
              <CastMember>
                <CastImg src={director.profile_path ? `https://image.tmdb.org/t/p/w500${director.profile_path}` : defaultImg} alt={director.name} />
                <CastName>{director.name}</CastName>
              </CastMember>
            </CastBox>
          </>
        )}
        <MainText>출연진</MainText>
        <CastBox>
          {cast.slice(0, 10).map(member => (
            <CastMember key={member.cast_id}>
              <CastImg src={member.profile_path ? `https://image.tmdb.org/t/p/w500${member.profile_path}` : defaultImg} alt={member.name} />
              <CastName>{member.name}</CastName>
            </CastMember>
          ))}
        </CastBox>
      </ExplainBox>
    </Container>
  );
}


