import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getUpComingList } from '../components/Movie';
import MovieBox from '../components/MovieBox';
import { Link } from 'react-router-dom';

const Container = styled.div`
  color: white;
  width: 100vw;
  display: flex;
  justify-content: center;
  margin-top: 65px;
`;

const Box = styled.div`
  width: 1260px;
  gap: 20px;
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;
`;

export default function UpComingPage() {
  const [movieList, setMovieList] = useState([]);
  const upComingMovieList = useQuery('upComingMovie', () => getUpComingList(), {
    onSuccess: data => {
      console.log(data.results);
      setMovieList(data.results);
    },
    onError: error => {
      console.log(error);
    },
  });

  return (
    <Container>
      <Box>
        {movieList.map((item, idx) => {
          return (
            <div key={idx}>
              <Link to={`/movie/${item.title}`}>
                <MovieBox
                  movieImage={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  title={item.title}
                  star={item.vote_average}
                />
              </Link>
            </div>
          );
        })}
      </Box>
    </Container>
  );
}