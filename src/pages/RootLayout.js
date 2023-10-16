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
import { setIsLoggedIn } from '../redux/reducers/member/loginSlice';
import { clearError } from '../redux/reducers/error/error-slice';
import { handleErrorCode } from '../util/errorHandler';
import { styled } from 'styled-components';

const StyledOutletContainer = styled.div`
  transform: ${(props) =>
    props.menuOpen ? 'translateX(7vw)' : 'translateX(0%)'};
  transition: transform 0.7s ease-in-out, width 0.7s ease-in-out;
  width: ${(props) => (props.menuOpen ? 'calc(100% - 7vw)' : '100%')};
`;

export default function RootLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hasError = useSelector((state) => state.error.hasError);
  const errorData = useSelector((state) => state.error.errorData);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

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
        console.log('로그인 상태 아님 처리');
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
    <Container>
      <MainNavigation setMenuOpen={setMenuOpen} />
      <StyledOutletContainer menuOpen={menuOpen}>
        <Outlet />
      </StyledOutletContainer>
      <Footer />
    </Container>
  );
}


const Container = styled.div`
  position: relative;
`
