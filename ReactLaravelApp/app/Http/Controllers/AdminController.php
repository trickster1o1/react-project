<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    function index() {
        $users = \App\Models\User::all();
        $products = \App\Models\Product::all();
        $carts = \App\Models\Cart::all();
        if($users) {
            return ['msg'=>'success','users'=>$users,'products'=>$products,'carts'=>$carts];
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
        if($cart) {
            $cart->delete();
            return ['msg'=>'success'];
        } else {
            return ['msg'=>'error404'];
        }
    }


}
