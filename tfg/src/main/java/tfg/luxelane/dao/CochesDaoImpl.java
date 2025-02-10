package tfg.luxelane.dao;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;
import tfg.luxelane.entidades.Coche;
import tfg.luxelane.entidades.Coches;
import tfg.luxelane.entidades.enums.Disponibilidad;

import java.util.List;

@Repository
@Transactional
public class CochesDaoImpl implements CochesDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Coches findById(Long id) {
        return entityManager.find(Coches.class, id);
    }

    @Override
    public List<Coches> findByDisponibilidad(Disponibilidad disponibilidad) {
        return entityManager.createQuery("SELECT c FROM Coche c WHERE c.disponibilidad = :disponibilidad", Coche.class)
                .setParameter("disponibilidad", disponibilidad)
                .getResultList();
    }

    @Override
    public List<Coches> findAll() {
        return entityManager.createQuery("SELECT c FROM Coche c", Coches.class).getResultList();
    }

    @Override
    public void save(Coches coche) {
        entityManager.persist(coche);
    }

    @Override
    public void update(Coches coche) {
        entityManager.merge(coche);
    }

    @Override
    public void delete(Long id) {
        Coches coche = findById(id);
        if (coche != null) {
            entityManager.remove(coche);
        }
    }

	@Override
	public void save(Coches coche) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void update(Coches coche) {
		// TODO Auto-generated method stub
		
	}
}
