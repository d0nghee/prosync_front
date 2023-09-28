import React from 'react';
import styled from 'styled-components';


const footerItems = [
  {
    id: 1,
    type: 'image',
    src: '/img/douzonelogo.png',
    alt: 'Company Logo',
    url: 'http://www.douzone.com/main/index.jsp'
  },
  {
    id: 2,
    type: 'link',
    text: 'ERD',
    url: 'https://www.erdcloud.com/d/2vsijJZXGYoixk33n'
  },
  {
    id: 3,
    type: 'link',
    text: 'API명세서',
    url: 'https://observant-lancer-975.notion.site/6e27822d894c4192ae395ad5e600c241?pvs=25'
  },
  {
    id: 4,
    type: 'link',
    text: '요구사항 정의서',
    url: 'https://docs.google.com/spreadsheets/d/1jVODTYzue7WWa7YGVqjkqJc7acn0oenDxX-qfJ_UokI/edit#gid=954673923'
  },
  {
    id: 5,
    type: 'link',
    text: '와이어프레임',
    url: 'https://www.figma.com/file/f4JdJd9iUbeTYKgzUX9dvE/wireframe?type=design&node-id=0%3A1&mode=design&t=EXV2IxL1JZLYZyHy-1'
  },
  {
    id: 6,
    type: 'link',
    text: '각종정책',
    url: 'https://docs.google.com/spreadsheets/d/1jVODTYzue7WWa7YGVqjkqJc7acn0oenDxX-qfJ_UokI/edit#gid=1099185470'
  },
  {
    id: 7,
    type: 'text',
    text: 'Constructed by 김강욱, 김민정, 심창우, 한동희'
  }
]

const FooterContainer = styled.div`
  width: 90vw;
  margin-left: 7%;
  z-index: 50;
`

const StyledFooter = styled.div`
    width: 80%;
    margin-left: 6%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding : 0;
    
`;

const Line = styled.hr`
    width: 80%;
    margin: auto;
    margin-top: 2%;
    height: 3px;
    background-color: lightgray;
    border : 0;
`

const Logo = styled.img`
  width: 200px;
  height: 110px;
  cursor: pointer;
  position: relative;
  margin-left: 50px;
`

const Link = styled.div`
  font-weight: 700;
  font-size: small;
  cursor: pointer;
  
`

const Madeby = styled.div`
  font-weight: 700;
  opacity: 0.5;
  font-size: larger;
  width: 30%;
`

const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener, noreferrer')
  if (newWindow) newWindow.opener = null
}

export default function Footer() {
  return (
    <FooterContainer>
      <Line />
      <StyledFooter>
      {
    
        footerItems.map((item) => {
          switch (item.type) {
            case 'image':
              return <Logo key={item.id} src={item.src} alt={item.alt} onClick={() => openInNewTab(item.url)} />;
            case 'link':
              return <Link key={item.id} onClick={() => openInNewTab(item.url)}>{item.text}</Link>;
            case 'text':
              return <Madeby key={item.id}>{item.text}</Madeby>;
            default:
              return null;
          }
        })
      }
      </StyledFooter>
    </FooterContainer>
  )
}
