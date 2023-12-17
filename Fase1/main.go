package main

import (
	"Proyecto/Fase1/estructuras/ArbolAVL"
	"Proyecto/Fase1/estructuras/ColaPrioridad"
	"Proyecto/Fase1/estructuras/Listas"
	"Proyecto/Fase1/estructuras/MatrizDispersa"
	"fmt"
	"os"
	"os/exec"
	"strconv"
)

var listaDobleCircular *Listas.ListaDobleCircular = &Listas.ListaDobleCircular{Inicio: nil, Longitud: 0}
var listaDoble *Listas.ListaDoble = &Listas.ListaDoble{Inicio: nil, Longitud: 0}
var colaPrioridad *ColaPrioridad.Cola = &ColaPrioridad.Cola{Primero: nil, Longitud: 0}
var matrizDispersa *MatrizDispersa.Matriz = &MatrizDispersa.Matriz{Raiz: &MatrizDispersa.NodoMatriz{PosX: -1, PosY: -1, Dato: &MatrizDispersa.Dato{Carnet_Tutor: 0, Carnet_Estudiante: 0, Curso: "RAIZ"}}, Cantidad_Alumnos: 0, Cantidad_Tutores: 0}
var arbolCursos *ArbolAVL.ArbolAVL = &ArbolAVL.ArbolAVL{Raiz: nil}

var loggeado_estudiante string = ""

func main() {
	limpiar()
	opcion := 0
	salir := false

	for !salir {
		fmt.Println("╔═══════════════════════╗")
		fmt.Println("║ 1. Inicio de Sesion   ║")
		fmt.Println("║ 2. Salir              ║")
		fmt.Println("╚═══════════════════════╝")

		fmt.Scanln(&opcion)
		switch opcion {
		case 1:
			MenuLogin()
		case 2:
			salir = true
		}
	}
}

func MenuLogin() {
	limpiar()
	usuario := ""
	password := ""
	fmt.Println("═════════════════════════════")
	fmt.Print("► Usuario: ")
	fmt.Scanln(&usuario)
	fmt.Print("► Password: ")
	fmt.Scanln(&password)
	fmt.Println("═════════════════════════════")

	//if usuario == "ADMIN_201901844" && password == "admin" {
	if usuario == "a" && password == "a" {
		limpiar()
		fmt.Println("En sesión: Administrador")
		MenuAdmin()
	} else if listaDoble.Buscar(usuario, password) {
		limpiar()
		fmt.Println("En sesión: ", usuario)
		loggeado_estudiante = usuario
		MenuEstudiantes()
	} else {
		limpiar()
		fmt.Println(" ¡Credenciales no encontrados, vuelva a intentarlo! ")
	}
}

func MenuAdmin() {
	limpiar()
	opcion := 0
	salir := false
	for !salir {

		fmt.Println("╔═════════════════════════════════╗")
		fmt.Println("║ 1. Carga de Estudiantes Tutores ║")
		fmt.Println("║ 2. Carga de Estudiantes         ║")
		fmt.Println("║ 3. Cargar de Cursos             ║")
		fmt.Println("║ 4. Control de Estudiantes       ║")
		fmt.Println("║ 5. Reportes                     ║")
		fmt.Println("║ 6. Salir                        ║")
		fmt.Println("╚═════════════════════════════════╝")
		fmt.Scanln(&opcion)
		switch opcion {
		case 1:
			CargaTutores()
		case 2:
			CargaEstudiantes()
		case 3:
			CargaCursos()
		case 4:
			ControlEstudiantes()
			limpiar()
		case 5:
			fmt.Println("Mis Reportes")
		case 6:
			salir = true
			limpiar()
		}
	}
}

func MenuEstudiantes() {
	limpiar()
	opcion := 0
	salir := false
	for !salir {
		fmt.Println("\n1. Ver Tutores Disponibles")
		fmt.Println("2. Asignarse Tutores")
		fmt.Println("3. Salir")
		fmt.Scanln(&opcion)
		switch opcion {
		case 1:
			fmt.Print("\033[H\033[2J")
			listaDobleCircular.Imprimir()
		case 2:
			fmt.Print("\033[H\033[2J")
			AsignarCurso()
		case 3:
			fmt.Print("\033[H\033[2J")
			salir = true
		}
	}
}
func AsignarCurso() {
	opcion := ""
	salir := false
	for !salir {
		fmt.Println("Teclee el codigo del curso: ")
		fmt.Scanln(&opcion)
		limpiar()
		if arbolCursos.Busqueda(opcion) {
			if listaDobleCircular.Buscar(opcion) {
				TutorBuscado := listaDobleCircular.BuscarTutor(opcion)
				estudiante, err := strconv.Atoi(loggeado_estudiante)
				if err != nil {
					break
				}
				matrizDispersa.Insertar_Elemento(estudiante, TutorBuscado.Tutor.Carnet, opcion)
				fmt.Println("Se asigno Correctamente....")
				break
			} else {
				fmt.Println("No hay tutores para ese curso....")
				break
			}
		} else {
			fmt.Println("El curso no existe en el sistema")
			break
		}

	}
}

func CargaTutores() {
	limpiar()
	ruta := ""
	fmt.Print("Escriba la ruta del archivo de tutores (.csv): ")
	fmt.Scanln(&ruta)
	colaPrioridad.LeerCSV(ruta)
}

func CargaEstudiantes() {
	limpiar()
	ruta := ""
	fmt.Print("Escriba la ruta del archivo de estudiantes (.csv): ")
	fmt.Scanln(&ruta)
	listaDoble.LeerCSV(ruta)
}

func CargaCursos() {
	limpiar()
	ruta := ""
	fmt.Print("Escriba la ruta del archivo de cursos (.json): ")
	fmt.Scanln(&ruta)
	arbolCursos.LeerJson(ruta)
}

func ControlEstudiantes() {
	limpiar()
	opcion := 0
	salir := false

	for !salir {

		colaPrioridad.Primero_Cola()
		fmt.Println("    1. Aceptar")
		fmt.Println("    2. Rechazar")
		fmt.Println("    3. Salir")
		fmt.Scanln(&opcion)

		if opcion == 1 {
			if colaPrioridad.Longitud != 0 {
				limpiar()
				listaDobleCircular.Agregar(colaPrioridad.Primero.Tutor.Carnet, colaPrioridad.Primero.Tutor.Nombre, colaPrioridad.Primero.Tutor.Curso, colaPrioridad.Primero.Tutor.Nota)
				colaPrioridad.Descolar()
			}
		} else if opcion == 2 {
			colaPrioridad.Descolar()
		} else if opcion == 3 {
			salir = true
		} else {
			fmt.Println("Opcion invalida")
		}
	}
}

func limpiar() {
	cmd := exec.Command("cmd", "/c", "cls")
	cmd.Stdout = os.Stdout
	cmd.Run()
}
