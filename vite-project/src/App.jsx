import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes/index';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <MainLayout>
      <RouterProvider router={router} />
    </MainLayout>
  );
}

export default App;