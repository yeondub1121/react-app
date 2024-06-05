import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useQuery, useInfiniteQuery, queryCache } from 'react-query'; // useInfiniteQuery 및 queryCache 추가
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
  // useInfiniteQuery를 사용하여 데이터를 무한으로 가져오도록 설정
  const { data, error, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    'nowPlayingMovies',
    ({ pageParam = 1 }) => getNowPlayingList(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        // 다음 페이지가 있는 경우 현재 페이지에 1을 더하여 반환
        return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
      },
    }
  );

  const movieList = data ? data.pages.flatMap(page => page.results) : []; // 모든 페이지의 영화 데이터를 병합하여 배열로 반환

  // 스크롤 이벤트 핸들러
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    fetchNextPage(); // 다음 페이지 데이터 가져오기
  }, [fetchNextPage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (error) return <div>Error: {error.message}</div>;

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
      {isFetching && <SpinnerContainer><Loading /></SpinnerContainer>} {/* 로딩 중 상태 표시 */}
    </Container>
  );
}
