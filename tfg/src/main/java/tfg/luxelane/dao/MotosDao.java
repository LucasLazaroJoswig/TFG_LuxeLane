package tfg.luxelane.dao;

import tfg.luxelane.entidades.Motos;
import tfg.luxelane.entidades.enums.Disponibilidad;

import java.util.List;

public interface MotosDao {

	List<Motos> buscarTodos();

    Motos buscarPorId(Long id);

    List<Motos> buscarPorMarca(String marca);

    List<Motos> buscarPorDisponibilidad(Disponibilidad disponibilidad);


    void guardar(Motos moto);

    void actualizar(Motos moto);

    void eliminar(Long id);
}
