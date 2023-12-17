package Listas

type NodoListaDoble struct {
	Alumno    *Alumno
	Siguiente *NodoListaDoble
	Anterior  *NodoListaDoble
}

type NodoListaCircular struct {
	Tutor     *Tutores
	Siguiente *NodoListaCircular
	Anterior  *NodoListaCircular
}
