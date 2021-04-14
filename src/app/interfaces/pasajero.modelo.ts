export class pasajeroModel{
    nombre: String;
    celular: Number;
    curp: String;
    email: String;
    password: String;
    idMatricula: Number;
}

export class viajeModel{
    latitudD: Number;
    longitudD: Number;
    estado: Number;
    idMatricula: Number;
}

export class viajeAceptarModel{
    latitud: Number;
    longitud: Number;
    estado: Number;
    idMatricula: Number;
    nombre: String;
    placas: String;
    idConductor: Number
}

export class solicitarViaje{
    latitud: Number;
    longitud: Number;
    latitudD: Number;
    longitudD: Number;
    idMatricula: Number;
} 