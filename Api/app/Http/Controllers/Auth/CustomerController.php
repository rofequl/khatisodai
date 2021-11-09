<?php

namespace App\Http\Controllers\Auth;

use App\Model\User;
use App\Model\UserVerification;
use App\Traits\ApiResponse;
use App\Traits\Slug;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Helper\CommonHelper;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class CustomerController extends Controller
{
    use ApiResponse;
    use Slug;

    public function register(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string',
            'emailOrMobile' => 'required',
            'password' => 'required',
            'otp' => 'required',
        ]);

        $regMedium = filter_var($request->emailOrMobile, FILTER_VALIDATE_EMAIL) ? 'email' : 'phone';

        $email = $regMedium == 'email' ? $request->emailOrMobile : null;
        $phone = $regMedium == 'email' ? null : $request->emailOrMobile;
        $username = $this->username($request->name);
        try {
            if ($email) {
                if ($this->checkOtpSent($email) == 0) {
                    return $this->errorResponse('Your OTP has been expired..');
                }
                $search = UserVerification::where('account_details', $email)->where('code', $request->otp)
                    ->where('is_verified', 0)->first();
                if (!$search) {
                    return $this->errorResponse('OTP did not match try again..');
                }
                $search->delete();
                $user = new User();
                $user->name = $request->name;
                $user->email = $email;
                $user->username = $username;
                $user->password = Hash::make($request->password);
                $user->save();
                $token = JWTAuth::fromUser($user);
                return $this->respondWithToken($token);
            }

            if ($phone) {
                $number = $this->phone_number($phone);
                if (!$number) {
                    return $this->errorResponse('Invalid email and phone number');
                }
                if ($this->checkOtpSent($number) == 0) {
                    return $this->errorResponse('Your OTP has been expired..');
                }
                $search = UserVerification::where('account_details', $number)->where('code', $request->otp)
                    ->where('is_verified', 0)->first();
                if (!$search) {
                    return $this->errorResponse('OTP did not match try again..');
                }
                $search->delete();
                $user = new User();
                $user->name = $request->name;
                $user->mobile = $number;
                $user->username = $username;
                $user->password = Hash::make($request->password);
                $user->save();
                $token = JWTAuth::fromUser($user);
                return $this->respondWithToken($token);
            }
            return $this->errorResponse();
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }

    public function login(Request $request)
    {

        $this->validate($request, [
            'emailOrMobile' => 'required|string',
            'password' => 'required|string',
        ]);

        $regMedium = filter_var($request->emailOrMobile, FILTER_VALIDATE_EMAIL) ? 'email' : 'phone';

        $email = $regMedium == 'email' ? $request->emailOrMobile : null;
        $phone = $regMedium == 'email' ? null : $request->emailOrMobile;
        try {
            if ($email) {
                $request['email'] = $email;
                $credentials = $request->only(['email', 'password']);
            }

            if ($phone) {
                $number = $this->phone_number($phone);
                if (!$number) {
                    return $this->errorResponse('Invalid email and phone number');
                }
                $request['mobile'] = $number;
                $credentials = $request->only(['mobile', 'password']);
            }
            $credentials['is_admin'] = 0;
            if (!$token = Auth::attempt($credentials)) {
                return $this->errorResponse('Email and password are not match', '', 401);
            }

            return $this->respondWithToken($token);

        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage());
        }

    }

    public function profile(): JsonResponse
    {
        $user = Auth::user();
        return $user === null ? $this->errorResponse('', '', 401) : response()->json(['user' => $user]);
    }

    public function profileUpdate(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string',
        ]);
        $user = Auth::user();
        $user->name = $request->name;
        $user->gender = $request->gender;
        $user->birthday = $request->birthday;
        $user->save();
    }

    public function mailUpdate(Request $request)
    {
        if ($request->email) {
            $this->validate($request, [
                'email' => 'required',
                'otp' => 'required',
            ]);
            $search = UserVerification::where('account_details', $request->email)->where('code', $request->otp)
                ->where('is_verified', 0)->first();
            if (!$search) {
                return response()->json(['message' => 'Invalid verification code..'], 422);
            }

            if ($this->checkOtpSent($request->email) == 0) {
                return $this->errorResponse('Your OTP has been expired..');
            }

            $search->delete();

            $user = Auth::user();
            $user->email = $request->email;
            $user->save();
        }
    }

    public function logout(): JsonResponse
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function sendOTP(Request $request)
    {
        $this->validate($request, [
            'emailOrMobile' => 'required',
            'name' => 'required',
        ]);

        $regMedium = filter_var($request->emailOrMobile, FILTER_VALIDATE_EMAIL) ? 'email' : 'phone';

        $email = $regMedium == 'email' ? $request->emailOrMobile : null;
        $phone = $regMedium == 'email' ? null : $request->emailOrMobile;

        try {
            $verification_code = CommonHelper::generateOTP(6);
            if ($email) {
                $check = User::where('email', $email)->first();
                if ($check) {
                    return $this->errorResponse('This email already used try another');
                }
                $subject = "Verify your email address.";
                $name = $request->name;
                $general = DB::table('generals')->get()->first();
                Mail::send('email.verify', ['name' => $name, 'verification_code' => $verification_code, 'general' => $general],
                    function ($mail) use ($email, $subject, $general) {
                        $mail->from("finecourier@gmail.com", $general->app_name);
                        $mail->to($email)->subject($subject);
                    });
                $this->saveVerify($email, $verification_code);
                return $this->successResponse('An OTP sent to your mail. Please use this OTP');
            }

            if ($phone) {
                $number = $this->phone_number($phone);
                if (!$number) {
                    return $this->errorResponse('Invalid email and phone number');
                }
                $check = User::where('mobile', $number)->first();
                if ($check) {
                    return $this->errorResponse('This number already used try another');
                }
                $this->sendMessage($number, $verification_code);

                $this->saveVerify($number, $verification_code);

                return $this->successResponse('An OTP sent to your number. Please use this OTP');
            }

            return $this->errorResponse('OTP sending failed');
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }

    public function checkOtpSent($account_details)
    {
        $response = 0;
        $nowDate = date('Y-m-d');
        $data = UserVerification::whereDate('updated_at', '=', $nowDate)
            ->where('account_details', $account_details)->where('is_verified', 0)->first();
        if (!empty($data)) {
            $nowDate = date('Y-m-d H:i:s');
            $date1 = \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $data->updated_at)->timestamp;
            $date2 = \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $nowDate)->timestamp;
            $diff = $date2 - $date1;
            if ($diff < 125) {
                $response = 1;
            }
        }
        return $response;
    }

    public function sendMessage($number, $otp)
    {
        $message = 'Please enter the following code ' . $otp . ' to verify your account.';
        $post_url = 'https://api.mobireach.com.bd/SendTextMessage';
        $post_values = array(
            'Username' => env('MOBIREACH_USER'),
            'Password' => env('MOBIREACH_PASS'),
            'From' => env('MOBIREACH_FROM'),
            'To' => $number,
            'Message' => $message
        );

        $post_string = "";
        foreach ($post_values as $key => $value) {
            $post_string .= "$key=" . urlencode($value) . "&";
        }
        $post_string = rtrim($post_string, "& ");

        $request = curl_init($post_url);
        curl_setopt($request, CURLOPT_HEADER, 0);
        curl_setopt($request, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($request, CURLOPT_POSTFIELDS, $post_string);
        curl_setopt($request, CURLOPT_SSL_VERIFYPEER, FALSE);
        $post_response = curl_exec($request);
        curl_close($request);
    }

    public function saveVerify($data, $code)
    {
        $search = UserVerification::where('account_details', $data)->first();
        if ($search) {
            $search->code = $code;
            $search->is_verified = 0;
            $search->save();
        } else {
            $insert = new UserVerification();
            $insert->account_details = $data;
            $insert->code = $code;
            $insert->save();
        }
    }
}
