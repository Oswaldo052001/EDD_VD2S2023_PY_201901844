package ColaPrioridad

type NodoCola struct {
	Tutor     *Tutores
	Siguiente *NodoCola
	Prioridad int
}
