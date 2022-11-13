import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getFilmByQuery } from '../services/API';
import { ErrorView } from '../components/ErrorView/ErrorView';
import { FilmList } from 'components/FilmList/FilmList';
import { SearchBox, SearchButton } from './Movies.styled';

const Movies = () => {
  // const [searchQuery, setSearchQuery] = useState(null);
  const [searchedFilm, setSearchedFilm] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');

  useEffect(() => {
    if (query === null) return;
    console.log(query);
    setStatus('pending');
    getFilmByQuery(query)
      .then(data => {
        setSearchedFilm(data.data.results);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    setSearchParams({ query: form.elements.query.value });
    // form.reset();
  };

  console.log(searchedFilm);
  return (
    <main>
      <form onSubmit={handleSubmit}>
        <SearchBox type="text" name="query" />
        <SearchButton type="submit">Search</SearchButton>
      </form>
      {status === 'rejected' && <ErrorView message={error.message} />}
      {status === 'pending' && <p>Loading</p>}
      {searchedFilm.length > 0 && (
        <div>
          <FilmList films={searchedFilm} />
        </div>
      )}
      {query !== null && searchedFilm.length === 0 && (
        <p>
          Sorry, no films found per your query, please try another key-words
        </p>
      )}
    </main>
  );
};

export default Movies;
