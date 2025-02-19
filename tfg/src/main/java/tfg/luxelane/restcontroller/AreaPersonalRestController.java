package tfg.luxelane.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tfg.luxelane.dao.ReservasDao;
import tfg.luxelane.entidades.Reservas;
import tfg.luxelane.entidades.enums.Disponibilidad;
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
}
