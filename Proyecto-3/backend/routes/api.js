var express = require('express');
var router = express.Router();
const Juego = require("../models").juego;
const axios = require('axios')
const { Sequelize } = require("sequelize");

/**
 * @swagger
 * components:
 *   schemas:
 *     Juego:
 *       type: object
 *       properties:
 *         categoria:
 *           type: string
 *           description: Categoria del Juego.
 *           example: SinglePlayer
 *         description:
 *           type: string
 *           description: Descripcion del Juego.
 *           example: At enim dolorem. Explicabo quos exercitationem libero fuga nisi qui optio. Quia illum sunt repudiandae atque sit nesciunt debitis. Est sint at nostrum. Reprehenderit aut pariatur qui est et.
 *         id:
 *           type: integer
 *           description: ID de Juego.
 *           example: 1
 *         nombre:
 *           type: string
 *           description: Nombre del Juego.
 *           example: architecto repellendus ratione
 *         precio:
 *           type: integer
 *           description: Precio del Juego.
 *           example: 64
 *         publicationDate:
 *           type: string
 *           description: Fecha de Publicacion del Juego.
 *           example: 2017-05-27T06:55:37.201Z
 *         score:
 *           type: integer
 *           description: Valoracion del Juego.
 *           example: 2
 *         url_imagenes:
 *           type: string
 *           description: Imagen del Juego.
 *           example: https://sm.ign.com/ign_es/screenshot/default/free-shipping-custom-poster-nice-bedroom-decor-fas_9w8p.jpg
 *     Categoria:
 *       type: string
 *       description: Categoria del Juego.
 *       example: SinglePlayer
 *           
 */


/**
 * @openapi
 * /:
 *   get:
 *     description: Sin ningun tipo de filtro trae todos los juegos de la coleccion que está en la base de datos no relacional subida en Firebase.
 *     responses:
 *       200:
 *         description: Sin ningun tipo de filtro trae todos los juegos de la coleccion que está en la base de datos no relacional subida ens Firebase.
 *         content:
 *           'aplication/json':
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Juego'
 */
router.get("/", function (req, res, next) {
  axios.get(`https://proyecto3-86169-default-rtdb.firebaseio.com/juegos.json`)
  .then( resAxios => {
      res.json(resAxios.data)
  })
  .catch(err => console.log(err))
});
/**
 * @openapi
 * /categorias:
 *   get:
 *     description: Obtiene la entidad categoria de los juegos que están en la base de datos relacional.
 *     responses:
 *       200:
 *         description: Trae todas las categorias de los juegos que están en la base de datos relacional.
 *         content:
 *           'aplication/json':
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Categoria'
 *                 
 */
router.get("/categorias", function (req, res, next) {
  let categoria = req.params.categoria;	
  Juego.findAll({
    attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('categoria')) ,'categoria'],
    ]
}).then(function(categoria) {
    res.json(categoria.map(cat=>cat.categoria))
  })
  .catch(error => res.status(400).send(error))});

  /**
 * @openapi
 * /juegos-categoria/{categoria}:
 *   
 *   get:
 *     description: Obtiene los juegos de la coleccion de la base base de datos no relacional filtrada mediante su parametro categoria.
 *     parameters:
 *     - name: categoria
 *       in: path
 *       description: Id de la Categoria
 *       required: true
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: Trae los juegos de la coleccion de la base base de datos no relacional unicamente los juegos con la categoria seleccionada
 *         content:
 *           'aplication/json':
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Juego'
 */
  router.get("/juegos-categoria/:categoria", function (req, res, next) {
    let categoria = req.params.categoria;	
    axios.get(`https://proyecto3-86169-default-rtdb.firebaseio.com/juegos.json`)
  .then( resAxios => {
      filtradoCategoria=resAxios.data.filter(juego => juego.categoria == categoria)
      res.json(filtradoCategoria)
  })
  .catch(err => console.log(err))});

    /**
 * @openapi
 * /juegos-id/{idJuego}:
 *   get:
 *     description: Obtiene el juego de la coleccion de la base base de datos no relacional filtrada mediante su parametro idJuego.
 *     parameters:
 *     - name: idJuego
 *       in: path
 *       description: Id del Juego
 *       required: true
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: Trae el juego de la coleccion de la base base de datos no relacional en base a su idJuego
 *         content:
 *           'aplication/json':
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Juego'
 */
  router.get("/juegos-id/:idJuego", function (req, res, next) {
    let id = req.params.idJuego;	
    axios.get(`https://proyecto3-86169-default-rtdb.firebaseio.com/juegos.json`)
  .then( resAxios => {
      filtradoId=resAxios.data.filter(juego => juego.idJuego == id)
      res.json(filtradoId)
  })
  .catch(err => console.log(err))});

module.exports = router;
