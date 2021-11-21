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
    } function delCmnt($id) {
        $cmnt = \App\Models\Comment::where('id','=',$id)->delete();

        return ['msg'=>'success'];
    }
}
