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

@RestController
@CrossOrigin(origins = "*")
public class AreaPersonalRestController {

	@Autowired
	private ReservasDao reservasService;
	
	@GetMapping("/reservas/{id}")
	public List<Reservas> getReservasPorUsuario(@PathVariable Long id) {
		return reservasService.buscarPorUsuario(id);
	}
}
