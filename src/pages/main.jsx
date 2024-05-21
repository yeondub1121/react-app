import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MovieBox from '../components/MovieBox';

const API_KEY = '1d46d55539e318d9c7df6b911b8daaba';
const SEARCH_API_URL = 'https://api.themoviedb.org/3/search/movie';

const Container = styled.div`
  color: white;
  width: 100vw;
  margin-top: 65px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Banner = styled.div`
width: 100%;
height: 300px;
display: flex;
align-items: center;
justify-content: center;
background-color: rgba(0, 0, 0, 0.4);
font-size: 23px;
font-weight: 600;
`;

const SearchSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1F2141;;
  padding: 20px 0;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 10px; /* 검색바보다 조금 위로 이동시키기 위한 간격 */
`;

const FindBox = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  margin-top: 15px;
`;

const Input = styled.input`
  width: 300px;
  height: 35px;
  border: transparent;
  border-radius: 20px;
  padding: 0 15px;
`;

const FindBtn = styled.button`
  width: 35px;
  height: 35px;
  border: transparent;
  border-radius: 100%;
  background-color: ${props => (props.disabled ? '#ccc' : '#FFC61F')};
  text-align: center;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ResultsBox = styled.div`
  width: 1260px;
  max-width: 100%;
  gap: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px 0;
`;

export default function MainPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) {
      setResults([]); // 검색어가 없을 때 결과 초기화
    }
  }, [query]);

  const handleSearch = async () => {
    if (!query) return;

    try {
      const response = await axios.get(`${SEARCH_API_URL}?api_key=${API_KEY}&language=en-US&query=${query}`);
      setResults(response.data.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <Container>
      <Banner>
        <div>환영합니다</div>
      </Banner>
      <SearchSection>
        <Title>🎥 Find your movies!</Title>
        <FindBox>
          <Input
            className="input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <FindBtn onClick={handleSearch} disabled={!query}>
            🔍
          </FindBtn>
        </FindBox>
      </SearchSection>
      {results.length > 0 && (
        <ResultsBox>
          {results.map((item) => (
            <Link to={`/movie/${item.id}`} key={item.id}>
              <MovieBox
                movieImage={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                title={item.title}
                star={item.vote_average}
              />
            </Link>
          ))}
        </ResultsBox>
      )}
    </Container>
  );
}