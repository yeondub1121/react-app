import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useQuery, useInfiniteQuery } from 'react-query';
import { getNowPlayingList } from '../components/Movie';
import MovieBox from '../components/MovieBox';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

const Container = styled.div`
  color: white;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 65px;
`;

const Box = styled.div`
  width: 1260px;
  gap: 20px;
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
`;

export default function NowPlayingPage() {
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);

  const fetchMovies = useCallback(async () => {
    const data = await getNowPlayingList(page);
    setMovieList((prev) => {
      const newMovies = data.results.filter(
        (newMovie) => !prev.some((movie) => movie.id === newMovie.id)
      );
      return [...prev, ...newMovies];
    });
  }, [page]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    setPage((prevPage) => prevPage + 1);
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

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
      <SpinnerContainer>
        <Loading />
      </SpinnerContainer>
    </Container>
  );
}
