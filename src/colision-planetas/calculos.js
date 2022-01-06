let g = 0.1;

function calculoVCoordenada(punto1, punto2, ax, ay, az){
    let d = Math.pow(punto1.x-punto2.x, 2) + Math.pow(punto1.y-punto2.y, 2) + Math.pow(punto1.z-punto2.z, 2);
    ax = -g*punto1.d*(punto1.x - punto2.x)/Math.pow(d, 3/2);
    ay = -g*punto1.d*(punto1.y - punto2.y)/Math.pow(d, 3/2);
    az = -g*punto1.d*(punto1.z - punto2.z)/Math.pow(d, 3/2);
    return ax, ay, az;
}

function trayectoria(planetas){
    planetas.map((punto)=>{
        let ax, ay, az;
        for(let i = 0; i<planetas.length; i++){
            calculoVCoordenada(punto, planetas[i], ax, ay, az);
            punto.x = punto.x;
            punto.x = punto.x;
            punto.x = punto.x;
            punto.x = punto.x;
            punto.vx += ax;
            punto.vy += ay;
            punto.vz += az;
        }
    })
}

export default trayectoria;