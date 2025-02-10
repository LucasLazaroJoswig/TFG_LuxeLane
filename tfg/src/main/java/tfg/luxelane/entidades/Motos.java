package tfg.luxelane.entidades;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tfg.luxelane.entidades.enums.Disponibilidad;
import tfg.luxelane.entidades.enums.TipoFreno;
import tfg.luxelane.entidades.enums.TipoSuspension;
import tfg.luxelane.entidades.enums.TipoVehiculo;
import tfg.luxelane.entidades.enums.Transmision;

import java.io.Serializable;
import java.util.Objects;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "motos")
public class Motos implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String marca;

    @Column(nullable = false, length = 100)
    private String modelo;

    @Column(nullable = false)
    private int año;

    @Column(nullable = false)
    private double precioPorDia;

    @Column(nullable = false)
    private double precioPorHora;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Disponibilidad disponibilidad;

    // Especificaciones técnicas
    private String tipoMotor;
    private int cilindrada;
    private int potenciaHp;

    @Enumerated(EnumType.STRING)
    private Transmision transmision;

    private double capacidadCombustible;

    // Características del vehículo
    @Enumerated(EnumType.STRING)
    private TipoFreno tipoFrenoDelantero;

    @Enumerated(EnumType.STRING)
    private TipoFreno tipoFrenoTrasero;

    @Enumerated(EnumType.STRING)
    private TipoSuspension tipoSuspension;

    private double capacidadCargaKg;

    // Seguridad
    private boolean abs;
    private boolean controlTraccion;
    private boolean encendidoElectronico;

    // Información adicional
    private String color;
    private int kilometraje;

    @Column(unique = true, nullable = false, length = 20)
    private String placa;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoVehiculo tipoVehiculo;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMarca() {
		return marca;
	}

	public void setMarca(String marca) {
		this.marca = marca;
	}

	public String getModelo() {
		return modelo;
	}

	public void setModelo(String modelo) {
		this.modelo = modelo;
	}

	public int getAño() {
		return año;
	}

	public void setAño(int año) {
		this.año = año;
	}

	public double getPrecioPorDia() {
		return precioPorDia;
	}

	public void setPrecioPorDia(double precioPorDia) {
		this.precioPorDia = precioPorDia;
	}

	public double getPrecioPorHora() {
		return precioPorHora;
	}

	public void setPrecioPorHora(double precioPorHora) {
		this.precioPorHora = precioPorHora;
	}

	public Disponibilidad getDisponibilidad() {
		return disponibilidad;
	}

	public void setDisponibilidad(Disponibilidad disponibilidad) {
		this.disponibilidad = disponibilidad;
	}

	public String getTipoMotor() {
		return tipoMotor;
	}

	public void setTipoMotor(String tipoMotor) {
		this.tipoMotor = tipoMotor;
	}

	public int getCilindrada() {
		return cilindrada;
	}

	public void setCilindrada(int cilindrada) {
		this.cilindrada = cilindrada;
	}

	public int getPotenciaHp() {
		return potenciaHp;
	}

	public void setPotenciaHp(int potenciaHp) {
		this.potenciaHp = potenciaHp;
	}

	public Transmision getTransmision() {
		return transmision;
	}

	public void setTransmision(Transmision transmision) {
		this.transmision = transmision;
	}

	public double getCapacidadCombustible() {
		return capacidadCombustible;
	}

	public void setCapacidadCombustible(double capacidadCombustible) {
		this.capacidadCombustible = capacidadCombustible;
	}

	public TipoFreno getTipoFrenoDelantero() {
		return tipoFrenoDelantero;
	}

	public void setTipoFrenoDelantero(TipoFreno tipoFrenoDelantero) {
		this.tipoFrenoDelantero = tipoFrenoDelantero;
	}

	public TipoFreno getTipoFrenoTrasero() {
		return tipoFrenoTrasero;
	}

	public void setTipoFrenoTrasero(TipoFreno tipoFrenoTrasero) {
		this.tipoFrenoTrasero = tipoFrenoTrasero;
	}

	public TipoSuspension getTipoSuspension() {
		return tipoSuspension;
	}

	public void setTipoSuspension(TipoSuspension tipoSuspension) {
		this.tipoSuspension = tipoSuspension;
	}

	public double getCapacidadCargaKg() {
		return capacidadCargaKg;
	}

	public void setCapacidadCargaKg(double capacidadCargaKg) {
		this.capacidadCargaKg = capacidadCargaKg;
	}

	public boolean isAbs() {
		return abs;
	}

	public void setAbs(boolean abs) {
		this.abs = abs;
	}

	public boolean isControlTraccion() {
		return controlTraccion;
	}

	public void setControlTraccion(boolean controlTraccion) {
		this.controlTraccion = controlTraccion;
	}

	public boolean isEncendidoElectronico() {
		return encendidoElectronico;
	}

	public void setEncendidoElectronico(boolean encendidoElectronico) {
		this.encendidoElectronico = encendidoElectronico;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public int getKilometraje() {
		return kilometraje;
	}

	public void setKilometraje(int kilometraje) {
		this.kilometraje = kilometraje;
	}

	public String getPlaca() {
		return placa;
	}

	public void setPlaca(String placa) {
		this.placa = placa;
	}

	public TipoVehiculo getTipoVehiculo() {
		return tipoVehiculo;
	}

	public void setTipoVehiculo(TipoVehiculo tipoVehiculo) {
		this.tipoVehiculo = tipoVehiculo;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public int hashCode() {
		return Objects.hash(abs, año, capacidadCargaKg, capacidadCombustible, cilindrada, color, controlTraccion,
				disponibilidad, encendidoElectronico, id, kilometraje, marca, modelo, placa, potenciaHp, precioPorDia,
				precioPorHora, tipoFrenoDelantero, tipoFrenoTrasero, tipoMotor, tipoSuspension, tipoVehiculo,
				transmision);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Motos other = (Motos) obj;
		return abs == other.abs && año == other.año
				&& Double.doubleToLongBits(capacidadCargaKg) == Double.doubleToLongBits(other.capacidadCargaKg)
				&& Double.doubleToLongBits(capacidadCombustible) == Double.doubleToLongBits(other.capacidadCombustible)
				&& cilindrada == other.cilindrada && Objects.equals(color, other.color)
				&& controlTraccion == other.controlTraccion && disponibilidad == other.disponibilidad
				&& encendidoElectronico == other.encendidoElectronico && Objects.equals(id, other.id)
				&& kilometraje == other.kilometraje && Objects.equals(marca, other.marca)
				&& Objects.equals(modelo, other.modelo) && Objects.equals(placa, other.placa)
				&& potenciaHp == other.potenciaHp
				&& Double.doubleToLongBits(precioPorDia) == Double.doubleToLongBits(other.precioPorDia)
				&& Double.doubleToLongBits(precioPorHora) == Double.doubleToLongBits(other.precioPorHora)
				&& tipoFrenoDelantero == other.tipoFrenoDelantero && tipoFrenoTrasero == other.tipoFrenoTrasero
				&& Objects.equals(tipoMotor, other.tipoMotor) && tipoSuspension == other.tipoSuspension
				&& tipoVehiculo == other.tipoVehiculo && transmision == other.transmision;
	}

	public Motos(Long id, String marca, String modelo, int año, double precioPorDia, double precioPorHora,
			Disponibilidad disponibilidad, String tipoMotor, int cilindrada, int potenciaHp, Transmision transmision,
			double capacidadCombustible, TipoFreno tipoFrenoDelantero, TipoFreno tipoFrenoTrasero,
			TipoSuspension tipoSuspension, double capacidadCargaKg, boolean abs, boolean controlTraccion,
			boolean encendidoElectronico, String color, int kilometraje, String placa, TipoVehiculo tipoVehiculo) {
		super();
		this.id = id;
		this.marca = marca;
		this.modelo = modelo;
		this.año = año;
		this.precioPorDia = precioPorDia;
		this.precioPorHora = precioPorHora;
		this.disponibilidad = disponibilidad;
		this.tipoMotor = tipoMotor;
		this.cilindrada = cilindrada;
		this.potenciaHp = potenciaHp;
		this.transmision = transmision;
		this.capacidadCombustible = capacidadCombustible;
		this.tipoFrenoDelantero = tipoFrenoDelantero;
		this.tipoFrenoTrasero = tipoFrenoTrasero;
		this.tipoSuspension = tipoSuspension;
		this.capacidadCargaKg = capacidadCargaKg;
		this.abs = abs;
		this.controlTraccion = controlTraccion;
		this.encendidoElectronico = encendidoElectronico;
		this.color = color;
		this.kilometraje = kilometraje;
		this.placa = placa;
		this.tipoVehiculo = tipoVehiculo;
	}

	@Override
	public String toString() {
		return "Motos [id=" + id + ", marca=" + marca + ", modelo=" + modelo + ", año=" + año + ", precioPorDia="
				+ precioPorDia + ", precioPorHora=" + precioPorHora + ", disponibilidad=" + disponibilidad
				+ ", tipoMotor=" + tipoMotor + ", cilindrada=" + cilindrada + ", potenciaHp=" + potenciaHp
				+ ", transmision=" + transmision + ", capacidadCombustible=" + capacidadCombustible
				+ ", tipoFrenoDelantero=" + tipoFrenoDelantero + ", tipoFrenoTrasero=" + tipoFrenoTrasero
				+ ", tipoSuspension=" + tipoSuspension + ", capacidadCargaKg=" + capacidadCargaKg + ", abs=" + abs
				+ ", controlTraccion=" + controlTraccion + ", encendidoElectronico=" + encendidoElectronico + ", color="
				+ color + ", kilometraje=" + kilometraje + ", placa=" + placa + ", tipoVehiculo=" + tipoVehiculo + "]";
	}
    
    
}
