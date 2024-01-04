package main

import (
	"Fase2/estructuras/ArbolB"
	"Fase2/estructuras/ArbolMerkle"
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
var arbolLibros *ArbolMerkle.ArbolMerkle

func main() {
	tablaAlumnos = &tablahash.TablaHash{Tabla: make(map[int]tablahash.NodoHash), Capacidad: 7, Utilizacion: 0}
	listaSimple = &ArbolB.ListaSimple{Inicio: nil, Longitud: 0}
	arbolTutor = &ArbolB.ArbolB{Raiz: nil, Orden: 3}
	grafoCursos = &Grafo.Grafo{Principal: &Grafo.NodoListaAdyacencia{Valor: "ECYS"}}
	arbolLibros = &ArbolMerkle.ArbolMerkle{RaizMerkle: nil, BloqueDeDatos: nil, CantidadBloques: 0}

	app := fiber.New()
	app.Use(cors.New())
	app.Post("/login", Validar)
	//Metodos de administrador
	app.Post("/registrar-alumno", RegistrarAlumno)
	app.Post("/registrar-tutor", RegistrarTutor)
	app.Post("/registrar-cursos", RegistrarCursos)
	app.Get("/tabla-alumnos", TablaAlumnos)
	app.Get("/enviar-libros-admin", ObtenerLibrosAdmin)
	app.Post("/registrar-log", RegistrarDecision)
	app.Get("/finalizar-libros", FinalizarLibros)

	//Metodos del tutor
	app.Post("/registrar-libro", GuardarLibro)
	app.Post("/registrar-publicacion", GuardarPublicacion)

	//Metodos de alumno
	app.Post("/obtener-clases", CursosAlumnos)
	app.Get("/obtener-libros-alumno", ObetnerLibrosAlumno)
	app.Get("/obtener-publi-alumno", ObetnerPublicacionessAlumno)

	//Metodos reportes
	app.Get("/generar-reporte-arbolB", GenerarReporteTutores)
	app.Get("/generar-reporte-merkle", GenerarReporteMerkle)
	app.Get("/generar-reporte-grafo", GenerarReporteCursos)
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
					return c.JSON(&fiber.Map{
						"status":  200,
						"message": "Credenciales correctas",
						"rol":     2,
					})
				}
			}
		} else {
			//buscar en tabla hash
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
	arbolTutor.Insertar(tutor.Carnet, tutor.Nombre, tutor.Curso, SHA256(tutor.Password))
	return c.JSON(&fiber.Map{
		"status": 200,
	})
}

//------------------------------------------------ CARGAR CURSOS ------------------------------------------------

func RegistrarCursos(c *fiber.Ctx) error {
	var cursito peticiones.PeticionCursos
	c.BodyParser(&cursito)
	fmt.Println(cursito)
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
	fmt.Println(libro.Nombre)
	arbolTutor.GuardarLibro(arbolTutor.Raiz.Primero, libro.Nombre, libro.Contenido, libro.Carnet)
	return c.JSON(&fiber.Map{
		"status": 200,
	})
}

//-----------------------------------------------REGISTRAR PUBLICACION ---------------------------------------------

func GuardarPublicacion(c *fiber.Ctx) error {
	var publicacion peticiones.PeticionPublicacion
	c.BodyParser(&publicacion)
	arbolTutor.GuardarPublicacion(arbolTutor.Raiz.Primero, publicacion.Contenido, publicacion.Carnet)
	return c.JSON(&fiber.Map{
		"status": 200,
	})
}

//----------------------------------------------- CONTROL LIBROS --------------------------------------------------

func ObtenerLibrosAdmin(c *fiber.Ctx) error {
	listatemp := &ArbolB.ListaSimple{Inicio: nil, Longitud: 0}
	var libros []ArbolB.Libro
	arbolTutor.VerLibroAdmin(arbolTutor.Raiz.Primero, listatemp)
	if listatemp.Longitud > 0 {
		aux := listatemp.Inicio
		for aux != nil {
			for i := 0; i < len(aux.Tutor.Valor.Libros); i++ {
				if aux.Tutor.Valor.Libros[i].Estado == 1 {
					libros = append(libros, *aux.Tutor.Valor.Libros[i])
				}
			}
			aux = aux.Siguiente
		}

	}
	if len(libros) > 0 {
		return c.JSON(&fiber.Map{
			"status":  200,
			"Arreglo": libros,
		})
	}
	return c.JSON(&fiber.Map{
		"status": 500,
	})
}

func RegistrarDecision(c *fiber.Ctx) error {
	var accion peticiones.PeticionDecision
	c.BodyParser(&accion)
	arbolLibros.AgregarBloque(accion.Accion, accion.Nombre, accion.Tutor)
	if accion.Accion == "Aceptado" {
		arbolTutor.ActualizarLibro(arbolTutor.Raiz.Primero, accion.Nombre, accion.Curso, 2)
		fmt.Println("se acepto el libro")
	} else if accion.Accion == "Rechazado" {
		arbolTutor.ActualizarLibro(arbolTutor.Raiz.Primero, accion.Nombre, accion.Curso, 3)
		fmt.Println("se rechazo el libro")
	}
	return c.JSON(&fiber.Map{
		"status": 200,
	})
}

func FinalizarLibros(c *fiber.Ctx) error {
	arbolLibros.GenerarArbol()
	return c.JSON(&fiber.Map{
		"status": 200,
	})
}

//---------------------------------------------- INFORMACIÓN ALUMNO -----------------------------------------------

func CursosAlumnos(c *fiber.Ctx) error {
	var alumno peticiones.PeticionAlumnoSesion
	c.BodyParser(&alumno)
	busqueda := tablaAlumnos.BuscarSesion(alumno.Carnet)
	if busqueda != nil {
		return c.JSON(&fiber.Map{
			"status":  200,
			"Arreglo": busqueda.Cursos,
		})
	}
	return c.JSON(&fiber.Map{
		"status": 500,
	})
}

func ObetnerLibrosAlumno(c *fiber.Ctx) error {
	listatemp := &ArbolB.ListaSimple{Inicio: nil, Longitud: 0}
	var libros []ArbolB.Libro
	arbolTutor.VerLibroAdmin(arbolTutor.Raiz.Primero, listatemp)
	if listatemp.Longitud > 0 {
		aux := listatemp.Inicio
		for aux != nil {
			for i := 0; i < len(aux.Tutor.Valor.Libros); i++ {
				if aux.Tutor.Valor.Libros[i].Estado == 2 {
					libros = append(libros, *aux.Tutor.Valor.Libros[i])
				}
			}
			aux = aux.Siguiente
		}

	}
	if len(libros) > 0 {
		return c.JSON(&fiber.Map{
			"status":  200,
			"Arreglo": libros,
		})
	}
	return c.JSON(&fiber.Map{
		"status": 500,
	})
}

func ObetnerPublicacionessAlumno(c *fiber.Ctx) error {
	listatemp := &ArbolB.ListaSimple{Inicio: nil, Longitud: 0}
	var publi []ArbolB.Publicacion
	arbolTutor.VerLibroAdmin(arbolTutor.Raiz.Primero, listatemp)
	if listatemp.Longitud > 0 {
		aux := listatemp.Inicio
		for aux != nil {
			for i := 0; i < len(aux.Tutor.Valor.Publicaciones); i++ {
				publi = append(publi, *aux.Tutor.Valor.Publicaciones[i])
			}
			aux = aux.Siguiente
		}

	}
	if len(publi) > 0 {
		return c.JSON(&fiber.Map{
			"status":  200,
			"Arreglo": publi,
		})
	}
	return c.JSON(&fiber.Map{
		"status": 500,
	})
}

// ------------------------------------------------GENERAR REPORTE-------------------------------------------------

func GenerarReporteTutores(c *fiber.Ctx) error {
	arbolTutor.Graficar("ReporteTutores")
	return c.JSON(&fiber.Map{
		"status": 200,
	})
}

func GenerarReporteMerkle(c *fiber.Ctx) error {
	arbolLibros.Graficar("ReporteArbolMerkle")
	return c.JSON(&fiber.Map{
		"status": 200,
	})
}

func GenerarReporteCursos(c *fiber.Ctx) error {
	grafoCursos.Graficar("ReporteCursos")
	return c.JSON(&fiber.Map{
		"status": 200,
	})
}
