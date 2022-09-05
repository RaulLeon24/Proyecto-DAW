'use strict';

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomArray(array) {
 const min = Math.ceil(0);
 const max = Math.floor(array.length-1);
 const indice =  Math.floor(Math.random() * (max - min + 1) + min);
  return array[indice]
}


module.exports = {
  async up (queryInterface, Sequelize) {
    for (let i = 0; i <100; i++) {  
      await queryInterface.bulkInsert('Juegos', [{  
          nombre: 'Juego '+i,  
          idJuego: i,  
          idPlataforma : i,
          precio: getRandomIntInclusive(4,45),
          categoria:getRandomArray(["MultiPlayer", 
          "SinglePlayer",
          "Terror",
          "Accion",
          "Carreras"]),
          score:getRandomIntInclusive(0,5),
          createdAt: new Date(),  
          updatedAt: new Date()  
      }], {});  
   } 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Juegos', null, {}); 
  }
};
