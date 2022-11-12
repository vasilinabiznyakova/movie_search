import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getReviewsById } from '../../services/API';
import { ErrorView } from '../ErrorView/ErrorView';
import { AuthorName, List, ListItem } from './Reviews.styled';

const Reviews = () => {
  const [selectedReview, setSelectedReview] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    getReviewsById(movieId)
      .then(({ data }) => {
        setSelectedReview(data.results);
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
      {status === 'resolved' && selectedReview.length > 0 ? (
        <List>
          {selectedReview.map((rev, index) => (
            <ListItem key={index}>
              <AuthorName>Author: {rev.author}</AuthorName>
              <p>{rev.content}</p>
            </ListItem>
          ))}
        </List>
      ) : (
        <p>We do not have any reviews for this film</p>
      )}
    </div>
  );
};

export default Reviews;
