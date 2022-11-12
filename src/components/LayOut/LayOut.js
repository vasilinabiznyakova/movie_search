import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Link, Container } from './LayOut.styled';

export const LayOut = () => {
  return (
    <Container>
      <Header>
        <nav>
          <Link to="/" end>
            Home
          </Link>
          <Link to="/movies">Movies</Link>
        </nav>
      </Header>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </Container>
  );
};
