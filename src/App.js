import "bootstrap/dist/css/bootstrap.min.css";
import { Accordion, Nav, Navbar, Container } from "react-bootstrap";
import { useState } from "react";

import Lissajous from "./lissajous/App.js";
import ColisionPlanetas from "./colision-planetas/App.js";
import Corriente from "./corriente/App.js";
import AsteroidsCities from "./asteroids-cities/App.js";
import Arcade from "./arcade/App.js";
import Mapas from "./maps/App.js";

function App() {
  let [key1, setKey1] = useState("0");
  let [key2, setKey2] = useState("0");
  let [key3, setKey3] = useState("0");
  let [key4, setKey4] = useState("0");
  let [key5, setKey5] = useState("0");
  let [key6, setKey6] = useState("0");
  let [control, setControl] = useState("inicio");

  function Barra(){
    return(
      <>
      <Navbar bg="dark" variant="dark" id="barra">
          <Container>
            <Navbar.Brand href="/App">Hugomdmg</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/App">Home</Nav.Link>
              <Nav.Link target='_blank' href="https://www.linkedin.com/in/hugo-munoz-de-morales-grado/">Linkedin</Nav.Link>
              <Nav.Link target='_blank' href="https://github.com/hugomdmg?tab=repositories">GitHub</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <br />
        </>
    )
  }

  if (control == "inicio") {
    return (
      <>
        <Barra/>
        <br/>
        <br/>
        <div id="opciones">
          <Accordion defaultActiveKey="1" id="acordeon">
            <div className="contenedorPestanas">
              <Accordion.Item
                className="tarjeta"
                eventKey={key1}
                onMouseOver={() => {
                  setKey1("1");
                }}
                onMouseLeave={() => {
                  setKey1("0");
                }}
                onClick={()=>{
                  setControl('asteroids-cities');
                }}
              >
                <Accordion.Header>
                  <img className="images" src="images/asteroid.png" />
                </Accordion.Header>
                <Accordion.Body></Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                className="tarjeta"
                eventKey={key2}
                onMouseOver={() => {
                  setKey2("1");
                }}
                onMouseLeave={() => {
                  setKey2("0");
                }}
                onClick={()=>{setControl('arcade')}}
              >
                <Accordion.Header>
                  <img className="images" src="images/arcade.png" />
                </Accordion.Header>
                <Accordion.Body></Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                className="tarjeta"
                eventKey={key3}
                onMouseOver={() => {
                  setKey3("1");
                }}
                onMouseLeave={() => {
                  setKey3("0");
                }}
                onClick={() => {
                  setControl("colisionPlanetas");
                }}
              >
                <Accordion.Header>
                  <img className="images" src="images/impacto-planetas.png" />
                </Accordion.Header>
                <Accordion.Body></Accordion.Body>
              </Accordion.Item>
            </div>
            <div className="contenedorPestanas">
              <Accordion.Item
                className="tarjeta"
                
                eventKey={key4}
                onMouseOver={() => {
                  setKey4("1");
                }}
                onMouseLeave={() => {
                  setKey4("0");
                }}
                onClick={() => {
                  setControl("lissajous");
                }}
              >
                <Accordion.Header>
                  <img className="images" src="images/lissajous.png" />
                </Accordion.Header>
                <Accordion.Body></Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                className="tarjeta"
                eventKey={key5}
                onMouseOver={() => {
                  setKey5("1");
                }}
                onMouseLeave={() => {
                  setKey5("0");
                }}
                onClick={() => {
                  setControl("corriente");
                }}
              >
                <Accordion.Header>
                  <img className="images" src="images/corriente.png" />
                </Accordion.Header>
                <Accordion.Body></Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                className="tarjeta"
                eventKey={key6}
                onMouseOver={() => {
                  setKey6("1");
                }}
                onMouseLeave={() => {
                  setKey6("0");
                }}
                onClick={()=>{setControl('mapas')}}
              >
                <Accordion.Header>
                  <img className="images" src="images/curvas-nivel.png" />
                </Accordion.Header>
                <Accordion.Body></Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>
        </div>
      </>
    );
  } else if(control == 'lissajous'){
    return (
      <>
        <Barra/>
        <br/>
        <br/>
        <div id='lissajous'>
        <Lissajous/> 
        </div>
      </>
    );
  }else if(control == 'corriente'){
    return (
      <>
        <Barra/>
        <br/>
        <br/>
        <Corriente/> 
      </>
    );
  }else if(control == 'colisionPlanetas'){
    return (
      <>
        <Barra/>
        <br/>
        <br/>
        <ColisionPlanetas/> 
      </>
    );
  }else if(control == 'asteroids-cities'){
    return (
      <>
        <Barra/>
        <br/>
        <br/>
        <AsteroidsCities/> 
      </>
    );
  }else if(control == 'arcade'){
    return (
      <>
        <Barra/>
        <br/>
        <br/>
        <Arcade/> 
      </>
    );
  }else if(control == 'mapas'){
    return (
      <>
        <Barra/>
        <br/>
        <br/>
        <Mapas/> 
      </>
    );
  }
}

export default App;
