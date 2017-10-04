import React from 'react';
import { Dashboard, Header, Sidebar } from 'react-adminlte-dash';

const Nav = (props) => {
  let sideBar = null;
  if (window.user.is_admin) {
    sideBar = (
      <Sidebar.Menu header="NAVIGATION" key="1">
        <Sidebar.Menu.Item title="Home" href="/home" />
        <Sidebar.Menu.Item title="Time In/Out" href="/time" />
        <Sidebar.Menu.Item title="Schedule" href="/schedule" />
      </Sidebar.Menu>
    );
  } else {
    sideBar = (
      <Sidebar.Menu header="NAVIGATION" key="1">
        <Sidebar.Menu.Item title="Time In/Out" href="/time" />
      </Sidebar.Menu>
    );
  }
  return (
    <Dashboard
      navbarChildren={
        <Header.Item href="/logout" key="1" title="Logout" />
      }
      sidebarChildren={sideBar}
      logoLg={<span>TimeTracker</span>}
      theme="skin-blue"
    >
      {props.children}
    </Dashboard>
  );
}
export default Nav;