import React, { useEffect, useRef } from "react";

//variables para movimiento canvas

let controlGiro = 0;
let n = 1;

//-----------Funciones----------------------------

function calculoVCoordenada(punto1, punto2) {
  let g = 0.000001;
  if (punto1.x !== punto2.x && punto1.y !== punto2.y && punto1.z !== punto2.z) {
    let d = Math.pow(
      Math.pow(punto1.x - punto2.x, 2) +
        Math.pow(punto1.y - punto2.y, 2) +
        Math.pow(punto1.z - punto2.z, 2),
      1 / 2
    );
    let ax = 0, ay = 0, az = 0;

      ax =
        (-g * punto2.d * (punto1.x - punto2.x)) / Math.pow(d, 3/2 ) / punto1.d;
      ay =
        (-g * punto2.d * (punto1.y - punto2.y)) / Math.pow(d, 3/2 ) / punto1.d;
      az =
        (-g * punto2.d * (punto1.z - punto2.z)) / Math.pow(d, 3/2 ) / punto1.d;

      punto1.x = punto1.x + punto1.vx;
      punto1.y = punto1.y + punto1.vy;
      punto1.z = punto1.z + punto1.vz;
      
      punto1.vx = punto1.vx + ax;
      punto1.vy = punto1.vy + ay;
      punto1.vz = punto1.vz + az;
    //   let v = Math.abs(Math.pow(
    //     Math.pow(punto1.vx - punto2.vx, 2) +
    //       Math.pow(punto1.vy - punto2.vy, 2) +
    //       Math.pow(punto1.vz - punto2.vz, 2),
    //     1 / 2
    //   ))
    //   if (d < 20 && v<10) {
    //   punto1.vx = (punto1.vx*punto1.d+punto2.vx*punto2.d)/(punto1.d+punto2.d);
    //   punto1.vy = (punto1.vy*punto1.d+punto2.vy*punto2.d)/(punto1.d+punto2.d);
    //   punto1.vz = (punto1.vz*punto1.d+punto2.vz*punto2.d)/(punto1.d+punto2.d);
    // }

    punto1.d = punto1.d;
  }
}

//movimiento del canvas

function eventos(tecla, control, sentido) {
  window.addEventListener("keydown", (event) => {
    if (event.keyCode == tecla) {
      controlGiro = control;
      n = sentido;
    }
  });
  window.addEventListener("keyup", (event) => {
    if (event.keyCode == tecla) {
      controlGiro = 0;
    }
  });
}

function rotarx(alfa, n, planetas) {
  let curvasRotadas = planetas.map((punto) => {
    let puntos = {
      id: punto.id,
      x: punto.x,
      y: Math.cos(alfa) * punto.y - n * Math.sin(alfa) * punto.z,
      z: n * Math.sin(alfa) * punto.y + Math.cos(alfa) * punto.z,
      color: punto.color,
      vx: punto.vx,
      vy: Math.cos(alfa) * punto.vy - n * Math.sin(alfa) * punto.vz,
      vz: n * Math.sin(alfa) * punto.vy + Math.cos(alfa) * punto.vz,
      d: punto.d,
    };
    return puntos;
  });
  return curvasRotadas;
}

function rotary(alfa, n, planetas) {
  let curvasRotadas = planetas.map((punto) => {
    let puntos = {
      x: Math.cos(alfa) * punto.x - n * Math.sin(alfa) * punto.z,
      y: punto.y,
      z: n * Math.sin(alfa) * punto.x + Math.cos(alfa) * punto.z,
      vx: Math.cos(alfa) * punto.vx - n * Math.sin(alfa) * punto.vz,
      vy: punto.vy,
      vz: n * Math.sin(alfa) * punto.vx + Math.cos(alfa) * punto.vz,
      color: punto.color,
      d: punto.d,
    };
    return puntos;
  });
  return curvasRotadas;
}

//-------------------

function crearPlaneta(planeta, posicion0, id) {
  console.log(planeta);
  let puntos = [];
  if (planeta.nucleo.r !== 0) {
    for (let i = 0; i < planeta.nucleo.r / 80; i += 30) {
      puntos.push({
        id: id,
        x: i,
        y: 0,
        z: 0,
        vx: planeta.velocidad.x,
        vy: planeta.velocidad.y,
        vz: 0,
        color: "rgb(141, 12, 8)",
        d: planeta.nucleo.d,
      });
    }
    for (
      let i = planeta.nucleo.r / 80;
      i < planeta.manto.r / 80 - 10;
      i += 30
    ) {
      puntos.push({
        id: id,
        x: i,
        y: 0,
        z: 0,
        vx: planeta.velocidad.x,
        vy: planeta.velocidad.y,
        vz: 0,
        color: "rgb(231, 123, 22)",
        d: planeta.nucleo.d,
      });
    }
    for (let i = planeta.manto.r / 80; i < planeta.corteza.r / 80; i += 30) {
      puntos.push({
        id: id,
        x: i,
        y: 0,
        z: 0,
        vx: planeta.velocidad.x,
        vy: planeta.velocidad.y,
        vz: 0,
        color: "rgb(139, 163, 33)",
        d: planeta.manto.d,
      });
    }
    let n = puntos.length;
    for (let i = 0; i <= 1; i += 0.1) {
      for (let j = 0; j < n; j++) {
        if(puntos[j].x > 0.1){
        let puntosRotados = {
          id: puntos[j].id,
          x:
            puntos[j].x * Math.cos(Math.PI * i) -
            puntos[j].y * Math.sin(Math.PI * i),
          y:
            puntos[j].x * Math.sin(Math.PI * i) +
            puntos[j].y * Math.cos(Math.PI * i),
          z: 0,
          vx: planeta.velocidad.x,
          vy: planeta.velocidad.y,
          vz: 0,
          color: puntos[j].color,
          d: planeta.corteza.d,
        };
        puntos.push(puntosRotados);
      }
    }
    }
    n = puntos.length;
    for (let i = 0; i < 2; i += 0.2) {
      for (let j = 0; j < n; j++) {
        if (Math.abs(puntos[j].y) > 5) {
          let puntosRotados = {
            id: puntos[j].id,
            x: puntos[j].x,
            y:
              puntos[j].y * Math.cos(Math.PI * i) -
              puntos[j].z * Math.sin(Math.PI * i),
            z:
              puntos[j].y * Math.sin(Math.PI * i) +
              puntos[j].z * Math.cos(Math.PI * i),
            vx: planeta.velocidad.x,
            vy: planeta.velocidad.y,
            vz: 0,
            color: puntos[j].color,
            d: puntos[j].d,
          };
          puntos.push(puntosRotados);
        }
      }
    }
  } else {
    puntos.push({
      id: 1,
      x: 100,
      y: 100,
      z: 0,
      vx: planeta.velocidad.x,
      vy: planeta.velocidad.y,
      vz: 0,
      color: "rgb(141, 12, 8)",
      d: 300,
    });
  }
  puntos.map((punto) => {
    punto.x += posicion0.x;
    punto.y += posicion0.y;
    punto.z += posicion0.z;
  });
  return puntos;
}

function dibujar(ctx, planetas) {
  if (controlGiro === "x") {
    planetas = rotarx(0.03, n, planetas);
  } else if (controlGiro === "y") {
    planetas = rotary(0.03, n, planetas);
  }
  planetas.map((punto) => {
    ctx.beginPath();
    ctx.strokeStyle = punto.color;
    ctx.fillStyle = punto.color;
    if (0.1 * punto.z + 200 > 0) {
      ctx.arc(600 + punto.x, 300 + punto.y, (0.1 * punto.z + 200) / 100, 0, 7);
    }
    ctx.fill();
    ctx.stroke();
  });
  return planetas;
}

function tablaPlaneta(planeta, nombre) {
  return (
    <div>
      <h5>{nombre}</h5>
      <p>radio nucleo: {planeta.nucleo.r}</p>
      <p>densidad nucleo: {planeta.nucleo.d}</p>
      <p>radio manto: {planeta.manto.r}</p>
      <p>densidad manto: {planeta.manto.d}</p>
      <p>radio corteza: {planeta.corteza.r}</p>
      <p>densidad corteza: {planeta.corteza.d}</p>
    </div>
  );
}

function redimensionar(ctx) {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}

//------------------------------------

function Planetas(props) {
  let tablaPlaneta1 = tablaPlaneta(props.planeta1, "Planeta 1");
  let tablaPlaneta2 = tablaPlaneta(props.planeta2, "Planeta 2");
  let i = 0;

  const canvasRef = useRef(null);

  //---------------------------------------------------
  //---------------------------------------------------
  let planetas = [];

  let planeta1 = crearPlaneta(props.planeta1, { x: 250, y: -100, z: 0 }, 1);
  let planeta2 = crearPlaneta(props.planeta2, { x: -50, y: 100, z: 0 }, 2);
  planetas = planeta1;
  planeta2.map((punto) => {
    planetas.push(punto);
  });

  console.log(planetas);

  //-----------------------------------

  let datosCalculados = [{ t: planetas }];
  function trayectoria(datosCargados, datosCalculados) {
    for (let j = 0; j < datosCargados.length; j++) {
      for (let i = 0; i < datosCargados.length; i++) {
        calculoVCoordenada(datosCargados[j], datosCargados[i]);
      }
    }
    datosCalculados.push({ t: datosCargados });
  }

  //-----------------------------------
  //-----------------------------------

  useEffect(() => {
    setInterval(() => {
      let datosCargados = datosCalculados[i].t;
      trayectoria(datosCargados, datosCalculados);
    }, 40);
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    redimensionar(context);
    function simulacion() {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      eventos(87, "x", -1);
      eventos(83, "x", 1);
      eventos(65, "y", -1);
      eventos(68, "y", 1);
      datosCalculados[i].t = dibujar(context, datosCalculados[i].t);

      requestAnimationFrame(simulacion);
    }
    simulacion();
  });

  return (
    <>
      <div class="datos">
        {tablaPlaneta1}
        {tablaPlaneta2}
      </div>
      <div id="cuadro">
        <canvas id="canvasSimulacion" ref={canvasRef}></canvas>
      </div>
    </>
  );
}

export default Planetas;
