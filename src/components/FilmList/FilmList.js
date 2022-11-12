import { Link, useLocation } from 'react-router-dom';
import { ListItem } from './FilmList.styled';
import PropTypes from 'prop-types';

export const FilmList = ({ films }) => {
  const location = useLocation();
  return (
    <ul>
      {films.map(({ title, id }) => (
        <ListItem key={id}>
          <Link to={`/movies/${id}`} state={{ from: location }}>
            {title}
          </Link>
        </ListItem>
      ))}
    </ul>
  );
};

FilmList.propTypes = {
  films: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
    }).isRequired
  ).isRequired,
};
