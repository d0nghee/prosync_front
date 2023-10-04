import { styled } from "styled-components";
import { MdOutlinePersonOff } from "react-icons/md";

export default function ProfileCard({ name, image }) {
  return (
    <ProfileContainer>
      {image ? (
        <ProfileImage src={image} alt={image} />
      ) : (
        <MdOutlinePersonOff size="50px" />
      )}
      {name && <div>{name}</div>}
    </ProfileContainer>
  );
}

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  padding-left: 1rem;
  padding-right: 1.5rem;

  & > div {
    overflow: hidden;
  }
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
