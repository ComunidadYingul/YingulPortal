export class Cotizar{
private cotizarId:string="";

private  provincia:string="";
private  localidad:string="";
private  codigo_postal:string="";
private  peso:string="";
private  volumen:string="";
private  bultos:string="";
private  paquetes:string="";
private  correo:string="";
private  modalidad:string="";
private  servicio:string="";
private  direccion_envio:string="";
private  orden_columna:string="";
private  orden_sentido:string="";
private  itemID:string;
private  codAndreani:string="";

public   ordenColumnaAsce ="asc";
public   ordenColumnaDesc="desc";
public   modalidadEnvioDomicilio="D";
public   modalidadEnvioSucursal="S";
public   servicioEstandar="N";
public   servicioPrioritario="";
public   servicioExpres="X";
public   servicioDevoluciones="R";
public   ordenColumnaValor="valor";
public   ordenColumnaHorasEntrega="horas_entrega";
public   ordenColumnaCumplimiento="cumplimiento";
public   ordenColumnaAnomalos="anomalos";


	public get $codAndreani(): string {
		return this.codAndreani;
	}

	public set $codAndreani(value: string) {
		this.codAndreani = value;
	}



	public get $cotizarId(): string {
		return this.cotizarId;
	}

	public set $cotizarId(value: string) {
		this.cotizarId = value;
	}



	public get $itemID(): string {
		return this.itemID;
	}

	public set $itemID(value: string) {
		this.itemID = value;
	}


	public get $provincia(): string {
		return this.provincia;
	}

	public set $provincia(value: string) {
		this.provincia = value;
	}

	public get $localidad(): string {
		return this.localidad;
	}

	public set $localidad(value: string) {
		this.localidad = value;
	}

	public get $codigo_postal(): string {
		return this.codigo_postal;
	}

	public set $codigo_postal(value: string) {
		this.codigo_postal = value;
	}

	public get $volumen(): string {
		return this.volumen;
	}

	public set $volumen(value: string) {
		this.volumen = value;
	}

	public get $paquetes(): string {
		return this.paquetes;
	}

	public set $paquetes(value: string) {
		this.paquetes = value;
	}

	public get $modalidad(): string {
		return this.modalidad;
	}

	public set $modalidad(value: string) {
		this.modalidad = value;
	}

	public get $peso(): string {
		return this.peso;
	}

	public set $peso(value: string) {
		this.peso = value;
	}

	public get $bultos(): string {
		return this.bultos;
	}

	public set $bultos(value: string) {
		this.bultos = value;
    }
    

	public get $correo(): string {
		return this.correo;
	}

	public set $correo(value: string) {
		this.correo = value;
	}

	public get $servicio(): string {
		return this.servicio;
	}

	public set $servicio(value: string) {
		this.servicio = value;
	}

	public get $direccion_envio(): string {
		return this.direccion_envio;
	}

	public set $direccion_envio(value: string) {
		this.direccion_envio = value;
	}

	public get $orden_columna(): string {
		return this.orden_columna;
	}

	public set $orden_columna(value: string) {
		this.orden_columna = value;
	}

	public get $orden_sentido(): string {
		return this.orden_sentido;
	}

	public set $orden_sentido(value: string) {
		this.orden_sentido = value;
	}
    

}