import { styled } from "styled-components";
import { AiFillCaretDown } from "react-icons/ai";


export default function ProfileCard({ name, image }) {
  return (
    <ProfileContainer>
      {image && <ProfileImage src={image} alt={image} />}
      {name && <div>{name}</div>}
      <AiFillCaretDown size="20px" color="#6c757d" />
    </ProfileContainer>
  );
}

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  disply: inline-block;
`;
