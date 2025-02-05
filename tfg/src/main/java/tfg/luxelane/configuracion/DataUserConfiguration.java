package tfg.luxelane.configuracion;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
@Configuration
public class DataUserConfiguration{
	
	@Bean

	public UserDetailsManager usersCustom(DataSource dataSource) {

	JdbcUserDetailsManager users = 
			new JdbcUserDetailsManager(dataSource); 
	users.setUsersByUsernameQuery("select correo,contraseña,enabled from Usuarios u where correo=?"); 
	users.setAuthoritiesByUsernameQuery("select u.correo, u.rol from Usuarios " +
			"where u.correo = ?");

	return users;

	}
	
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		http
		.csrf(csrf -> csrf.disable());
		// Los recursos estáticos no requieren autenticación
		http.authorizeHttpRequests(authorize -> authorize
			// Las vistas públicas no requieren autenticación
			.requestMatchers("/registro","/", "/login", "/logout","/menu", "/eventos/ver/**", "/invitado","/evento/**","/eventos/buscar").permitAll()
	//		.requestMatchers("/rest/encriptar/**").permitAll()
			// Todas las demás URLs de la Aplicación requieren autenticación
			// Asignar permisos a URLs por ROLES
	 		.requestMatchers("/eventos/alta").hasAnyAuthority("ROLE_ADMINISTRADOR")
			.requestMatchers("/eventos/modificar/**").hasAnyAuthority("ROLE_ADMINISTRADOR")
			.requestMatchers("/eventos/eliminar/**").hasAnyAuthority("ROLE_ADMINISTRADOR")
			.requestMatchers("/eventos/eliminar/**").hasAnyAuthority("ROLE_ADMINISTRADOR")
			.requestMatchers("/perfiles/**").hasAnyAuthority("ROLE_ADMINISTRADOR")
			.requestMatchers("/tipos/**").hasAnyAuthority("ROLE_ADMINISTRADOR")
			.requestMatchers("/admin/**").hasAnyAuthority("ROLE_ADMINISTRADOR")
			.requestMatchers("/reservas/**").hasAnyAuthority("ROLE_CLIENTE")
			.requestMatchers("/eventos/quitarDestacado/**").hasAnyAuthority("ROLE_ADMINISTRADOR")
			.anyRequest().authenticated())
		// El formulario de Login no requiere autenticacion
		.formLogin(form -> form
				.loginPage("/login")
				.defaultSuccessUrl("/inicioSesion",true)
				.failureUrl("/loginError")
				.permitAll())
		.exceptionHandling()
        	.accessDeniedPage("/login");
		return http.build();
	}
		
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
/**
	@Bean
	public InMemoryUserDetailsManager usersdetails() throws Exception{
		List<UserDetails> users=List.of(
				User
				.withUsername("user1")
				//.password("$2a$12$YUq1fO2Vbz.ONbIo./xmBeGCYFr5m4OLNC8H9HFafn4fpcOnUbqda")
				.password("{noop}user1")
				.roles("USERS")
				.build(),
				User
				.withUsername("user2")
				.password("{noop}user2")
				.roles("OPERATOR")
				.build(),
				User
				.withUsername("admin")
				.password("{noop}admin")
				.roles("USERS","ADMIN")
				.build());		
		return new InMemoryUserDetailsManager(users);					
	}**/
	
	

}
