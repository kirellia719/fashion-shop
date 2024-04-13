import "./Header.scss";

import { useState, forwardRef } from "react";

import viteLogo from "/vite.svg";
import MenuIcon from "@rsuite/icons/Menu";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import CalendarIcon from "@rsuite/icons/Calendar";
import { Drawer, Sidenav, Nav } from "rsuite";

import { Link, useLocation } from "react-router-dom";

const NavLink = forwardRef(({ href, children, ...rest }, ref) => (
  <Link ref={ref} to={href} {...rest}>
    {children}
  </Link>
));

const Header = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [activeKey, setActiveKey] = useState(location.pathname);

  return (
    <div className="Header">
      <div className="logo">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </div>
      <div className="menu-btn" onClick={() => setOpen(true)}>
        <MenuIcon />
      </div>
      <Drawer
        placement="right"
        size="50%"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Sidenav expanded={true}>
          <Sidenav.Body>
            <Nav activeKey={activeKey} onSelect={setActiveKey}>
              <Nav.Item
                eventKey="/"
                icon={<CalendarIcon />}
                as={NavLink}
                href="/"
                onClick={() => setOpen(false)}
              >
                Lịch sử
              </Nav.Item>
              <Nav.Item
                eventKey="/fashion"
                icon={<DashboardIcon />}
                as={NavLink}
                href="/fashion"
                onClick={() => setOpen(false)}
              >
                Tủ trang phục
              </Nav.Item>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </Drawer>
    </div>
  );
};

export default Header;
