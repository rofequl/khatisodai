<?php

namespace App\Http\Controllers\Auth;

use App\Model\User;
use App\Traits\ApiResponse;
use App\Traits\Slug;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    use ApiResponse;
    use Slug;

    public function register(Request $request): JsonResponse
    {
        $this->validate($request, [
            'name' => 'required|string',
            'email' => 'required|string|unique:users',
            'password' => 'required|confirmed',
        ]);

        try {
            $user = new User();
            $user->name = $request->input('name');
            $user->email = $request->input('email');
            $user->password = app('hash')->make($request->input('password'));
            $user->save();

            return response()->json([
                'entity' => 'admins',
                'action' => 'create',
                'result' => 'success'
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'entity' => 'admins',
                'action' => 'create',
                'result' => 'failed'
            ], 409);
        }
    }

    public function login(Request $request)
    {

        $this->validate($request, [
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        $credentials = $request->only(['email', 'password']);
        $credentials['is_admin'] = 1;

        if (!$token = Auth::attempt($credentials)) {
            return response()->json(['message' => 'Email and password are not match'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function profile(): JsonResponse
    {
        return response()->json(['user' => Auth::user()]);
    }

    public function logout(): JsonResponse
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh(): string
    {
        return 'done';
    }

    public function userList()
    {
        $data = [];
        $data['customer'] = DB::table('users')->where('is_admin', 0)->select('id', 'name', 'photo_type', 'photo', 'status')->get();
        return $data;
    }

    public function userBlock(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
            'active' => 'required',
        ]);
        DB::table('users')
            ->where('id', $request->id)
            ->update([
                'status' => (int)$request->active,
            ]);
    }

    public function userStore(Request $request)
    {

        $this->validate($request, [
            'name' => 'required|string',
            'email' => 'required',
            'password' => 'required',
            'mobile' => 'required',
            'reg_type' => 'required',
        ]);

        $email = $request->email;
        $phone = $request->mobile;
        $number = $this->phone_number($phone);
        if (!$number) {
            return $this->errorResponse('Invalid email and phone number');
        }

        $check = User::where('email', $email)->where('is_admin', '!=', 1)->first();
        if ($check) {
            return $this->errorResponse('This email already used try another');
        }

        $check2 = User::where('mobile', $number)->where('is_admin', '!=', 1)->first();
        if ($check2) {
            return $this->errorResponse('This mobile number already used try another');
        }

        $username = $this->username($request->name);
        $user = new User();
        $user->is_admin = 0;
        $user->name = $request->name;
        $user->email = $email;
        $user->mobile = $number;
        $user->username = $username;
        $user->password = Hash::make($request->password);
        $user->save();

        return User::where('id', $user->id)->select('id', 'name', 'photo_type', 'photo', 'status')->first();
    }
}
