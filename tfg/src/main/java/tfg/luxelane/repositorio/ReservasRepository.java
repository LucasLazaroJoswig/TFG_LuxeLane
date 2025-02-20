package tfg.luxelane.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import tfg.luxelane.entidades.Reservas;
import tfg.luxelane.entidades.enums.EstadoReserva;

import java.util.List;

public interface ReservasRepository extends JpaRepository<Reservas, Long> {

	
	@Query("Select r from Reservas r where r.estado != CANCELADA AND r.usuario.id=:usuarioId")
    List<Reservas> findByNotCancelada(Long usuarioId);
	
	@Query("Select r from Reservas r where r.estado = PENDIENTE AND r.usuario.id=:usuarioId")
	List<Reservas> findByPendientes(Long usuarioId);
	
	@Query("Select r from Reservas r where r.estado = CONFIRMADA AND r.usuario.id=:usuarioId")
	List<Reservas> findByConfirmadas(Long usuarioId);
	
	@Query("Select r from Reservas r where r.estado = COMPLETADA AND r.usuario.id=:usuarioId")
	List<Reservas> findByCompletada(Long usuarioId);
	
	@Query("Select r from Reservas r where r.estado = CANCELADA AND r.usuario.id=:usuarioId")
	List<Reservas> findByCanceladas(Long usuarioId);
	
	List<Reservas> findByUsuarioId(Long usuarioId);
	
    List<Reservas> findByCocheId(Long cocheId);

    List<Reservas> findByMotoId(Long motoId);

    List<Reservas> findByChoferId(Long choferId);

    List<Reservas> findByEstado(String estado);
}
