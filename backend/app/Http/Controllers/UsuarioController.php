<?php

namespace App\Http\Controllers;

use Mail;
use App\Helpers\JwtAuth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Usuario;

class UsuarioController extends Controller
{
    public function index(Request $request){
        $hash = $request->header('Authorization', null);

        $jwtAuth = new JwtAuth();
        $checkToken = $jwtAuth->checkToken($hash);

        if($checkToken){

            $usuarios = Usuario::all()
                            ->load('empresa');
            return response()->json(array(
                'usuarios' => $usuarios,
                'status' => 'success'
            ),200);

        }else{
            return response()->json(array(
                'status' => 'error',
                'code' => 401,
                'message' => 'No tiene permisos para ver estos datos.'
            ),200);
        }
    }
    public function register(Request $request){

            //Recoger variablas POST
            //Se indica que llegará una variable llamada 'json' y se convertirá a array con json_decode
            $json = $request->input('json', null);
            $params =json_decode($json);

            //Se verifica los datos que debería traer la variable
            
            $email          = (!is_null($json) && isset($params->email))        ? $params->email        : null;
            $nombre         = (!is_null($json) && isset($params->nombre))       ? $params->nombre       : null;

            //Verificamos que no estén vacios ciertos campos
            if(!is_null($nombre) && !is_null($email)){
                //Si se enviaron los datos correctamente generar una contraseña, hashearla con sal
                //Carácteres para la contraseña
                
                $str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
                $password = "";
                //Reconstruimos la contraseña segun la longitud que se quiera
                for($i=0;$i<10;$i++) {
                    //obtenemos un caracter aleatorio escogido de la cadena de caracteres
                    $password .= substr($str,rand(0,62),1);
                }
                $password_sin_hash = $password;
                $password = password_hash($password, PASSWORD_DEFAULT, ['cost'=>10]);
                

                //Crear usuario
                $usuario = new Usuario();
                $usuario->email = $email;
                $usuario->password = $password;
                $usuario->nombre = $nombre;

                //Comprobar que no se está repitiendo el empleado
                $existencia_usuario = Usuario::where('email', '=', $email)->first();
                if(count((array)$existencia_usuario) == 0){
                    //Guardar el usuario
                    $usuario->save();

                    Mail::send([], [], function ($message) use ($email, $nombre, $password_sin_hash){
                        $message->from('no-reply@pharma2.pxlatelier.com','Pharma Online')
                          ->to($email)
                          ->subject('Usuario creado correctamente')
                          // here comes what you want
                          ->setBody('<h3>Hola '.$nombre.'</h3><p>Se ha creado tu usuario, por favor utiliza la contraseña '.$password_sin_hash.' para ingresar  a la página <a href="https://pharma2.pxlatelier.com/portal/login">Pharma Online</a>.</p>', 'text/html'); // for HTML rich messages
                      });
                    
                    $data = array(
                        'status' => 'success',
                        'code' => 201,
                        'message' => 'Usuario registrado correctamente'
                    );
                }else{
                    //No guardar usuario por que ya existe
                    $data = array(
                        'status' => 'error',
                        'code' => 400,
                        'message' => 'El usuario ya existe, no se puede registrar'
                    );
                }

            }else{
                $data = array(
                    'status' => 'error',
                    'code' => 400,
                    'message' => 'Usuario no creado, faltan datos importantes'
                );
            }

            //Al final siempre se debe devolver una respuesta
            return response()->json($data, 200);
        

    }
    public function login(Request $request){
        $jwtAuth = new JwtAuth();
        //Recibir datos por POST
        $json = $request->input('json', null);
        $params = json_decode($json);

        $email      = (!is_null($json) && isset($params->email))         ? $params->email       : null;
        $password   = (!is_null($json) && isset($params->password))      ? $params->password    : null;
        $getToken   = (!is_null($json) && isset($params->getToken))      ? $params->getToken    : null;

        //Comprobar password
        if(!is_null($email) && !is_null($password) && ($getToken == null || $getToken == 'false') ){
            $signup = $jwtAuth->signup($email, $password);
        }elseif($getToken != null){
            $signup = $jwtAuth->signup($email, $password, $getToken);
        }else{
            $signup = array(
                'status' => 'error',
                'message' => 'Envia tus datos por metodo POST'
            );
        }

        
        return response()->json($signup, 200);
    }
    public function recover(Request $request){

            //Recoger variablas POST
            //Se indica que llegará una variable llamada 'json' y se convertirá a array con json_decode
            $json = $request->input('json', null);
            $params =json_decode($json);

            //Se verifica los datos que debería traer la variable
            
            $email          = (!is_null($json) && isset($params->email))        ? $params->email        : null;

            //Verificamos que no estén vacios ciertos campos
            if(!is_null($email)){
                //Si se enviaron los datos correctamente generar una contraseña, hashearla con sal
                //Carácteres para la contraseña
                
                $str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
                $password = "";
                //Reconstruimos la contraseña segun la longitud que se quiera
                for($i=0;$i<10;$i++) {
                    //obtenemos un caracter aleatorio escogido de la cadena de caracteres
                    $password .= substr($str,rand(0,62),1);
                }
                $password_sin_hash = $password;
                $password = password_hash($password, PASSWORD_DEFAULT, ['cost'=>10]);
                

                //Comprobar que no se está repitiendo el empleado
                $existencia_usuario = Usuario::where('email', '=', $email)->first();
                if(count((array)$existencia_usuario) == 0){ //No se encontro el registro
                    //Guardar el usuario
  
                    $data = array(
                        'status' => 'error',
                        'code' => 201,
                        'message' => 'Usuario no encontrado en la base de datos.'
                    );
                }else{//Encontro el registro

                    $existencia_usuario->password = $password;
                    $existencia_usuario->save();

                    $nombre = $existencia_usuario->nombre;


                    Mail::send([], [], function ($message) use ($email, $nombre, $password_sin_hash){
                        $message->from('no-reply@pharma2.pxlatelier.com','Pharma Online')
                          ->to($email)
                          ->subject('Contraseña actualizada')
                          // here comes what you want
                          ->setBody('<h3>Hola '.$nombre.'</h3><p>Se ha actualizado tu contraseña de usuario, por favor utiliza la contraseña '.$password_sin_hash.' para ingresar a la página <a href="https://pharma2.pxlatelier.com/portal/">Pharma Online</a>.</p>', 'text/html');
                    });

                    $data = array(
                        'status' => 'success',
                        'code' => 400,
                        'message' => 'Usuario actualizado con exito.'
                    );
                }

            }else{
                $data = array(
                    'status' => 'error',
                    'code' => 400,
                    'message' => 'Usuario no actualizado, faltan datos importantes'
                );
            }

            //Al final siempre se debe devolver una respuesta
            return response()->json($data, 200);
        

    }
    public function mail(){
        Mail::send([], [], function ($message){
            $message->from('no-reply@pharma2.pxlatelier.com','Pharma Online')
                ->to('erick@pxlatelier.com')
                ->subject('Usuario creado correctamente')
                // here comes what you want
                ->setBody('<p>Hola.</p>', 'text/html');
        });
        echo 'proceso completado';
    }
    public function pass(){
        $password = 'admin';
        $password = password_hash($password, PASSWORD_DEFAULT, ['cost'=>10]);

        return $password;
    }
}