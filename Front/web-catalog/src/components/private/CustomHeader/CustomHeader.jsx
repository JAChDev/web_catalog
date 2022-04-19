import React from "react";
import './CustomHeader.css'
import logo from "../icons/catalog-icon-5.png"
import { Container, Navbar, Nav, Row, Col } from "react-bootstrap";

function CustomHeader() {
    return (
        <Navbar variant="dark" bg="dark" fixed="top">
            <Container>
                <Row>
                    <Col md={4}>
                        <Navbar.Brand>
                            <img src={logo} alt="logo" className="navLogo"/>
                        </Navbar.Brand>
                    </Col>
                    <Col md={8} className="title">
                        <div>Catálogo</div>
                    </Col>
                </Row>

            </Container>
        </Navbar>
    )
}

export default CustomHeader;