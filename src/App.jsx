import { useMemo, useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Home, { homeLoader } from './scenes/home/home';
import SearchResult from './scenes/searchResult/searchResult';
import RootLayout from './layouts/rootLayout/rootLayout';
import Detail from './scenes/detail/detail';
import Login from './scenes/login/login';
import Register from './scenes/register/register';
import UserScreen from './scenes/user/user';
import PageNotFound from './scenes/pageNotFound/pageNotFound';
import ErrorPage from './scenes/error/error';

function App() {
  const isAuth = Boolean(useSelector((state) => state.user.token));

  const router = useMemo(() => {
    return createBrowserRouter(
      createRoutesFromElements(
        <Route path='/' element={<RootLayout />} errorElement={<ErrorPage />} >
          <Route index element={<Home />} loader={homeLoader}/>
          <Route path='search' element={<SearchResult />} />
          <Route path='detail/:imdbID' element={<Detail />} errorElement={<ErrorPage />} />
          <Route path='login' element={!isAuth ? <Login /> : <UserScreen />} />
          <Route path='register' element={!isAuth ? <Register /> : <UserScreen />} />
          <Route path='user' element={isAuth ? <UserScreen /> : <Login />} />
          <Route path='error' element={<ErrorPage />} />
          <Route path='*' element={<PageNotFound />} />
        </Route>
      )
    )
  }, [isAuth]);
  return (
    <RouterProvider router={router} />
  )
}

export default App
