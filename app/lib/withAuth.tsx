'use client';
import { Alert, Center, Loader } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const WithAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    let parsedToken;
    const store = useSelector(state => state.store)

    useEffect(() => {
      const accessToken = localStorage.getItem('accessToken');
      parsedToken = accessToken ? JSON.parse(accessToken) : null;

      if (parsedToken) {
        setIsAuthenticated(true);
      } else {
        router.push('/'); // Redirect to login page if not authenticated
      }
    }, [router]);

    if (parsedToken && !isAuthenticated) {
      return <Alert> User not Authenticated </Alert>;
    }

    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    }

    return (
      <Center>
        <Loader size="lg" type='dots' />
      </Center>
    );
  };
};

export default WithAuth;
