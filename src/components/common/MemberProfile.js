import React from "react";
import Modal from "../task/common/Modal";
import { useEffect } from "react";
import { getApi } from "../../util/api";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { styled } from "styled-components";
import { setIsLoggedIn } from "../../redux/reducers/member/loginSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { removeUserCookie } from "../../util/cookies";

const MemberProfile = ({ onClose, memberInformation }) => {
  const [memberProfile, setMemberProfile] = useState({});
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchMemberProfile = async (memberInformation) => {
    console.log("memberInformation");
    console.log(memberInformation);
    if (!memberInformation.isOthers) {
      getApi("/members")
        .then((response) => {
          fetchMemberProfileSuccessHandler(response.data);
        })
        .catch((error) => {
          // 네트워크 에러 일 시 에러페이지로 이동

          // 404나 401 에러일 시 로그아웃으로 가게 해야함

          // 500 에러 시 에러페이지로 이동

          if (error === undefined) {
            console.error("An undefined error occured!");
            alert("알 수 없는 오류가 발생했습니다.");
            navigate("/error");
          } else if (error.code === "ERR_NETWORK") {
            console.error("네트워크 에러 발생:", error);
            alert(
              "서버에서 네트워크 지연 에러가 발생하였습니다. 잠시만 기다려주세요."
            );
            navigate("/error");
          } else if (
            error.response &&
            (error.response.status === 401 || error.response.status === 404)
          ) {
           
            console.log("멤버 프로필 로그인 실패");
            alert("로그인이 만료되었습니다.");
            navigate(
              `/auth?mode=login&returnUrl=${location.pathname}${location.search}`
            );
            removeUserCookie();
            onClose();
          } else if (error.response && error.response.status === 500) {
            alert("서버에 에러가 발생하였습니다. 잠시만 기다려주세요.");
            navigate("/error");
          }
        });
    } else {
      getApi(
        `/members/${memberInformation.memberId}/projects/${memberInformation.projectId}`
      )
        .then((response) => {
          fetchMemberProfileSuccessHandler(response.data);
        })
        .catch((error) => {
          // 네트워크 에러 일 시 에러페이지로 이동

          // 401 에러일 시 로그아웃으로 가게 해야함

          // 404 에러일 시 새로고침으로 데이터 갱신 시켜야함

          // 500 에러 시 에러페이지로 이동

          if (error === undefined) {
            console.error("An undefined error occured!");
            alert("알 수 없는 오류가 발생했습니다.");
            navigate("/error");
          } else if (error.code === "ERR_NETWORK") {
            console.error("네트워크 에러 발생:", error);
            alert(
              "서버에서 네트워크 지연 에러가 발생하였습니다. 잠시만 기다려주세요."
            );
            navigate("/error");
          } else if (error.response && error.response.status === 401) {
            alert("로그인이 만료되었습니다.");
            onClose();
            removeUserCookie();
            dispatch(setIsLoggedIn(false));
            navigate(
              `/auth?mode=login&returnUrl=${location.pathname}${location.search}`
            );
          } else if (error.response.status === 404) {
            alert("프로젝트에 탈퇴한 멤버입니다.");
            window.location.reload();
          } else if (error.response && error.response.status === 500) {
            alert("서버에 에러가 발생하였습니다. 잠시만 기다려주세요.");

            navigate("/error");
          }

        });
    }
  };

  const fetchMemberProfileSuccessHandler = (data) => {
    console.log("fetchMemberProfileSuccessHandler");
    console.log(data);
    const dateTimeString = data.createdAt;
    setMemberProfile({ ...data, createdAt: dateTimeString.split(" ")[0] });
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchMemberProfile(memberInformation);
  }, [memberInformation]);

  console.log(memberProfile);

  return (
    <Modal onClose={onClose}>
      {loading ? (
        <Loading>Loading...</Loading>
      ) : (
        <Profile>
          <div className="board" />
          <Information>
            <img src={memberProfile.profileImage} />
            <TextLine>
              <div className="nameEmail">
                <div>사용자 :</div>
                <div>{memberProfile.nameEmail}</div>
              </div>
              <div className="createdAt">
                <div>생성날짜 :</div>
                <div>{memberProfile.createdAt}</div>
              </div>
              {memberProfile.authority && (
                <div className="authority">
                  <div>프로젝트 권한: </div>
                  <div>{memberProfile.authority}</div>
                </div>
              )}
            </TextLine>
          </Information>
          <Introduction>
            <div>Intro</div>
            <div>{memberProfile.intro}</div>
          </Introduction>
        </Profile>
      )}
    </Modal>
  );
};

export default MemberProfile;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 47rem;
  width: 40rem;
  border-radius: 30px;
  background-color: #a2d2ff;

  & > .board {
    width: 100%;
    height: 10rem;
    background-color: rgb(89, 60, 236);
    border-radius: 30px;
    position: absolute;
  }
`;

const Information = styled.div`
  & > img {
    position: absolute;
    object-fit: fill;
    height: 15rem;
    width: 15rem;
    left: 31%;
    top: 7%;
    border: 7px solid white;
    border-radius: 50%;
  }
`;

const TextLine = styled.div`
  position: absolute;
  width: 80%;
  left: 19%;
  top: 43%;

  & * {
    font-size: 1.5rem;
    font-weight: 800;
  }

  & > .nameEmail {
    display: flex;

    & > div:nth-child(2) {
      font-size: 1.3rem;
      font-weight: 800;
      padding-top: 0.5%;
      margin-left: 3%;
    }
  }

  & > .createdAt {
    display: flex;

    & > div:nth-child(2) {
      font-size: 1.3rem;
      font-weight: 800;
      padding-top: 0.5%;
      margin-left: 3%;
    }
  }

  & > .authority {
    display: flex;

    & > div:nth-child(2) {
      font-size: 1.3rem;
      font-weight: 900;
      padding-top: 0.5%;
      margin-left: 3%;
      color: #f72585;
    }
  }
`;

const Introduction = styled.div`
  position: absolute;
  top: 60%;
  left: 5%;
  width: 90%;
  height: 17rem;

  & > div:nth-child(1) {
    text-align: center;
    font-size: 2rem;
    font-weight: 800;
    padding-bottom: 2%;
  }

  & > div:nth-child(2) {
    border: 5px solid black;
    height: 14rem;
    border-radius: 20px;
    padding: 2%;
    font-size: 1rem;
    font-weight: 700;
  }
`;

const Loading = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 47rem;
  width: 40rem;
  border-radius: 30px;
  background-color: #a2d2ff;
  padding-top: 45%;
  padding-left: 27%;
  font-size: 4rem;
  font-weight: 800;
`;
