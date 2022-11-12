import styled from 'styled-components';

export const SearchBox = styled.input`
  padding: 4px 4px;
  margin-right: 16px;
`;

export const SearchButton = styled.button`
  display: inline-block;
  width: 100px;
  padding: 4px 4px;
  cursor: pointer;
  &&: hover {
    color: white;
    background-color: OrangeRed;
  }
`;
