import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { AppBar, Button, Toolbar } from "@mui/material";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    // <Navbar collapseOnSelect expand="lg" bg="black" variant="dark">
    //   <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    //   <Navbar.Collapse id="responsive-navbar-nav">
    //     <Nav className="me-auto">
    //       <Nav.Link href="#" as="span">
    //         <Link to="/" style={padding}>
    //           anecdotes
    //         </Link>
    //       </Nav.Link>
    //       <Nav.Link href="#" as="span">
    //         <Link to="/create" style={padding}>
    //           create new
    //         </Link>
    //       </Nav.Link>
    //       <Nav.Link href="#" as="span">
    //         <Link to="/about" style={padding}>
    //           about
    //         </Link>
    //       </Nav.Link>
    //     </Nav>
    //   </Navbar.Collapse>
    // </Navbar>
    <AppBar position="static">
      <Toolbar>
        <Button component={Link} to="/" color="inherit" variant="text">
          Anecdotes
        </Button>
        <Button component={Link} to="/create" color="inherit" variant="text">
          Create new
        </Button>
        <Button component={Link} to="/about" color="inherit" variant="text">
          About
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
