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
            $userCheck = \App\Models\User::select('*')->where('username','=',$req->username)->get();
            if(count($userCheck) > 0) {
                return ['msg'=>'user exist'];
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
        
    }

    function login(request $req) {
        $user = \App\Models\User::where('username',$req->unm)->orWhere('email',$req->unm)->first();
        if(!$user || !Hash::check($req->password, $user->password)) {
            return ["error"=>"Email or password not matched"];
        }

        return $user;
    }


    function userData($unm , $id) {
        $user = \App\Models\User::select('*')->where('username','=',$unm)->get();
        $con = \App\Models\Connection::select('*')->where('follower','=',$id)->where('following','=',$user[0]->id)->get();
        if(count($con) > 0) {
            $foll = "true";
        } else {
            $foll = "false";
        }
        if(count($user) > 0) {
            return ['msg'=>'match','user'=>$user,'following'=>$foll];
        } else {
            return ['msg'=>'error404'];
        }
    }


    function followUser(request $req) {
        $con = \App\Models\Connection::select('*')->where('follower','=',$req->follower)->where('following','=',$req->following)->get();
        if(count($con) > 0) {
            return ['msg'=>'error'];
        } else {
            $operate = new \App\Models\Connection;
            $operate->follower = $req->follower;
            $operate->following = $req->following;
            $operate->save();

            return ['msg'=>'success'];
        }
        
    }

    function unFollow($following, $follower) {
        $usr = \App\Models\User::select('*')->where('username','=',$following)->get();
        $con = \App\Models\Connection::select('*')->where('follower','=',$follower)->where('following','=',$usr[0]->id);


        if(count($con->get()) > 0) {
            $con->delete();
            return ['msg'=>'success'];
        } else {
            return ['msg'=>$following];
        }
    }

}
