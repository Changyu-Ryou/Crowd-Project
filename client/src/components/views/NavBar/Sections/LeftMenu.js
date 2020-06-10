import React from 'react';
import { Menu } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      {/* <Menu.Item key="mail">
        <a href="/">Home</a>
      </Menu.Item> */}
      
      <SubMenu title={<span><a href='/' style={{color:'rgba(0, 0, 0, 0.65)'}}>Project 목록</a></span>}>
        <MenuItemGroup title="카테고리">
          <Menu.Item key="setting:1"><a href="/web">웹 App</a></Menu.Item>
          <Menu.Item key="setting:2"><a href="/android">Android</a></Menu.Item>
          <Menu.Item key="setting:3"><a href="/ios">ios</a></Menu.Item>
          <Menu.Item key="setting:4"><a href="/mfc">MFC</a></Menu.Item>
          <Menu.Item key="setting:5"><a href="/game">게임</a></Menu.Item>
          <Menu.Item key="setting:6"><a href="/normal">일반/기타</a></Menu.Item>
        </MenuItemGroup>
        {/* <MenuItemGroup title="Item 2">
          <Menu.Item key="setting:3">Option 3</Menu.Item>
          <Menu.Item key="setting:4">Option 4</Menu.Item>
        </MenuItemGroup> */}
      </SubMenu>

      <Menu.Item key="applied">
        <a href="/AppliedProjectPage">지원한 프로젝트</a>
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu