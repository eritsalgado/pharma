<?php

namespace App\Helpers;

use Firebase\JWT\JWT;
use Illuminate\Support\Facades\DB;
use App\Usuario;

class JwtAuth{
    public $key;

    public function __construct(){
        $this->key = 'ExecuteOrder66';
    }

    public function signup($email, $password, $getToken=null){
        //Comprobar si existe el usuario en la BD

        $user = Usuario::where('email', '=', $email)->first();

        $signup = false;

        if(is_object($user)){
            if (password_verify($password, $user->password))
                {$signup = true;}
            else
                {$signup = false;}
        }

        if($signup){
            //Generar un token
            $token = array(
                'id'         => $user->id,
                'email'      => $user->email,
                'nombre'     => $user->nombre,
                'rango'      => $user->rango,
                'iat'        => time(),
                'exp'        => time() + (7 * 24 * 60 * 60)
            );

            $jwt = JWT::encode($token, $this->key, 'HS256');
            $decoded = JWT::decode($jwt, $this->key, array('HS256'));

            if(is_null($getToken)){
                return $jwt;
            }else{
                return $decoded;
            }

        }else{
            //Devolver un error
            return array(
                'status' => 'error',
                'message' => 'El login ha fallado, revise su usuario y contraseña.'
            );
        }
    }


    public function checkToken($jwt, $getIdentity = false){
        $auth = false;

        try{
            $decoded = JWT::decode($jwt, $this->key, array('HS256'));
        }catch(\UnexpectedValueException $e){
            $auth = false;
        }catch(\DomainException $e){
            $auth = false;
        }

        if(isset($decoded) && is_object($decoded) && isset($decoded->id)){
            $auth = true;
        }else{
            $auth = false;
        }

        if($getIdentity){
            return $decoded;
        }

        return $auth;
    }
}