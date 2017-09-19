import React from 'react';
import { Dashboard, Header, Sidebar } from 'react-adminlte-dash';

    const Nav = (props) => (
      <Dashboard
        navbarChildren={
          <Header.Item href="/some/link" key="1" title="Logout"/>
        }
        sidebarChildren={
          <Sidebar.Menu header="NAVIGATION" key="1">
            <Sidebar.Menu.Item title="Home" href="/" />
            <Sidebar.Menu.Item title="Time In/Out" href="/time" />
            <Sidebar.Menu.Item title="Schedule" href="/schedule" />
          </Sidebar.Menu>
        }
        logoLg={<span>TimeTracker</span>}
        theme="skin-blue"
      >
        {props.children}
      </Dashboard>
    );

    export default Nav;