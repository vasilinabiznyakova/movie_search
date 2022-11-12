import { useParams, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { getFilmById } from '../../services/API';
import { ErrorView } from '../ErrorView/ErrorView';
import { ListItem, Genres, Poster } from './MovieDetails.styled';
import { Suspense } from 'react';

const MovieDetails = () => {
  const [selectedFilm, setSelectedFilm] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  useEffect(() => {
    getFilmById(movieId)
      .then(({ data }) => {
        setSelectedFilm(data);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [movieId]);

  const {
    poster_path,
    original_title,
    overview,
    genres,
    vote_average,
    release_date,
  } = selectedFilm;

  return (
    <div>
      {status === 'rejected' && <ErrorView message={error.message} />}
      {status === 'resolved' && (
        <div>
          <Link to={backLinkHref}>Go back</Link>
          <Poster
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            width="189"
            height="255"
            alt={original_title}
          ></Poster>
          <h2>{`${original_title} (${release_date.slice(0, 4)})`}</h2>
          <p>{`User Score: ${Math.round(vote_average * 10)}%`}</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h4>Genres</h4>
          <p>
            {genres.map((genre, index) => (
              <Genres key={index}>{genre.name}/ </Genres>
            ))}
          </p>
          <ul>
            <ListItem>
              <Link to="cast">Cast</Link>
            </ListItem>
            <ListItem>
              <Link to="reviews">Reviews</Link>
            </ListItem>
          </ul>
        </div>
      )}
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetails;
