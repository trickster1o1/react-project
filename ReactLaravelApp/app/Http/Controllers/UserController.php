<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    function signUp(request $req) {
        if(empty($req->name) || empty($req->email) || empty($req->username) || empty($req->password)) {
            return ['msg'=>'Please fill all the data'];
        } else {
            $user = new \App\Models\User;
            $user->name = $req->name;
            $user->email = $req->email;
            $user->username = $req->username;
            $user->password = Hash::make($req->input('password'));
            $user->save();

            return ['msg'=>'Success','user'=>$user];    
        }
        
    }

    function login(request $req) {
        $user = \App\Models\User::where('username',$req->unm)->orWhere('email',$req->unm)->first();
        if(!$user || !Hash::check($req->password, $user->password)) {
            return ["error"=>"Email or password not matched"];
        }

        return $user;
    }
}
