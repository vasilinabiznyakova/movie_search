import styled from 'styled-components';

export const ListItem = styled.li`
  &&: not(: last-child) {
    margin-bottom: 8px;
  }
`;

export const Genres = styled.span`
  &&: not(: last-child) {
    margin-right: 8px;
  }
`;

export const Poster = styled.img`
  margin-top: 16px;
`;
