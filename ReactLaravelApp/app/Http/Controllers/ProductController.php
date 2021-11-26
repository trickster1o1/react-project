<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    //
    function addProduct(request $req) {
        $product = new \App\Models\Product;
        $product->name = $req->input('name');
        $product->description = $req->input('description');
        $product->price = $req->input('price');
        $product->file_path = $req->file('file_path')->store('products');

        $product->save();
        return $product;
    }
    function list() {
        return \App\Models\Product::all();
    }
    function delete($id) {
        $item = \App\Models\Product::find($id);
        unlink($item->file_path);

        $item = \App\Models\Product::where('id',$id)->delete();

        if($item) {
            return ["msg"=>"success"];
        }  else {
            return ["msg"=>"error..."];
        }
    }
    function showProduct($id) {
        $item = \App\Models\Product::find($id);
        if($item) {
            return $item;
        } else {
            return ["msg"=>"error404"];
        }
    }
    function updateProduct($id,request $req) {
        $item = \App\Models\Product::find($id);
        if($item) {
            $item->name = $req->name;
            $item->price = $req->price;
            $item->description = $req->description;
            $item->save();

            return ["msg"=>"success"];
        } else {
            return ["msg"=>"errro404"];
        }
    }

    function search($product ,request $req) {
        $item = \App\Models\Product::select('*')->where('name','LIKE','%'.$product.'%')->orWhere('description','LIKE','%'.$product.'%')->orWhere('price','LIKE','%'.$product.'%')->get();
        if(count($item) > 0) {
            return $item;
        } else {
            return ["msg"=>"No result returned"];
        }
    }

    function comment(request $req) {
        $p = \App\Models\Comment::select('*')->where('user_id','=',$req->id)->where('product_id','=',$req->prodId)->get();
        if(count($p) > 0) {
            return ['msg'=>'cant cmnt twice'];
        } else {
            $post = new \App\Models\Comment;
            $post->user_name = $req->name;
            $post->user_id = $req->id;
            $post->product_id = $req->prodId;
            $post->cmnt = $req->cmnt;
            $post->save();

        
            // $post->comments()->user_name = $req->name;
            // $post->comments()->user_id = $req->id;
            // $post->comments()->cmnt = $req->cmnt;
            // $post->comments()->associate();
            // $post->save();


            return ['msg'=>'Success'];
        }
        
        
    }

    function showComment($cmnt) {
        $comment = \App\Models\Comment::select('*')->where('product_id','=',$cmnt)->get();

        return $comment;
    }
    function delCmnt($id) {
        $cmnt = \App\Models\Comment::where('id','=',$id)->delete();

        return ['msg'=>'success'];
    } 
    function addToCart($id, request $req) {
        $cartCheck = \App\Models\Cart::select('*')->where('user_id','=',$req->userId)->where('gallery_id','=',$id)->get();
        if(count($cartCheck) > 0) {
            return ['msg'=>'Already in cart'];
        } else {
            $prod = \App\Models\Product::where('id','=',$id)->first();
            if($prod){
                $crt = new \App\Models\Cart;
                $crt->user_id = $req->userId;
                $crt->title = $prod->name;
                $crt->gallery_id = $id;
                $crt->description = $prod->description;
                $crt->file_path = $prod->file_path;
                $crt->price = $prod->price;
                $crt->status = '0';
                $crt->save();
                return ['msg'=>'success'];
            } else {
                return ['msg'=>'eror404'];
            }    
        }
        
    }
    function cartList($id) {
        $prod = \App\Models\Cart::select('*')->where('user_id','=',$id)->where('status','=','0')->get();
        $prodPending = \App\Models\Cart::select('*')->where('user_id','=',$id)->where('status','=','1')->get();
        if(count($prodPending) > 0) {
            $prodPending = ''.count($prodPending);
        } else {
            $prodPending = '0';
        }
        if(count($prod) > 0){
            return ['msg'=>'success','product'=>$prod,'pending'=>$prodPending];
        } else {
            return ['msg'=>'empty','pending'=>$prodPending];
        }
    }
    function deleteCart($id) {
        \App\Models\Cart::where('id','=',$id)->delete();
        return ['msg'=>'success'];
    }
    function cancelCart($id) {
        $prod = \App\Models\Cart::select('*')->where('user_id','=',$id);
        if(count($prod->get()) > 0){
            $prod->delete();
            return ['msg'=>'success'];
        } else {
            return ['msg'=>'notFound'];
        }
    }
    function buyProducts(request $req) {
        $cartItem = \App\Models\Cart::select('*')->where('user_id','=',$req->userId)->where('status','=','0');
        if($cartItem) {
            foreach($cartItem->get() as $item) {
                $item->status = '1';
                $item->save();
            }
            // $cartItem->status = '1';
            // $cartItem->save();
            return ['msg'=>'success'];
        } else {
            return ['msg'=>'error404'];
        }
    }

    function cancelCart($id) {
        $cart = \App\Models\Cart::select("*")->where('user_id','=',$id);
        if(count($cart->get()) > 0) {
            $cart->delete();
            return ['msg'=>'success'];
        } else {
            return ['msg'=>'Error404'];
        }
    }


}
