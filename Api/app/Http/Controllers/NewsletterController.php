<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NewsletterController extends Controller
{
    public function store(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|max:255|unique:subscribers',
        ]);
        DB::table('subscribers')->insert([
            'email' => $request->email,
        ]);
    }
}
