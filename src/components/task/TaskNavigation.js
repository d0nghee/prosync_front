import { useState } from 'react';
import { styled } from 'styled-components'

export default function TaskNavigation() {
    const [selectedItem, setSelectedItem] = useState('TABLE');

    const handleItemClick = (item) => {
      setSelectedItem(item);
    };

  return (
    <>
        <TaskNav>
            <div>FILTER</div>
            <NavItem selected={selectedItem === 'TABLE'} onClick={()=> handleItemClick('TABLE')}>TABLE</NavItem>
            <NavItem selected={selectedItem === 'BOARD'} onClick={()=> handleItemClick('BOARD')}>BOARD</NavItem>
            <NavItem selected={selectedItem === 'ROAD MAP'} onClick={()=> handleItemClick('ROAD MAP')}>ROAD MAP</NavItem>
        </TaskNav>
    </>
  )
}


const TaskNav = styled.ul`
    display: flex;
    gap: 3rem;

    width: 85rem;
    height: 5rem;
    margin: 0;
    padding: 10px;
    background-color: white;
    border-radius: 5px;
    align-items: center;

    font-weight: bold;
    color: #495057;

    div {
        padding-bottom: 3px;
    }


`;

const NavItem = styled.li`
  cursor: pointer;
  border-bottom: ${(props) => (props.selected ? '4px solid #8338ec' : 'none')};
  color: ${(props) => (props.selected ? '#8338ec' : '#495057')};
  padding-bottom: 3px;


  &:hover {
    color:#8338ec;
    border-bottom: 4px solid #8338ec
  }
`;
