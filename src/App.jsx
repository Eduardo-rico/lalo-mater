import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  centerContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    paddingTop: theme.spacing(5), // Ajuste de padding en la parte superior
  },
  mensajeRiesgo: {
    padding: theme.spacing(2),
    borderRadius: "4px",
    marginTop: theme.spacing(2),
    textAlign: "center",
  },
  riesgoBajo: {
    backgroundColor: "#D4EDDA",
  },
  riesgoIntermedio: {
    backgroundColor: "#FFF3CD",
  },
  riesgoAlto: {
    backgroundColor: "#F8D7DA",
  },
}));

function App() {
  const classes = useStyles();

  const [contador, setContador] = useState(0);
  const [sistolica, setSistolica] = useState(0);
  const [diastolica, setDiastolica] = useState(0);
  const [frecuenciaRespiratoria, setFrecuenciaRespiratoria] = useState(0);
  const [frecuenciaCardiaca, setFrecuenciaCardiaca] = useState(0);
  const [porcentajeO2, setPorcentajeO2] = useState(0);
  const [temperatura, setTemperatura] = useState(0);
  const [estadoConciencia, setEstadoConciencia] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Lógica para calcular el contador
    let nuevoContador = 0;

    // Condiciones para la presión arterial sistólica
    if (sistolica < 80) nuevoContador += 3;
    else if (sistolica >= 80 && sistolica < 90) nuevoContador += 2;
    else if (sistolica >= 140 && sistolica < 150) nuevoContador += 1;
    else if (sistolica >= 150 && sistolica < 160) nuevoContador += 2;
    else if (sistolica >= 160) nuevoContador += 3;

    // Condiciones para la presión arterial diastólica
    if (diastolica < 90) nuevoContador += 0;
    else if (diastolica >= 100 && diastolica < 110) nuevoContador += 2;
    else if (diastolica >= 110) nuevoContador += 3;

    // Condiciones para la frecuencia respiratoria
    if (frecuenciaRespiratoria < 10) nuevoContador += 3;
    else if (frecuenciaRespiratoria >= 25 && frecuenciaRespiratoria < 30)
      nuevoContador += 2;
    else if (frecuenciaRespiratoria >= 30) nuevoContador += 3;

    // Condiciones para la frecuencia cardíaca
    if (frecuenciaCardiaca < 60) nuevoContador += 3;
    else if (frecuenciaCardiaca >= 111 && frecuenciaCardiaca < 150)
      nuevoContador += 2;
    else if (frecuenciaCardiaca >= 150) nuevoContador += 3;

    // Condiciones para el %O2 requerido
    if (porcentajeO2 >= 24 && porcentajeO2 < 40) nuevoContador += 1;
    else if (porcentajeO2 >= 40) nuevoContador += 3;

    // Condiciones para la temperatura
    if (temperatura < 34) nuevoContador += 3;
    else if ((temperatura >= 38.0 && temperatura < 39) || temperatura < 35)
      nuevoContador += 1;
    else if (temperatura >= 39) nuevoContador += 3;

    // Condiciones para el estado de conciencia
    if (estadoConciencia === "no alerta") nuevoContador += 3;

    setContador(nuevoContador);
  };

  // Función para determinar el mensaje de riesgo
  const determinarMensajeRiesgo = () => {
    if (contador === 0)
      return (
        <>
          NO HAY RIESGO. EL MONITOREO DE CONSTANTES VITALES DEBE SER CADA 12
          HORAS
        </>
      );
    else if (contador >= 1 && contador <= 3)
      return (
        <>
          RIESGO BAJO. EL MONITOREO DE CONSTANTES VITALES DEBE SER CADA 4 HORAS
        </>
      );
    else if (contador >= 4 && contador <= 5)
      return (
        <>
          RIESGO INTERMEDIO. EL MONITOREO DE CONSTANTES VITALES DEBE SER CADA
          HORA. LLAMADO URGENTE AL MEDICO A CARGO DE LA PACIENTE Y AL PERSONAL
          CON LAS COMPETENCIASA PARA EL MANEJO DE ENFERMEDAD AGUDA
        </>
      );
    else
      return (
        <>
          RIESGO ALTO. EL MONITOREO DE CONSTANTES VITALES CONTINUO. LLAMADO
          EMERGENTE AL EQUIPO CON COMPETENCIAS EN CUIDADO CRÍTICO Y HABILIDADES
          PARA EL DIAGNÓSTICO. ACTIVAR <strong> CÓDIGO MATER</strong>
        </>
      );
  };

  return (
    <div className={classes.centerContent}>
      <Container maxWidth="xs">
        <Typography variant="h5" align="center" gutterBottom>
          Monitoreo de constantes vitales
        </Typography>
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Presión Arterial Sistólica"
                type="number"
                value={sistolica}
                onChange={(e) => setSistolica(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Presión Arterial Diastólica"
                type="number"
                value={diastolica}
                onChange={(e) => setDiastolica(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Frecuencia Respiratoria"
                type="number"
                value={frecuenciaRespiratoria}
                onChange={(e) => setFrecuenciaRespiratoria(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Frecuencia Cardíaca"
                type="number"
                value={frecuenciaCardiaca}
                onChange={(e) => setFrecuenciaCardiaca(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="%O2 Requerido"
                type="number"
                value={porcentajeO2}
                onChange={(e) => setPorcentajeO2(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Temperatura"
                type="number"
                value={temperatura}
                onChange={(e) => setTemperatura(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel>Estado de Conciencia</InputLabel>
                <Select
                  value={estadoConciencia}
                  onChange={(e) => setEstadoConciencia(e.target.value)}
                >
                  <MenuItem value="">Selecciona...</MenuItem>
                  <MenuItem value="alerta">Alerta</MenuItem>
                  <MenuItem value="no alerta">No alerta</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Calcular
          </Button>
        </form>
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h6">Contador total: {contador}</Typography>
          <div
            className={`${classes.mensajeRiesgo} ${
              contador === 0
                ? ""
                : contador <= 3
                ? classes.riesgoBajo
                : contador <= 5
                ? classes.riesgoIntermedio
                : classes.riesgoAlto
            }`}
          >
            <Typography variant="body1">{determinarMensajeRiesgo()}</Typography>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default App;
