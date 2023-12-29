package tablahash

type Estudiante struct {
	Carnet   int
	Nombre   string
	Password string
	Cursos   string
}

type NodoHash struct {
	Llave   int
	Persona *Estudiante
}
