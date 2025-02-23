package tfg.luxelane.dao;

import tfg.luxelane.entidades.Coches;
import tfg.luxelane.entidades.Motos;
import tfg.luxelane.entidades.enums.Disponibilidad;

import java.util.List;

public interface MotosDao {

	List<Motos> buscarTodos();

    Motos buscarPorId(Long id);

    List<Motos> buscarPorMarca(String marca);

    List<Motos> buscarPorDisponibilidad(Disponibilidad disponibilidad);

    Motos buscarPorMatricula(String matricula);

    boolean guardar(Motos moto);

    boolean actualizar(Motos moto);

    void eliminar(Long id);
}
