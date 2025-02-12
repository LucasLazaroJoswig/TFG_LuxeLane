package tfg.luxelane.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import tfg.luxelane.dao.UsuarioDao;
import tfg.luxelane.entidades.Usuario;
import tfg.luxelane.entidades.enums.Rol;


@RestController
@CrossOrigin(origins = "*")
public class UsuarioRestController {
	
	@Autowired
	private UsuarioDao userService;
	
	
	@PostMapping("/login")
	public boolean login(@RequestParam String correo, @RequestParam String contrasena){
		if (userService.login(correo, contrasena)!=null) {
			return true;
		} else {
			return false;
		}
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> registro(@RequestParam String correo, @RequestParam String nombre, @RequestParam String apellidos,
	                                  @RequestParam String contrasena, @RequestParam String telefono) {


	    if (userService.buscarPorCorreo(correo) != null) {

	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El correo electrónico ya está registrado.");
	    }

	    Usuario user = new Usuario(null, nombre, apellidos, correo, contrasena, telefono);
	    user.setRol(Rol.REGISTRADO);
	    user.setEnabled("S");
	    

	    userService.guardar(user);
	    

	    return ResponseEntity.status(HttpStatus.OK).body(1);
	}

}
