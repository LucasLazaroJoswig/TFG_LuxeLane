package tfg.luxelane.entidades;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tfg.luxelane.entidades.enums.EstadoReserva;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "reservas")
public class Reservas implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "coche_id")
    private Coches coche;

    @ManyToOne
    @JoinColumn(name = "moto_id")
    private Motos moto;

    @ManyToOne
    @JoinColumn(name = "chofer_id")
    private Usuario chofer;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "fecha_inicio", nullable = false)
    private Date fechaInicio;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "fecha_fin", nullable = false)
    private Date fechaFin;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoReserva estado;

    @Column(name = "precio_total", nullable = false)
    private double precioTotal;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public Coches getCoche() {
		return coche;
	}

	public void setCoche(Coches coche) {
		this.coche = coche;
	}

	public Motos getMoto() {
		return moto;
	}

	public void setMoto(Motos moto) {
		this.moto = moto;
	}

	public Usuario getChofer() {
		return chofer;
	}

	public void setChofer(Usuario chofer) {
		this.chofer = chofer;
	}

	public Date getFechaInicio() {
		return fechaInicio;
	}

	public void setFechaInicio(Date fechaInicio) {
		this.fechaInicio = fechaInicio;
	}

	public Date getFechaFin() {
		return fechaFin;
	}

	public void setFechaFin(Date fechaFin) {
		this.fechaFin = fechaFin;
	}

	public EstadoReserva getEstado() {
		return estado;
	}

	public void setEstado(EstadoReserva estado) {
		this.estado = estado;
	}

	public double getPrecioTotal() {
		return precioTotal;
	}

	public void setPrecioTotal(double precioTotal) {
		this.precioTotal = precioTotal;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	

	@Override
	public String toString() {
		return "Reservas [id=" + id + ", usuario=" + usuario + ", coche=" + coche + ", moto=" + moto + ", chofer="
				+ chofer + ", fechaInicio=" + fechaInicio + ", fechaFin=" + fechaFin + ", estado=" + estado
				+ ", precioTotal=" + precioTotal + "]";
	}
    
    
}
