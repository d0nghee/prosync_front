import { styled } from "styled-components";

export default function ProfileCard({ name, image }) {
  return (
    <ProfileContainer>
      {image && <ProfileImage src={image} alt={image} />}
      {name && <div>{name}</div>}
    </ProfileContainer>
  );
}

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
