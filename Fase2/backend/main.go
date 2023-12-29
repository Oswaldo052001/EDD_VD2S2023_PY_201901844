package main

import (
	"Fase2/estructuras/ArbolB"
	"Fase2/estructuras/peticiones"
	"Fase2/estructuras/tablahash"
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

var tablaEstudiantes *tablahash.TablaHash
var arbolitoB *ArbolB.ArbolB = &ArbolB.ArbolB{Raiz: nil, Orden: 3}

func main() {
	tablaEstudiantes = &tablahash.TablaHash{Tabla: make(map[int]tablahash.NodoHash), Capacidad: 7, Utilizacion: 0}

	app := fiber.New()
	app.Use(cors.New())
	app.Post("/login", Validar)
	app.Post("/CargarEstudiantes", CargarEstudiantes)
	app.Listen(":4000")
}

// -------------------------------------------------------LOGIN-----------------------------------------------------
func Validar(c *fiber.Ctx) error {
	var usuario peticiones.PeticionLogin
	c.BodyParser(&usuario)
	if usuario.UserName == "ADMIN_201901844" {
		//flujo de admin
		if usuario.Password == "admin" {
			return c.JSON(&fiber.Map{
				"status":  200,
				"message": "Credenciales correctas",
				"rol":     1,
			})
		}
	} else {
		if usuario.Tutor {
			//buscar en arbol B
		} else {
			//buscar en tabla hash
			if tablaEstudiantes.Buscar(usuario.UserName, usuario.Password) {
				return c.JSON(&fiber.Map{
					"status":  200,
					"message": "Credenciales correctas",
					"rol":     3,
				})
			}
		}
	}
	return c.JSON(&fiber.Map{
		"status":  400,
		"message": "Credenciales incorrectas",
		"rol":     0,
	})
}

//--------------------------------------------- AGREGAR AL ARBOL B ------------------------------------------------

func AgregarB(c *fiber.Ctx) error {
	fmt.Println("Recibi Solicitud")
	var nuevoElemento peticiones.SolicitudArbolB
	err := c.BodyParser(&nuevoElemento)
	if err != nil {
		return c.JSON(&fiber.Map{
			"status":  400,
			"message": "Error al ingresar ",
		})
	}
	arbolitoB.Insertar(nuevoElemento.Valor)
	return c.JSON(&fiber.Map{
		"status":  200,
		"message": "Valor ingresado",
	})
}

// -------------------------------------------- CARGAR ESTUDIANTES ------------------------------------------------

func CargarEstudiantes(c *fiber.Ctx) error {
	var ingresado peticiones.SolicitarRuta
	err := c.BodyParser(&ingresado)
	fmt.Println(ingresado.Ruta)
	if err != nil {
		return c.JSON(&fiber.Map{
			"status":  400,
			"message": "Error al cargar estudiantes ",
		})
	}
	tablaEstudiantes.LeerCSV(ingresado.Ruta)
	return c.JSON(&fiber.Map{
		"status":  200,
		"message": "Cargado exitosamente",
	})

	/*for i := 0; i < tablaEstudiantes.Capacidad; i++ {
		if usuario, existe := tablaEstudiantes.Tabla[i]; existe {
			fmt.Println("Posicion: ", i, " Carnet: ", usuario.Persona.Carnet)
		}
	}*/
}

// ------------------------------------------------GENERAR REPORTE-------------------------------------------------
func GenerarReporte(c *fiber.Ctx) error {
	fmt.Println("Recibi solicitud")
	var reporte peticiones.SolicitudReporte
	c.BodyParser(&reporte)
	if reporte.Estructura_solicitada == "Arbol B" {
		arbolitoB.Graficar(reporte.Nombre)
		return c.JSON(&fiber.Map{
			"status":  200,
			"message": "Grafica Generada",
		})
	} else {
		return c.JSON(&fiber.Map{
			"status":  400,
			"message": "Error",
		})
	}
}
