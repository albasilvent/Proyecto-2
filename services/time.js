//Funcion que devuelve un timestamp x cantidad de minutos en el futuro
module.exports = {
    getTimestampMinutesFromNow(minutes) {
      return Date.now() + minutes * 60 * 1000;
    },
  };