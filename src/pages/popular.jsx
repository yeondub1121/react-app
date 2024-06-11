import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getPopularList } from '../components/Movie';
import MovieBox from '../components/MovieBox';
import Pagination from '../components/Pagination';
import { Link } from 'react-router-dom';

const Container = styled.div`
  color: white;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 65px;
  padding: 0 20px;

  @media (max-width: 768px) {
    margin-top: 55px;
  }
`;

const Box = styled.div`
  width: 1260px;
  gap: 20px;
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;

  @media (max-width: 1260px) {
    width: 100%;
    justify-content: center;
  }

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const Loading = styled.div`
  color: white;
  margin-top: 20px;
`;

export default function PopularPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [movieList, setMovieList] = useState([]);

  const { isLoading, isError, data, isFetching } = useQuery(
    ['popularMovie', currentPage],
    () => getPopularList(currentPage),
    {
      onSuccess: data => {
        console.log('Fetched data:', data); // 받아온 데이터 확인
        setMovieList(data.results);
      },
      onError: error => {
        console.error('Error fetching popular movies:', error);
      },
      keepPreviousData: true, // 유지 이전 데이터가 있을 경우 로딩 중에도 사용 가능
    }
  );

  const onPageChange = page => {
    setCurrentPage(page);
  };

  if (isLoading) return <Loading>Loading...</Loading>;
  if (isError) return <Loading>Error loading movies</Loading>;

  return (
    <Container>
      <Box>
        {movieList.map((item, idx) => (
          <div key={idx}>
            <Link to={`/movie/${item.id}`}>
              <MovieBox
                movieImage={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                title={item.title}
                star={item.vote_average}
              />
            </Link>
          </div>
        ))}
      </Box>
      {data && (
        <Pagination
          currentPage={currentPage}
          totalPages={data.total_pages}
          onPageChange={onPageChange}
        />
      )}
      {isFetching && <Loading>Loading...</Loading>} {/* 로딩 중 상태 표시 */}
    </Container>
  );
}

