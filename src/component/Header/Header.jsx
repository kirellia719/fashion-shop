import "./Header.scss";

import { useState, forwardRef } from "react";

import viteLogo from "/vite.svg";
import MenuIcon from "@rsuite/icons/Menu";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import CalendarIcon from "@rsuite/icons/Calendar";
import { Drawer, Sidenav, Nav, Button, Navbar } from "rsuite";

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
      <Navbar style={{ width: "100%" }} appearance="subtle">
        <Nav>
          <Nav.Item className="nav-item">
            <div className="logo">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </div>
          </Nav.Item>
        </Nav>
        <Nav activeKey={activeKey} onSelect={setActiveKey} pullRight>
          <Nav.Item
            eventKey="/"
            icon={<CalendarIcon />}
            as={NavLink}
            href="/"
            className="nav-item"
          >
            Lịch sử
          </Nav.Item>
          <Nav.Item
            eventKey="/fashion"
            icon={<DashboardIcon />}
            as={NavLink}
            href="/fashion"
            className="nav-item"
          >
            Tủ đồ
          </Nav.Item>
          <Nav.Item
            eventKey="/statistic"
            icon={<DashboardIcon />}
            as={NavLink}
            href="/statistic"
            className="nav-item"
          >
            Thống kê
          </Nav.Item>
        </Nav>
      </Navbar>
      {/* <div className="menu-btn" onClick={() => setOpen(true)}>
        <MenuIcon />
      </div> */}
      {/* <div className="logo">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </div>
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
          Tủ đồ
        </Nav.Item>
      </Nav> */}

      {/* <Drawer
        placement="left"
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
      </Drawer> */}
    </div>
  );
};

export default Header;
