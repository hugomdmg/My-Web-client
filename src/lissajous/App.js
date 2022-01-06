import "./App.css";
import { useRef, useEffect, useState } from "react";

function Lissajous() {
  let [A1, setA1] = useState(7);
  let [A2, setA2] = useState(5);
  let [desfase, setDesfase] = useState(1.4);
  let controlGiro = 0;
  let c1 = 150;
  let c2 = 70;
  let t = 0;
  let n = 1;
  let trayectoria = [];
  const canvasRef = useRef(null);

  //Movimiento de la figura 3d

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

  //------------------------------
  //------Crecion de la figura----

  function verFigura() {
    setA1(document.getElementById("amplitud1").value);
    setDesfase(document.getElementById("fase").value);
    setA2(document.getElementById("amplitud2").value);
    t = 0;
  }

  function crearTrayectoria(A1, A2, t) {
    if (t < 15) {
      if (controlGiro == 0) {
        trayectoria.push({
          x: 5 * Math.sin(t * Math.PI) * A1,
          y: 5 * Math.cos(desfase * t * Math.PI) * A2,
          z: 150 - 20 * t,
        });
      }
    }
  }

  function dibujar(ctx, puntos) {
    if (controlGiro === "x") {
      trayectoria = rotarx(0.03, n, trayectoria);
    } else if (controlGiro === "y") {
      trayectoria = rotary(0.03, n, trayectoria);
    }
    for (let i = 1; i < puntos.length; i++) {
      ctx.beginPath();
      if (t < 15) {
        ctx.strokeStyle = "white";
      } else {
        ctx.strokeStyle = "green";
      }
      ctx.lineWidth = 0.5;
      ctx.moveTo(puntos[i - 1].x + c1, puntos[i - 1].y + c2);
      ctx.lineTo(puntos[i].x + c1, puntos[i].y + c2);
      ctx.stroke();
    }
  }

  useEffect(() => {
    setInterval(() => {
      if (t < 15) {
        t += 0.04;
      }
    }, 30);
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    function simulacion() {
      crearTrayectoria(A1, A2, t);
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      eventos(87, "x", -1);
      eventos(83, "x", 1);
      eventos(65, "y", -1);
      eventos(68, "y", 1);
      dibujar(context, trayectoria);
      requestAnimationFrame(simulacion);
    }
    simulacion();
  });

  //----------------------------------
  return (
    <>
      <div id="parrafo">
        <div id="lissaJousCuadro">
          <div>
            <h3>Introduzca datos de las ondas:</h3>

            <div>Amplitud primera onda: </div>
            <input type="text" id="amplitud1" placeholder={A1} />
            <div>Amplitud segunda onda: </div>
            <input type="text" id="amplitud2" placeholder={A2} />
            <div>Desfase λ1-λ2 : </div>
            <input type="text" id="fase" placeholder={desfase} />
            <button
              type="text"
              onClick={() => {
                verFigura();
              }}
            >
              ver figura
            </button>
          </div>
        </div>
        <canvas className="lissajousCanvas" ref={canvasRef} width='300' height='140'></canvas>
      </div>
    </>
  );
}

export default Lissajous;
