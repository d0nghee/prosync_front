import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
  useSubmit,
} from 'react-router-dom';
import MainNavigation from '../components/common/MainNavigation';
import Footer from '../components/common/Footer';
import { getCookie } from '../util/cookies';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setIsLoggedIn } from '../redux/reducers/loginSlice';
import { clearError } from '../redux/reducers/error-slice';
import { handleErrorCode } from '../util/errorHandler';

export default function RootLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hasError = useSelector((state) => state.error.hasError);
  const errorData = useSelector((state) => state.error.errorData);
  const location = useLocation();

  const accessToken = getCookie('accessToken');
  const submit = useSubmit();

  const [errorTimeout, setErrorTimeout] = useState(null);

  useEffect(() => {
    console.log('RootLayout useEffect 실행');
    if (!accessToken) {
      const refreshToken = getCookie('refreshToken');

      if (!refreshToken) {
        console.log('refresh Token 존재하지 않음');
        dispatch(setIsLoggedIn(false));
        return;
      }
    }

    if (accessToken === 'EXPIRED') {
      alert('로그인이 만료되었습니다.');
      navigate('/logout');
    }
  }, [accessToken, submit]);

  useEffect(() => {
    if (hasError) {
      if (errorTimeout) clearTimeout(errorTimeout);

      const timeoutId = setTimeout(() => {
        handleErrorCode(
          errorData.status,
          errorData.resultCode,
          navigate,
          location,
          dispatch
        );
        dispatch(clearError());
      }, 500);

      setErrorTimeout(timeoutId);
    }
  }, [hasError, errorData, dispatch]);

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
