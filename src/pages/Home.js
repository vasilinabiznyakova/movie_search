import { getTrendingFilms } from '../services/API';
import { useState, useEffect } from 'react';
import { ErrorView } from '../components/ErrorView/ErrorView';
import { FilmList } from '../components/FilmList/FilmList';

const Home = () => {
  const [popularFilms, setPopularFilms] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    setStatus('pending');
    getTrendingFilms()
      .then(results => {
        const popularFilms = results.data.results;
        setPopularFilms(popularFilms);

        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, []);

  return (
    <div>
      <h2>Trending today</h2>
      {status === 'rejected' && <ErrorView message={error.message} />}
      {status === 'pending' && <p>Loading</p>}
      {status === 'resolved' && <FilmList films={popularFilms} />}
    </div>
  );
};

export default Home;
