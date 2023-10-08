import { styled } from "styled-components";
import { AiFillCaretDown } from "react-icons/ai";

export default function ProfileCard({ name, image, setMemberProfile }) {
  return (
    <ProfileContainer onClick={() => setMemberProfile({show:true})}>
      {image && <ProfileImage src={image} alt={image} />}
      {name && <div>{name} 님 반갑습니다</div>}
      <div className="profile-notification">프로필</div>
    </ProfileContainer>
  );
}

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  color: black;
  transition: background-color 0.3s ease;
  cursor: pointer;
  border-radius: 50%;
  position: relative;

  & > img:hover {
    background-color: rgb(192, 158, 216);
  }

  & > div:nth-child(2):hover {
    text-decoration: underline;
  }

  & > .profile-notification {
    display: none;
    position: absolute;
    top: 110%;
    left: 5%;
    width: 3.4rem;
    height: 3.4rem;
    padding-top: 1rem;
    border-radius: 50%;
    border: 0.5px solid green;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
    font-size: small;
    background-color: white;
  }

  & > img:hover ~ .profile-notification {
    display: block;
  }
`;

const ProfileImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: inline-block;
  padding: 3%;
`;
