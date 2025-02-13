package tfg.luxelane.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import tfg.luxelane.entidades.Usuario;
import tfg.luxelane.entidades.enums.Rol;
import tfg.luxelane.service.UserService;

@RestController
@CrossOrigin(origins = "*")
public class UsuarioRestController {
	
	@Autowired
	private UserService userService;
	
	
	@PostMapping("/login")
	public boolean login(@RequestParam String correo, @RequestParam String contrasena){
		if (userService.login(correo, contrasena)!=null) {
			return true;
		} else {
			return false;
		}
	}
	
	@PostMapping("/register")
	public int registro(@RequestParam String correo, @RequestParam String nombre, @RequestParam String apellidos
			,@RequestParam String contrasena, @RequestParam String telefono) {
		Usuario user = new Usuario(null, nombre, apellidos, correo, contrasena, telefono);
		 return userService.alta(user);
	}
}
