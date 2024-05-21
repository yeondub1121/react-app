import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
  width: 300px;
  height: 550px;
  border: transparent;
  border-radius: 5px;
  background-color: rgb(48, 63, 123);
  cursor: pointer;
  color: white;
  &:hover{
    background-color: rgba(0, 0, 0, 0.1);
    position: relative; 
    transition: opacity 0.2s linear;}

`;

const MovieImg = styled.img`
  width: 100%;
  border: transparent;
  border-radius: 5px 5px 0px 0px;
  &:hover{
    background-color: rgba(0, 0, 0, 0.1);
    position: relative; 
    transition: opacity 0.2s linear;}
`;

const MovieText = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 8px;
  font-size: 15px;
  gap: 10px;
  text-decoration: none;
  border-bottom: none;
`;

const Title = styled.div`
  width: 200px;
`;

const Star = styled.div`
  width: 60px;
  display: flex;
  justify-content: flex-end;
`;



export default function MovieBox({ movieImage, title, star }) {
  return (
    <Container>
      <MovieImg src={movieImage} alt={title} className="movie_image" />
      <MovieText>
        <Title>{title}</Title>
        <Star>⭐{star}</Star>
      </MovieText>
    </Container>
  );
}
