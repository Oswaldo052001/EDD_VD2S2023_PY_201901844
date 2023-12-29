package peticiones

type SolicitudArbolB struct {
	Valor int `json:"valor"`
}

type SolicitudReporte struct {
	Nombre                string `json:"nombre"`
	Estructura_solicitada string `json:"estructura"`
}

type PeticionLogin struct {
	UserName string `json:"userName"`
	Password string `json:"password"`
	Tutor    bool   `json:"tutor"`
}

type SolicitarRuta struct {
	Ruta string `json:"ruta"`
}
