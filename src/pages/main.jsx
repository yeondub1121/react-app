import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MovieBox from '../components/MovieBox';
import { getMe } from '../apis/Join';

const API_KEY = '1d46d55539e318d9c7df6b911b8daaba';
const SEARCH_API_URL = 'https://api.themoviedb.org/3/search/movie';

const Container = styled.div`
  color: white;
  width: 100vw;
  margin-top: 65px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    margin-top: 50px;
    padding: 0 10px;
  }
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
  background-color: #1F2141;
  padding: 20px 0;

 
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 10px; 

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const FindBox = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  margin-top: 15px;


  @media (max-width: 768px) {
    gap: 10px;
    margin-top: 10px;
    width: 100%;
    justify-content: center;
  }
  
`;

const Input = styled.input`
  width: 300px;
  height: 35px;
  border: transparent;
  border-radius: 20px;
  padding: 0 15px;
  margin-left: 55px;

  @media (max-width: 768px) {
    width: 250px;
    height: 30px;
    padding: 0 10px;
  }
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

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
  }
`;

const ScrollableBox = styled.div`
  width: 1260px;
  max-width: 100%;
  max-height: 500px;
  overflow-y: auto;
  margin: 20px 0;

  @media (max-width: 768px) {
    max-height: 400px;
  }
`;

const ResultsBox = styled.div`
  width: 100%;
  gap: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

export default function MainPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = JSON.parse(window.localStorage.getItem('token'));
      if (token) {
        try {
          const userData = await getMe(token);
          setUserName(userData.name);
          setIsLoggedIn(true);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

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
        {loading ? '로딩 중…' : (isLoggedIn ? `${userName}님 환영합니다.` : '환영합니다.')}
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
        <ScrollableBox>
          <ResultsBox>
            {results.map((item) => (
              <Link to={`/main/movie/${item.id}`} key={item.id}>
                <MovieBox
                  movieImage={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  title={item.title}
                  star={item.vote_average}
                />
              </Link>
            ))}
          </ResultsBox>
        </ScrollableBox>
      )}
    </Container>
  );
}


