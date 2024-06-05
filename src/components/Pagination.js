import React from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const PageButton = styled.button`
background-color: ${props => (props.disabled ? '#555' : '#171A32')};
  color: white;
  border: none;
  padding: 10px;
  margin: 0 60px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
`;

const PageNumber = styled.span`
  margin: 0 10px;
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <PaginationContainer>
      <PageButton disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        &lt;
      </PageButton>
      <PageNumber>{currentPage}</PageNumber>
      <PageButton disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        &gt;
      </PageButton>
    </PaginationContainer>
  );
};

export default Pagination;

