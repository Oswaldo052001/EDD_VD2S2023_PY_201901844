package main

import (
	"Fase2/estructuras/ArbolB"
	"Fase2/estructuras/Grafo"
	"Fase2/estructuras/peticiones"
	"Fase2/estructuras/tablahash"
	"crypto/sha256"
	"encoding/hex"
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

var tablaAlumnos *tablahash.TablaHash
var listaSimple *ArbolB.ListaSimple
var arbolTutor *ArbolB.ArbolB
var grafoCursos *Grafo.Grafo

func main() {
	tablaAlumnos = &tablahash.TablaHash{Tabla: make(map[int]tablahash.NodoHash), Capacidad: 7, Utilizacion: 0}
	listaSimple = &ArbolB.ListaSimple{Inicio: nil, Longitud: 0}
	arbolTutor = &ArbolB.ArbolB{Raiz: nil, Orden: 3}
	grafoCursos = &Grafo.Grafo{Principal: &Grafo.NodoListaAdyacencia{Valor: "ECYS"}}

	app := fiber.New()
	app.Use(cors.New())
	app.Post("/login", Validar)
	app.Post("/registrar-alumno", RegistrarAlumno)
	app.Post("/registrar-tutor", RegistrarTutor)
	app.Post("/registrar-cursos", RegistrarCursos)
	app.Get("/tabla-alumnos", TablaAlumnos)
	app.Post("/registrar-libro", GuardarLibro)
	app.Post("/registrar-publicacion", GuardarPublicacion)
	app.Get("/generar-reporte-arbolB", GenerarReporteTutores)
	app.Listen(":4000")
}

// -------------------------------------------------------LOGIN-----------------------------------------------------
func Validar(c *fiber.Ctx) error {
	var usuario peticiones.PeticionLogin
	listaSimple = &ArbolB.ListaSimple{Inicio: nil, Longitud: 0}
	c.BodyParser(&usuario)
	if usuario.UserName == "ADMIN_201901844" {
		if usuario.Password == "admin" {
			return c.JSON(&fiber.Map{
				"status":  200,
				"message": "Credenciales correctas",
				"rol":     1,
			})
		}
	} else {
		if usuario.Tutor {
			arbolTutor.Buscar(usuario.UserName, listaSimple)
			if listaSimple.Longitud > 0 {
				if listaSimple.Inicio.Tutor.Valor.Password == SHA256(usuario.Password) {
					fmt.Println("entro")
					return c.JSON(&fiber.Map{
						"status":  200,
						"message": "Credenciales correctas",
						"rol":     2,
					})
				}
			}
		} else {
			if tablaAlumnos.Buscar(usuario.UserName, SHA256(usuario.Password)) {
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

// -------------------------------------------- CARGAR ESTUDIANTES ------------------------------------------------

func RegistrarAlumno(c *fiber.Ctx) error {
	var alumno peticiones.PeticionRegistroAlumno
	c.BodyParser(&alumno)
	//fmt.Println(alumno)
	tablaAlumnos.Insertar(alumno.Carnet, alumno.Nombre, SHA256(alumno.Password), alumno.Cursos) //alumno.Cursos
	return c.JSON(&fiber.Map{
		"status":  200,
		"Arreglo": tablaAlumnos.ConvertirArreglo(),
	})
}

func TablaAlumnos(c *fiber.Ctx) error {
	return c.JSON(&fiber.Map{
		"status":  200,
		"Arreglo": tablaAlumnos.ConvertirArreglo(),
	})
}

//------------------------------------------------ CARGAR TUTORES ------------------------------------------------

func RegistrarTutor(c *fiber.Ctx) error {
	var tutor peticiones.PeticionRegistroTutor
	c.BodyParser(&tutor)
	//fmt.Println(tutor)
	arbolTutor.Insertar(tutor.Carnet, tutor.Nombre, tutor.Curso, SHA256(tutor.Password))
	return c.JSON(&fiber.Map{
		"status": 200,
	})
}

func GenerarReporteTutores(c *fiber.Ctx) error {
	arbolTutor.Graficar("ReporteTutores")
	return c.JSON(&fiber.Map{
		"status": 200,
	})
}

//------------------------------------------------ CARGAR CURSOS ------------------------------------------------

func RegistrarCursos(c *fiber.Ctx) error {
	var cursito peticiones.PeticionCursos
	c.BodyParser(&cursito)
	//fmt.Println(cursito)
	for _, curso := range cursito.Cursos {
		if len(curso.Post) > 0 {
			for j := 0; j < len(curso.Post); j++ {
				grafoCursos.InsertarValores(curso.Codigo, curso.Post[j])
			}
		} else {
			grafoCursos.InsertarValores("ECYS", curso.Codigo)
		}
	}
	return c.JSON(&fiber.Map{
		"status": 200,
	})
}

// -------------------------------------------------ENCRIPTAR CONTRASEÑA--------------------------------------------
func SHA256(cadena string) string {
	hexaString := ""
	h := sha256.New()
	h.Write([]byte(cadena))
	hexaString = hex.EncodeToString(h.Sum(nil))
	return hexaString
}

//--------------------------------------------------REGISTRAR LIBRO------------------------------------------------

func GuardarLibro(c *fiber.Ctx) error {
	var libro peticiones.PeticionLibro
	c.BodyParser(&libro)
	//fmt.Println(libro)
	arbolTutor.GuardarLibro(arbolTutor.Raiz.Primero, libro.Nombre, libro.Contenido, libro.Carnet)
	return c.JSON(&fiber.Map{
		"status": 200,
	})
}

//-----------------------------------------------REGISTRAR PUBLICACION ---------------------------------------------

func GuardarPublicacion(c *fiber.Ctx) error {
	var publicacion peticiones.PeticionPublicacion
	c.BodyParser(&publicacion)
	fmt.Println(publicacion)
	arbolTutor.GuardarPublicacion(arbolTutor.Raiz.Primero, publicacion.Contenido, publicacion.Carnet)
	return c.JSON(&fiber.Map{
		"status": 200,
	})
}

// ------------------------------------------------GENERAR REPORTE-------------------------------------------------
/*func GenerarReporte(c *fiber.Ctx) error {
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
}*/
