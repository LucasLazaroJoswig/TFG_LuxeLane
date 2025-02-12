package tfg.luxelane.dao;

import tfg.luxelane.entidades.Coches;
import java.util.List;

public interface CochesDao {

	List<Coches> buscarTodos();
	
    Coches buscarPorId(Long id);

    List<Coches> buscarPorMarca(String marca);

    List<Coches> buscarPorDisponibilidad(String disponibilidad);

    List<Coches> buscarPorTipoVehiculo(String tipoVehiculo);

    void guardar(Coches coche);

    void actualizar(Coches coche);

    void eliminar(Long id);
}
