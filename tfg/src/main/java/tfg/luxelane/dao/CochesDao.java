package tfg.luxelane.dao;

import tfg.luxelane.entidades.Coches;
import tfg.luxelane.entidades.enums.Disponibilidad;

import java.util.List;

public interface CochesDao {
    Coches findById(Long id);
    List<Coches> findByDisponibilidad(Disponibilidad disponibilidad);
    List<Coches> findAll();
    void save(Coches coche);
    void update(Coches coche);
    void delete(Long id);
}
