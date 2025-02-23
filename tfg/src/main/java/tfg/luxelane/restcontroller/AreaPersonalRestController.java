package tfg.luxelane.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import tfg.luxelane.dao.ReservasDao;
import tfg.luxelane.entidades.Reservas;
import tfg.luxelane.entidades.Usuario;
import tfg.luxelane.entidades.enums.Disponibilidad;
import tfg.luxelane.entidades.enums.EstadoReserva;
import tfg.luxelane.repositorio.ReservasRepository;

@RestController
@CrossOrigin(origins = "*")
public class AreaPersonalRestController {

	@Autowired
	private ReservasDao reservasService;
	
	@Autowired
	private ReservasRepository reservasRepository;
	
	@GetMapping("/reservas/{id}")
	public List<Reservas> getReservasPorUsuario(@PathVariable Long id) {
		return reservasRepository.findByNotCancelada(id);
	}
	
	@GetMapping("/reservas/todas/{id}")
	public List<Reservas> getTodasReservasPorUsuario(@PathVariable Long id) {
		return reservasService.buscarPorUsuario(id);
	}
	
	@GetMapping("/reservas/confirmadas/{id}")
	public List<Reservas> getReservasConfirmadas(@PathVariable Long id) {
		return reservasRepository.findByConfirmadas(id);
	}
	
	@GetMapping("/reservas/canceladas/{id}")
	public List<Reservas> getReservasCanceladas(@PathVariable Long id) {
		return reservasRepository.findByCanceladas(id);
	}
	
	@GetMapping("/reservas/pendientes/{id}")
	public List<Reservas> getReservasPendientes(@PathVariable Long id) {
		return reservasRepository.findByPendientes(id);
	}
	
	@GetMapping("/reservas/completadas/{id}")
	public List<Reservas> getReservasCompletadas(@PathVariable Long id) {
		return reservasRepository.findByCompletada(id);
	}
	
	@GetMapping("/reserva/verDetalle/{id}")
	public Reservas verDetalle(@PathVariable Long id) {
		return reservasService.buscarPorId(id);
	}
	
	@PutMapping("/cancelarReserva")
	public ResponseEntity<?> cancelarReserva(@RequestParam Long id){
		Reservas reserva = reservasService.buscarPorId(id);
		if (reserva==null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No existe esta reserva");
		} else {
			reserva.setEstado(EstadoReserva.CANCELADA);
			reservasService.actualizar(reserva);
			return ResponseEntity.status(HttpStatus.OK).body("Reserva Cancelada");
		}
	}
}
