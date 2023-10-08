import React from "react";
import Modal from "../task/common/Modal";
import { useEffect } from "react";
import { tryFunc } from "../../util/tryFunc";
import { getApi } from "../../util/api";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { styled } from "styled-components";
import { style } from "@mui/system";

const MemberProfile = ({ onClose, memberInformation }) => {
  const [memberProfile, setMemberProfile] = useState({});
  const dispatch = useDispatch();

  const fetchMemberProfile = async (memberInformation) => {
    console.log("memberInformation");
    console.log(memberInformation);
    if (!memberInformation.isOthers) {
      const response = await getApi("/members");
      return response.data;
    } else {
      const response = await getApi(
        `/members/${memberInformation.memberId}/projects/${memberInformation.projectId}`
      );
      return response.data;
    }
  };

  const fetchMemberProfileSuccessHandler = (data) => {
    console.log("fetchMemberProfileSuccessHandler");
    console.log(data);
    setMemberProfile(data);
  };

  useEffect(() => {
    tryFunc(
      fetchMemberProfile,
      fetchMemberProfileSuccessHandler,
      dispatch
    )(memberInformation);
  }, [memberInformation]);

  console.log(memberProfile);

  return (
    <Modal onClose={onClose}>
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
                <div>Authority: </div>
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
