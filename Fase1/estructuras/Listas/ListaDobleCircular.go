package Listas

import "fmt"

type ListaDobleCircular struct {
	Inicio   *NodoListaCircular
	Longitud int
}

func (l *ListaDobleCircular) Agregar(carnet int, nombre string, curso string, nota int) {
	nuevoTutor := &Tutores{Carnet: carnet, Nombre: nombre, Curso: curso, Nota: nota}
	nuevoNodo := &NodoListaCircular{Tutor: nuevoTutor, Siguiente: nil, Anterior: nil}

	if l.Longitud == 0 {
		l.Inicio = nuevoNodo
		l.Inicio.Anterior = nuevoNodo
		l.Inicio.Siguiente = nuevoNodo
		l.Longitud++
		fmt.Println(" -► -► Se agregó correctamente")
	} else {
		aux := l.Inicio
		contador := 1

		for contador <= l.Longitud {
			//Si el curso de un tutor ya existe
			if aux.Tutor.Curso == curso {
				//Si la nota del nuevo tutor es mayor que el tutor que ya esta asignado se debe de colocar el mayor
				if nota > aux.Tutor.Nota {
					if aux == l.Inicio {
						l.Inicio = nuevoNodo
					}
					fmt.Println("-► -► Se sustituyó tutor del curso: ", curso)
					nuevoNodo.Siguiente = aux.Siguiente
					nuevoNodo.Anterior = aux.Anterior
					aux.Anterior.Siguiente = nuevoNodo
					aux.Siguiente.Anterior = nuevoNodo
					return
				} else {
					fmt.Println("-► -► Ya existe un tutor del curso: ", curso)
					return
				}
			}
			contador++
			aux = aux.Siguiente
		}

		aux = l.Inicio
		contador = 1

		for contador < l.Longitud {
			if l.Inicio.Tutor.Carnet > carnet {
				nuevoNodo.Siguiente = l.Inicio
				nuevoNodo.Anterior = l.Inicio.Anterior
				l.Inicio.Anterior = nuevoNodo
				l.Inicio = nuevoNodo
				l.Longitud++
				fmt.Println(" -► -► Se agregó correctamente")
				return
			}
			if aux.Tutor.Carnet < carnet {
				aux = aux.Siguiente
			} else {
				nuevoNodo.Anterior = aux.Anterior
				aux.Anterior.Siguiente = nuevoNodo
				nuevoNodo.Siguiente = aux
				aux.Anterior = nuevoNodo
				l.Longitud++
				fmt.Println(" -► -► Se agregó correctamente")
				return
			}
			contador++
		}
		if aux.Tutor.Carnet > carnet {
			nuevoNodo.Siguiente = aux
			nuevoNodo.Anterior = aux.Anterior
			aux.Anterior.Siguiente = nuevoNodo
			aux.Anterior = nuevoNodo
			l.Longitud++
			fmt.Println(" -► -► Se agregó correctamente")
			return
		}
		nuevoNodo.Anterior = aux
		nuevoNodo.Siguiente = l.Inicio
		aux.Siguiente = nuevoNodo
		l.Inicio.Anterior = nuevoNodo
		l.Longitud++
		fmt.Println(" -► -► Se agregó correctamente")
	}
}

func (c *ListaDobleCircular) Imprimir() {
	if c.Longitud != 0 {
		contador := 1
		aux := c.Inicio
		for contador <= c.Longitud {
			fmt.Println("------------------------------------------------")
			fmt.Println(aux.Tutor.Curso, " -> ", aux.Tutor.Nombre)
			fmt.Println("------------------------------------------------")
			aux = aux.Siguiente
			contador++
		}
	}
}

func (l *ListaDobleCircular) Buscar(curso string) bool {
	if l.Longitud == 0 {
		return false
	} else {
		aux := l.Inicio
		contador := 1
		for l.Longitud >= contador {
			if aux.Tutor.Curso == curso {
				return true
			}
			aux = aux.Siguiente
			contador++
		}
	}
	return false
}

func (l *ListaDobleCircular) BuscarTutor(curso string) *NodoListaCircular {
	aux := l.Inicio
	contador := 1
	for l.Longitud >= contador {
		if aux.Tutor.Curso == curso {
			return aux
		}
		aux = aux.Siguiente
		contador++
	}
	return nil
}

