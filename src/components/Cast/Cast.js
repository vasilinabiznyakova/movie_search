import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCastById } from '../../services/API';
import { ErrorView } from '../ErrorView/ErrorView';
import { Name, List, ListItem } from './Cast.styled';
const Cast = () => {
  const [selectedCast, setSelectedCast] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    getCastById(movieId)
      .then(({ data }) => {
        setSelectedCast(data.cast);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [movieId]);
  return (
    <div>
      {status === 'rejected' && <ErrorView message={error.message} />}
      {status === 'resolved' && (
        <List>
          {selectedCast.map(({ id, name, character, profile_path }) => (
            <ListItem key={id}>
              <Name>{name}</Name>

              <p>Character: {character}</p>
              {profile_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
                  alt={name}
                  width="100"
                  height="150"
                ></img>
              )}
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default Cast;
