import { useRef, useEffect, useState } from "react";

function CuadroDibujo() {
  let pulsado = false;
  let [curvas, setCurvas] = useState([]);
  let z = 0;
  let n = 1;
  let windowWidth = window.innerWidth / 2;
  let windowHeight = window.innerHeight / 2;
  const canvasRef = useRef(null);
  let controlGiro = 0;

  function Altura() {
    let [altura, setAltura] = useState(0);
    return (
      <>
        <div class="altitud">
          <p>Altitud: {altura * 10}m</p>
          <div class="botones">
            <div>
              <button
                onClick={() => {
                  z += 1;
                  setAltura(z);
                  setCurvas(curvas);
                }}
              >
                +10m
              </button>
              <button
                onClick={() => {
                  z += 10;
                  setAltura(z);
                  setCurvas(curvas);
                }}
              >
                +100m
              </button>
              <button
                onClick={() => {
                  z += 100;
                  setAltura(z);
                  setCurvas(curvas);
                }}
              >
                +1000m
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  z -= 1;
                  setAltura(z);
                  setCurvas(curvas);
                }}
              >
                -10m
              </button>
              <button
                onClick={() => {
                  z -= 10;
                  setAltura(z);
                  setCurvas(curvas);
                }}
              >
                -100m
              </button>
              <button
                onClick={() => {
                  z -= 100;
                  setAltura(z);
                  setCurvas(curvas);
                }}
              >
                -1000m
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let desfasex = canvas.offsetLeft;
    let desfasey = canvas.offsetTop;

    redimensionar(context, desfasex, desfasey);

    window.addEventListener("mousedown", () => {
      pulsado = true;
      if (curvas.length > 0) {
        curvas[curvas.length - 1].ruta = false;
      }
    });
    window.addEventListener("mouseup", () => {
      pulsado = false;
    });
    window.addEventListener("mousemove", (event) => {
      if (pulsado) {
        curvas.push({
          x: event.clientX - desfasex - windowWidth,
          y: event.clientY - desfasey - windowHeight,
          z: z/4,
          id: z/4,
          ruta: true,
        });
      }
    });

    eventos(87, "x", -1);
    eventos(83, "x", 1);
    eventos(65, "y", -1);
    eventos(68, "y", 1);
    eventos(81, "z", -1);
    eventos(69, "z", 1);

    window.addEventListener("keydown", (event) => {
      console.log(event.keyCode);
    });

    function dibujar() {
      if (controlGiro === "x") {
        rotarx(0.01, n);
      }
      if (controlGiro === "y") {
        rotary(0.01, n);
      }
      if (controlGiro === "z") {
        rotarz(0.01, n);
      }
      drawCurvas(context);
      requestAnimationFrame(dibujar);
    }
    dibujar();
  });

  function drawCurvas(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let i = 0; i < curvas.length - 1; i++) {
      if (curvas[i].id == curvas[i + 1].id && curvas[i].ruta) {
        ctx.beginPath();
        colorCurva(ctx, curvas[i].id, curvas[i].z);
        ctx.lineWidth = 4;
        ctx.moveTo(curvas[i].x + windowWidth, curvas[i].y + windowHeight);
        ctx.lineTo(
          curvas[i + 1].x + windowWidth,
          curvas[i + 1].y + windowHeight
        );
        ctx.stroke();
      }
    }
  }

  function rotarx(alfa, n) {
    let curvasRotadas = curvas.map((punto) => {
      let puntos = {
        x: punto.x,
        y: Math.cos(alfa) * punto.y - n * Math.sin(alfa) * punto.z,
        z: n * Math.sin(alfa) * punto.y + Math.cos(alfa) * punto.z,
        id: punto.id,
        ruta: punto.ruta,
      };
      return puntos;
    });
    curvas = curvasRotadas;
  }

  function rotary(alfa, n) {
    let curvasRotadas = curvas.map((punto) => {
      let puntos = {
        x: Math.cos(alfa) * punto.x - n * Math.sin(alfa) * punto.z,
        y: punto.y,
        z: n * Math.sin(alfa) * punto.x + Math.cos(alfa) * punto.z,
        id: punto.id,
        ruta: punto.ruta,
      };
      return puntos;
    });
    curvas = curvasRotadas;
  }

  function rotarz(alfa, n) {
    let curvasRotadas = curvas.map((punto) => {
      let puntos = {
        x: Math.cos(alfa) * punto.x - n * Math.sin(alfa) * punto.y,
        y: n * Math.sin(alfa) * punto.x + Math.cos(alfa) * punto.y,
        z: punto.z,
        id: punto.id,
        ruta: punto.ruta,
      };
      return puntos;
    });
    curvas = curvasRotadas;
  }

  function borrarTrazo(){
    curvas.splice(curvas.length-1, 1);
    for(let i = curvas.length-1; i>1; i--){
      if(curvas[i].ruta){
      curvas.splice(i,1);
      }else{
        break;
      }
    }
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

  function redimensionar(ctx, dx, dy) {
    ctx.canvas.width = window.innerWidth - dx;
    ctx.canvas.height = window.innerHeight - dy;
  }

  function colorCurva(ctx, puntoid, puntoz){
    if(puntoid<200/4){
    ctx.strokeStyle = `rgb(0, ${100 + puntoid*3 + puntoz/8 }, 10)`;
    }else if(200/4<=puntoid && puntoid<400/4){
      let h = 400/4 - puntoid
      ctx.strokeStyle = `rgb(160, ${h*3}, 0)`;
    }else if(400/4<=puntoid && puntoid<1000/4){
      ctx.strokeStyle = `rgb(130, ${4*puntoid/5+30}, ${4*puntoid/5})`;
    }
  }

  return (
    <>
    <div class='altitud'>
      <Altura />
      <div class='botones'>
      <input
        type="file"
        id="inputMapa"
        name="avatar"
        accept="image/*"
        onChange={(e) => {
          // Creamos el objeto de la clase FileReader
          let reader = new FileReader();

          // Leemos el archivo subido y se lo pasamos a nuestro fileReader
          reader.readAsDataURL(e.target.files[0]);

          // Le decimos que cuando este listo ejecute el código interno
          reader.onload = () => {
            document.getElementById(
              "canvas"
            ).style.backgroundImage = `url(${reader.result})`;
          };
        }}
      />
      <button onClick={()=>{borrarTrazo()}}>atras</button>
      </div>
      </div>
      <canvas ref={canvasRef} id="canvas" />
    </>
  );
}

export default CuadroDibujo;
