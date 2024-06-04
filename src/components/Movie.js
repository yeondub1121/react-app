import axios from 'axios';

// API 키 및 기본 URL 설정
export const API_KEY = '1d46d55539e318d9c7df6b911b8daaba';
export const API_URL = 'https://api.themoviedb.org/3/movie/';

// 현재 상영 중인 영화 목록 API 요청 함수
export const getNowPlayingList = async (page = 1) => {
  try {
    const response = await axios.get(`${API_URL}/now_playing`, {
      params: {
        api_key: API_KEY,
        language: 'ko-KR',
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching now playing movies:', error);
    throw error;
  }
};

// 인기 영화 목록 API 요청 함수
export const getPopularList = async (page = 1, country = 'US') => {
  try {
    const response = await axios.get(`${API_URL}/popular?api_key=${API_KEY}&language=${country}&page=${page}`);
    console.log(response.data); // API 응답 데이터 확인
    return response.data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};
// 평점 높은 영화 목록 API 요청 함수
export const getTopRatedList = async () => {
  const response = await axios.get(`${API_URL}/top_rated?api_key=${API_KEY}&language=ko-KR&page=1`);
  return response.data;
};

// 개봉 예정 영화 목록 API 요청 함수
export const getUpComingList = async () => {
  const response = await axios.get(`${API_URL}/upcoming?api_key=${API_KEY}&language=ko-KR&page=1`);
  return response.data;
};


