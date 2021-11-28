<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    function index() {
        $users = \App\Models\User::all();
        $products = \App\Models\Product::all();
        if($users) {
            return ['msg'=>'success','users'=>$users,'products'=>$products];
        } else {
            return ['msg'=>'error404'];
        }
    }
}
