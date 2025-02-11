package tfg.luxelane.service;

import java.util.List;

import tfg.luxelane.entidades.Coches;
import tfg.luxelane.entidades.Motos;

public interface MotoService {

	Motos alta(Motos moto);
	int modificar(Motos moto);
	Motos buscarUno(long id);
	List<Motos> buscarTodos();
}
