<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\FileUpload;
use App\Traits\Slug;
use Illuminate\Support\Facades\DB;
use phpDocumentor\Reflection\Types\Null_;

class FlashDealController extends Controller
{
    use FileUpload;
    use Slug;

    public function index(Request $request)
    {
        return DB::table('flash_deals')->get();
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => 'required|max:100',
        ]);
        $banner = '';
        if ($request->banner != '') {
            $banner = $this->saveImagesWH($request, 'banner', 'upload/marketing/deal/', 2200);
        }
        $slug = $this->slugText($request, 'title');
        $insert = DB::table('flash_deals')->insertGetId([
            'title' => $request->title,
            'banner' => $banner,
            'expired' => $request->expired ? 1 : 2,
            'expired_date' => $request->expired_date ? $request->expired_date : Null,
            'slug' => $slug,
        ]);

        foreach ($request->product as $product) {
            DB::table('flash_deal_products')->insert([
                'flash_deal_id' => $insert,
                'product_id' => $product['id'],
                'discount' => $product['discount'] ? 1 : 2,
                'discount_value' => $product['discount_value'],
                'discount_type' => $product['discount_type'],
            ]);
        }
        return (array)DB::table('flash_deals')->where('id', $insert)->first();
    }

    public function searchProduct(Request $request)
    {
        $search = $request->input('product');
        if ($search != null) {
            return DB::table('products')->select('id', 'name', 'thumbnail_img', 'sku')
                ->where('name', 'like', '%' . $search . '%')
                ->orWhere('sku', 'like', '%' . $search . '%')->take(5)->get();
        } else {
            return [];
        }
    }

    public function dealActive(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
            'active' => 'required',
        ]);
        DB::table('flash_deals')
            ->where('id', $request->id)
            ->update([
                'status' => (int)$request->active,
            ]);
    }

    public function update(Request $request, $id)
    {

    }

    public function destroy($id)
    {
        DB::table('flash_deal_products')->where('flash_deal_id', $id)->delete();
        DB::table('flash_deals')->where('id', $id)->delete();
    }
}
