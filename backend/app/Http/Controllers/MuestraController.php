<?php

namespace App\Http\Controllers;

use App\Helpers\JwtAuth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Muestra;

class MuestraController extends Controller
{
    public function index(Request $request){
        $hash = $request->header('Authorization', null);

        $jwtAuth = new JwtAuth();
        $checkToken = $jwtAuth->checkToken($hash);

        if($checkToken){
            $data = Muestra::paginate();
            $code = 200;
            
        }else{
            $data = array(
                'status' => 'Error, no autorizado',
                'code' => 401,
                'message' => 'No tiene los permisos necesarios para crear este registro.'
            );
            $code = 401;
        }

        
        $muestras = Muestra::paginate();

        return response()->json($muestras, $code);
    }
    public function show($id, Request $request){
        //Para JWT (seguridad con inicio de sesion)
        $hash = $request->header('Authorization', null);

        $jwtAuth = new JwtAuth();
        $checkToken = $jwtAuth->checkToken($hash);

        if($checkToken){
            
            $nueva_muestra = Muestra::find($id);
            
            if ($nueva_muestra != null) {
                $data = array(
                    'status' => 'Success',
                    'data' => $nueva_muestra,
                    'code' => 200,
                    'message' => 'Muestra encontrada con exito'
                );  
                $code = 200; 
            }else{
                $data = array(
                    'status' => 'Error, not found',
                    'code' => 404,
                    'message' => 'No se ha encontrado la muestra que buscas'
                );
                $code = 404;
            }
            
            
        }else{
            $data = array(
                'status' => 'error',
                'code' => 401,
                'message' => 'No tiene los permisos necesarios para crear este registro.'
            );
            $code = 401;
        }

        return response()->json($data, $code);
    }
    public function store(Request $request){

        //Para JWT (seguridad con inicio de sesion)
        $hash = $request->header('Authorization', null);

        $jwtAuth = new JwtAuth();
        $checkToken = $jwtAuth->checkToken($hash);

        if($checkToken){
            //Recibir datos POST
            $json = $request->input('json', null);
            $params =json_decode($json);
            
            //Se verifica datos y asignarlos
            $codigo         = (!is_null($json) && isset($params->codigo))           ? $params->codigo           : null;
            $folio          = (!is_null($json) && isset($params->folio))            ? $params->folio            : null;//obligatorio
            $fecha_muestra  = (!is_null($json) && isset($params->fecha_muestra))    ? $params->fecha_muestra    : null;
            $nombre         = (!is_null($json) && isset($params->nombre))           ? $params->nombre           : null;//obligatorio
            $fecha_nac      = (!is_null($json) && isset($params->fecha_nac))        ? $params->fecha_nac        : null;//obligatorio
            $edad           = (!is_null($json) && isset($params->edad))             ? $params->edad             : null;//obligatorio
            $genero         = (!is_null($json) && isset($params->genero))           ? $params->genero           : null;//obligatorio
            $vida_sexual    = (!is_null($json) && isset($params->vida_sexual))      ? $params->vida_sexual      : null;//obligatorio
            $tipo_estudio   = (!is_null($json) && isset($params->tipo_estudio))     ? $params->tipo_estudio     : null;//obligatorio
            $fecha_ult_rev  = (!is_null($json) && isset($params->fecha_ult_rev))    ? $params->fecha_ult_rev    : null;//obligatorio
            $nombre_medico  = (!is_null($json) && isset($params->nombre_medico))    ? $params->nombre_medico    : null;
            $vph_16         = (!is_null($json) && isset($params->vph_16))           ? $params->vph_16           : null;
            $vph_18         = (!is_null($json) && isset($params->vph_18))           ? $params->vph_18           : null;
            $vph_ar         = (!is_null($json) && isset($params->vph_ar))           ? $params->vph_ar           : null;
            $ciclo_corte    = (!is_null($json) && isset($params->ciclo_corte))      ? $params->ciclo_corte      : 0.0;
            $resp_pro_adn   = (!is_null($json) && isset($params->resp_pro_adn))     ? $params->resp_pro_adn     : null;//obligatorio
            $fecha_emision  = (!is_null($json) && isset($params->fecha_emision))    ? $params->fecha_emision    : null;
            $marcador       = (!is_null($json) && isset($params->marcador))         ? $params->marcador         : null;
            $muestra        = (!is_null($json) && isset($params->muestra))          ? $params->muestra          : null;//obligatorio
            $tipo_de_muestra= (!is_null($json) && isset($params->tipo_de_muestra))  ? $params->tipo_de_muestra  : null;//obligatorio
            $dias           = (!is_null($json) && isset($params->dias))             ? $params->dias             : null;
            $calculo        = (!is_null($json) && isset($params->calculo))          ? $params->calculo          : null;

            //22 campos

            if( !is_null($folio) && !is_null($genero) && !is_null($fecha_nac) && 
                !is_null($nombre) && !is_null($edad) && !is_null($vida_sexual) && 
                !is_null($muestra) && !is_null($tipo_de_muestra) && !is_null($tipo_estudio) &&
                !is_null($fecha_ult_rev) && !is_null($resp_pro_adn) )
                {

                //Crear registro
                
                $nueva_muestra = new Muestra();
                $nueva_muestra->folio           = $folio;
                $nueva_muestra->genero          = $genero;
                $nueva_muestra->fecha_nac       = $fecha_nac;
                $nueva_muestra->nombre          = $nombre;
                $nueva_muestra->edad            = $edad;
                $nueva_muestra->vida_sexual     = $vida_sexual;
                $nueva_muestra->muestra         = $muestra;
                $nueva_muestra->tipo_de_muestra = $tipo_de_muestra;
                $nueva_muestra->tipo_estudio    = $tipo_estudio;
                $nueva_muestra->fecha_ult_rev   = $fecha_ult_rev;
                $nueva_muestra->resp_pro_adn    = $resp_pro_adn;
                //11 campos obligatorios
                $nueva_muestra->codigo          = $codigo;
                $nueva_muestra->fecha_muestra   = $fecha_muestra;
                $nueva_muestra->nombre_medico   = $nombre_medico;
                $nueva_muestra->vph_16          = $vph_16;
                $nueva_muestra->vph_18          = $vph_18;
                $nueva_muestra->vph_ar          = $vph_ar;
                $nueva_muestra->ciclo_corte     = $ciclo_corte;
                $nueva_muestra->fecha_emision   = $fecha_emision;
                $nueva_muestra->marcador        = $marcador;
                $nueva_muestra->dias            = $dias;
                $nueva_muestra->calculo         = $calculo;
                
                //Guardar el registro
                $nueva_muestra->save();


                //Verificar cantidad de asistentes
                

                $data = array(
                    'data' => $nueva_muestra,
                    'status' => 'success',
                    'code' => 201,
                    'message' => 'Muestra registrada correctamente.'
                );
                $code = 201;
            }else{
                $data = array(
                    'status' => 'error',
                    'code' => 400,
                    'message' => 'Registro no creado, faltan datos importantes.'
                );
                $code = 400;
            }

            
        }else{
            $data = array(
                'status' => 'error',
                'code' => 401,
                'message' => 'No tiene los permisos necesarios para crear este registro.'
            );
            $code = 401;
        }
        
        return response()->json($data, $code);

        
    }
    public function update($id, Request $request){
        //Para JWT (seguridad con inicio de sesion)
        $hash = $request->header('Authorization', null);

        $jwtAuth = new JwtAuth();
        $checkToken = $jwtAuth->checkToken($hash);

        if($checkToken){
            //Recibir datos POST
            $json = $request->input('json', null);
            $params = json_decode($json);
            $params_array = json_decode($json, true);
            
            //Se verifica datos y asignarlos
            $codigo         = (!is_null($json) && isset($params->codigo))           ? $params->codigo           : null;
            $folio          = (!is_null($json) && isset($params->folio))            ? $params->folio            : null;//obligatorio
            $fecha_muestra  = (!is_null($json) && isset($params->fecha_muestra))    ? $params->fecha_muestra    : null;
            $nombre         = (!is_null($json) && isset($params->nombre))           ? $params->nombre           : null;//obligatorio
            $fecha_nac      = (!is_null($json) && isset($params->fecha_nac))        ? $params->fecha_nac        : null;//obligatorio
            $edad           = (!is_null($json) && isset($params->edad))             ? $params->edad             : null;//obligatorio
            $genero         = (!is_null($json) && isset($params->genero))           ? $params->genero           : null;//obligatorio
            $vida_sexual    = (!is_null($json) && isset($params->vida_sexual))      ? $params->vida_sexual      : null;//obligatorio
            $tipo_estudio   = (!is_null($json) && isset($params->tipo_estudio))     ? $params->tipo_estudio     : null;//obligatorio
            $fecha_ult_rev  = (!is_null($json) && isset($params->fecha_ult_rev))    ? $params->fecha_ult_rev    : null;//obligatorio
            $nombre_medico  = (!is_null($json) && isset($params->nombre_medico))    ? $params->nombre_medico    : null;
            $vph_16         = (!is_null($json) && isset($params->vph_16))           ? $params->vph_16           : null;
            $vph_18         = (!is_null($json) && isset($params->vph_18))           ? $params->vph_18           : null;
            $vph_ar         = (!is_null($json) && isset($params->vph_ar))           ? $params->vph_ar           : null;
            $ciclo_corte    = (!is_null($json) && isset($params->ciclo_corte))      ? $params->ciclo_corte      : 0.0;
            $resp_pro_adn   = (!is_null($json) && isset($params->resp_pro_adn))     ? $params->resp_pro_adn     : null;//obligatorio
            $fecha_emision  = (!is_null($json) && isset($params->fecha_emision))    ? $params->fecha_emision    : null;
            $marcador       = (!is_null($json) && isset($params->marcador))         ? $params->marcador         : null;
            $muestra        = (!is_null($json) && isset($params->muestra))          ? $params->muestra          : null;//obligatorio
            $tipo_de_muestra= (!is_null($json) && isset($params->tipo_de_muestra))  ? $params->tipo_de_muestra  : null;//obligatorio
            $dias           = (!is_null($json) && isset($params->dias))             ? $params->dias             : null;
            $calculo        = (!is_null($json) && isset($params->calculo))          ? $params->calculo          : null;

            //22 campos

            $nueva_muestra = Muestra::find($id);
            $nueva_muestra->folio           = $folio;
            $nueva_muestra->genero          = $genero;
            $nueva_muestra->fecha_nac       = $fecha_nac;
            $nueva_muestra->nombre          = $nombre;
            $nueva_muestra->edad            = $edad;
            $nueva_muestra->vida_sexual     = $vida_sexual;
            $nueva_muestra->muestra         = $muestra;
            $nueva_muestra->tipo_de_muestra = $tipo_de_muestra;
            $nueva_muestra->tipo_estudio    = $tipo_estudio;
            $nueva_muestra->fecha_ult_rev   = $fecha_ult_rev;
            $nueva_muestra->resp_pro_adn    = $resp_pro_adn;                
            //11 campos obligatorios
            $nueva_muestra->codigo          = $codigo;
            $nueva_muestra->fecha_muestra   = $fecha_muestra;
            $nueva_muestra->nombre_medico   = $nombre_medico;
            $nueva_muestra->vph_16          = $vph_16;
            $nueva_muestra->vph_18          = $vph_18;
            $nueva_muestra->vph_ar          = $vph_ar;
            $nueva_muestra->ciclo_corte     = $ciclo_corte;
            $nueva_muestra->fecha_emision   = $fecha_emision;
            $nueva_muestra->marcador        = $marcador;
            $nueva_muestra->dias            = $dias;
            $nueva_muestra->calculo         = $calculo;
            
            //Guardar el registro
            $nueva_muestra->save();


            $data = array(
                'data' => $nueva_muestra,
                'code' => 200,
                'message' => 'Muestra actualizada con exito'
            );
            $code = 200;
        }else{
            $data = array(
                'status' => 'error',
                'code' => 401,
                'message' => 'No tiene los permisos necesarios para crear este registro.'
            );
            $code = 401;
        }

        return response()->json($data, $code);
    }
    public function busquedaEspecifica(Request $request){
        //Para JWT (seguridad con inicio de sesion)
        $hash = $request->header('Authorization', null);

        $jwtAuth = new JwtAuth();
        $checkToken = $jwtAuth->checkToken($hash);

        if($checkToken){
            
            //Recibir datos POST
            $json = $request->input('json', null);
            $params = json_decode($json);
            $params_array = json_decode($json, true);
            
            //Se verifica datos y asignarlos
            $categoria         = (!is_null($json) && isset($params->categoria))           ? $params->categoria           : null;//obligatorio
            $busqueda          = (!is_null($json) && isset($params->busqueda))            ? $params->busqueda            : null;//obligatorio

            if($categoria == null || $busqueda == null){
                $data = array(
                    'status' => 'Error',
                    'code' => 401,
                    'message' => 'No se ha especificado algún dato requerido.'
                );
                $code = 401;
            }else{
                switch ($categoria) {
                    case 'Folio':
                        $search = Muestra::where('folio','=', $busqueda)->get();
                        break;
                    case 'Nombre':
                        $search = Muestra::where('nombre','=', $busqueda)->get();
                        break;
                    case 'Codigo':
                        $search = Muestra::where('codigo','=', $busqueda)->get();
                        break;
                    
                    default:
                        # code...
                        break;
                }

                if(count($search)>0){
                    $data = array(
                        'busqueda' => $search,
                        'status' => 'Success',
                        'code' => 200,
                        'message' => 'Se ha encontrado lo siguiente.'
                    ); 
                    $code = 200;
                }else{
                    $data = array(
                        'busqueda' => $search,
                        'status' => 'Error',
                        'code' => 200,
                        'message' => 'No encontramos lo que buscabas.'
                    );
                    $code = 404;
                }
            }


            
            
            
        }else{
            $data = array(
                'status' => 'error',
                'code' => 401,
                'message' => 'No tiene los permisos necesarios para crear este registro.'
            );
            $code = 401;
        }

        return response()->json($data, $code);
    }
    public function busquedaGrupal(Request $request){
        //Para JWT (seguridad con inicio de sesion)
        $hash = $request->header('Authorization', null);

        $jwtAuth = new JwtAuth();
        $checkToken = $jwtAuth->checkToken($hash);

        if($checkToken){
            
            //Recibir datos POST
            $json = $request->input('json', null);
            $params = json_decode($json);
            $params_array = json_decode($json, true);
            
            //Se verifica datos y asignarlos
            $categoria         = (!is_null($json) && isset($params->categoria))           ? $params->categoria           : null;//obligatorio
            $busqueda          = (!is_null($json) && isset($params->busqueda))            ? $params->busqueda            : null;//obligatorio

            if($categoria == null || $busqueda == null){
                $data = array(
                    'status' => 'Error',
                    'code' => 401,
                    'message' => 'No se ha especificado algún dato requerido.'
                );
                $code = 401;
            }else{
                switch ($categoria) {
                    case 'Nombre':
                        $search = Muestra::where('nombre','like', '%'.$busqueda.'%')->get();
                        break;
                    case 'Apellido':
                        $search = Muestra::where('nombre','like', '%'.$busqueda.'%')->get();
                        break;
                    case 'Medico':
                        $search = Muestra::where('nombre_medico','like', '%'.$busqueda.'%')->get();
                        break;
                    // case 'Ingreso':
                    //     $search = Muestra::where('nombre_medico','like', '%'.$busqueda.'%')->get();
                    //     break;
                    // case 'Reporte':
                    //     $search = Muestra::where('nombre_medico','like', '%'.$busqueda.'%')->get();
                    //     break;
                    // case 'Lugar':
                    //     $search = Muestra::where('nombre_medico','like', '%'.$busqueda.'%')->get();
                    //     break;
                    // case 'Resultado':
                    //     $search = Muestra::where('nombre_medico','like', '%'.$busqueda.'%')->get();
                    //     break;
                    
                    default:
                        # code...
                        break;
                }

                if(count($search)>0){
                    $data = array(
                        'busqueda' => $search,
                        'status' => 'Success',
                        'code' => 200,
                        'message' => 'Se ha encontrado lo siguiente.'
                    ); 
                    $code = 200;
                }else{
                    $data = array(
                        'busqueda' => $search,
                        'status' => 'Error',
                        'code' => 200,
                        'message' => 'No encontramos lo que buscabas.'
                    );
                    $code = 404;
                }
            }
            
        }else{
            $data = array(
                'status' => 'error',
                'code' => 401,
                'message' => 'No tiene los permisos necesarios para crear este registro.'
            );
            $code = 401;
        }

        return response()->json($data, $code);
    }
}
