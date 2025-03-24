import { Alert } from '@mui/material';
import React, { useEffect } from 'react';

export const AlertBox = (props) => {
    const { setIsAlert } = props;

    useEffect(() => {
        const timer = setTimeout(() => {
          setIsAlert(false); // Set `setIsAlert` to false after 5 seconds
        }, 5000);
    
        // Cleanup timer if the component unmounts
        return () => clearTimeout(timer);
      }, [setIsAlert]);

  return (
    <>
      <Alert variant="filled" severity="success">
        This is a filled success Alert.
      </Alert>
    </>
  );
};
