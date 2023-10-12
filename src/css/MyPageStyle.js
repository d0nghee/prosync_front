import styled from 'styled-components'

export const MypageContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
`

export const Header = styled.div`
    background-color: gray;
    color: white;
    padding : 10px;
    grid-column: span 2;
`

export const SideBar = styled.div`
    margin-top: 20px;
    color: white;
    display: flex;
    flex-direction: column;
    text-align: center;
`

export const Content = styled.div`
  width: 60%;
  margin-left: 10px;
  display: grid;
  grid-template-columns: 200px 200px 200px 200px;
  grid-template-rows: 50px 200px 200px 200px 200px;
  gap: 15px;
  text-align: center;
`

export const ProjectSearchBarContainer = styled.div`
  margin-top: 15px;
  grid-column: 2/5;
  display: flex;
  flex-direction: row;
`

export const PaginationGridContainer = styled.div`
  margin-top: 60px;
  margin-left : 40px;
  grid-row: 6/6;
  grid-column: 2/5;

`

export const FilterContainer = styled.div`
  margin-top: 15px;
  grid-column: 5/5;
  display: flex;
  flex-direction: row;
`

export const ProjectContent = styled.div`
  margin-left: 50px;
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  gap: 20px;
`

export const PostItem = styled.div`
  width: 270px;
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  transition: all 0.3s ease;
  height: 350px;
  margin-right: 20px;

  &:hover {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
  }

  /* @media (max-width: 1200px) {
    width: calc(45% - 20px);
  }

  @media (max-width: 768px) {
    width: calc(100% - 20px);
  } */
`;

export const Footer = styled.div`
    background-color: bisque;
    color: white;
    padding : 5px;
    grid-column: span 2;
`

export const SideMenuDetail = styled.button`
    background-color: white;
    color: black;
    padding : 15px;
    margin-left : 5px;
    margin-top: 5px;
    border: none;
    cursor: pointer;
    text-align: left;
    font-size: larger;
    box-shadow: 0px 4px 6px rgba(0,0,0,0.3);
`

export const List = styled.ul`
    list-style: none;
    padding : 0;
`

export const ListItem = styled.li`
    font-size: 14px;
    margin-left: 5px;
    margin-top: 5px;
    padding: 8px;
    border-left : 3px solid black;

    &:hover {
        background-color: #FFDAB9;
    }

`
export const ListItemButton = styled.button`
    width: 100%;
    height: 30px;
    border: 0;
    text-align: left;
    background-color: white;
    cursor: pointer;
`

export const InputText = styled.input`
    width: 400px;
    border: 2px #7B69B7 solid;
    border-radius: 5px;
    padding: 10px;
    font-size: 16px;
    margin-bottom: 10px;
`
export const InputTextArea = styled.textarea`
    width: 70%;
    height: 15vh;
    border: 2px solid #7B69B7;
    border-radius: 5px;
    padding: 10px;
    font-size: 16px;
    resize: none;
    margin-bottom: 10px;
`

export const CustomDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;
`

export const Label = styled.label`
    font-size: 18px;
    font-weight: 500;
    margin-right: 10px;
`

// 북마크 리스트

export const Container = styled.div`
  /* 전체 컨테이너 스타일 */
  
`;

export const BookmarkListItem = styled.div`
  /* 각 아이템 스타일 */
  
  width: 40%;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f0f0f0;
`;

export const PaginationContainer = styled.div`
  /* 페이지 버튼 컨테이너 스타일 */
    grid-column: 3/6;
    grid-row: 5/5;
`;

export const PageButton = styled.button`
  /* 페이지 버튼 스타일 */
  width: 40px;
  height: 40px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  margin: 5px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
  }
`;

export const PostTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  cursor: pointer;
  text-decoration: none;

`;

export const PostDate = styled.div`
  color: #888;
  font-size: 14px;
`;

export const ListItemContainer = styled.div`
    display: flex;
    flex-direction: row;
`

// 프로젝트 리스트
export const PostListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap : 20px;
`;

export const ProjectImage = styled.img`
    margin-top: 1px;
    margin-bottom: 5px;
    margin-right: 50px;
    width : 200px;
    object-fit: cover;
    max-height: 150px;
    overflow-y: auto;
    cursor: pointer;
    
`



export const ProjectTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  align-items: center;
  cursor: pointer;
  margin-bottom: 5px;
  margin-right: 80px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PostDescription = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: #555;
  text-align: left;
`;
export const PostName = styled.span`
  font-size: 18px;
  font-weight: bold;
  text-align: left;

`;

export const PostsDate = styled.span`
  color: #888;
  margin-left: 5px;
`;

export const NullPost = styled.div`
`