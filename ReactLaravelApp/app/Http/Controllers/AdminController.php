<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    function index() {
        $users = \App\Models\User::all();
        $products = \App\Models\Product::orderBy('id','desc')->get();
        $carts = \App\Models\Cart::all();
        if($users && $products && $carts) {
            if(count($carts) < 1) {
                $crt = 'empty';
            } else {
                $crt = 'load';
            }
            if(count($users) < 2) {
                $usr = 'empty';
            } else {
                $usr = 'load';
            }
            if(count($products) < 1) {
                $prod = 'empty';
            } else {
                $prod = 'load';
            }
            return ['msg'=>'success','users'=>$users,'products'=>$products,'carts'=>$carts,'crt'=>$crt,'usr'=>$usr,'prod'=>$prod];
        } else {
            return ['msg'=>'error404'];
        }
    }

    function deleteUser($id) {
        $user = \App\Models\User::where('id',$id);
        if($user) {
            $user->delete();
            return ['msg'=>'success'];
        } else {
            return['msg'=>'error404'];
        }
    }

    function delCart($id) {
        $cart = \App\Models\Cart::where('id',$id);
        if(count($cart->get()) > 0) {
            $cart->delete();
            return ['msg'=>'success'];
        } else {
            return ['msg'=>'error404'];
        }
    }


}
