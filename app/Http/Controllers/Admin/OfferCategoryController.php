<?php namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Hhdev\CpaNinjaCore\Models\Country;

class OfferCategoryController extends Controller
{
    const ENG_LOCALE = 2;

    /**
     * Вывод списка категорий офферов
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $offer_categories = sendApiRequest('GET', 'offer_category.getList', []);

        return view('admin.offer_category.index', compact('offer_categories'));
    }

    /**
     * Получение модалки доб. категории оффера
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function getCreateModal()
    {
        return view('admin.offer_category.parts.create_modal');
    }

    /**
     * Получаение модалки ред. категории оффера
     *
     * @param $offer_category_id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function getEditModal($offer_category_id)
    {
        $offer_category = sendApiRequest('GET', 'offer_category.getById', [
            'offer_category_id' => $offer_category_id,
            'with' => ['translations']
        ])['response'];

        $title_en = collect($offer_category['translations'])
            ->where('locale_id', self::ENG_LOCALE)
            ->first()['title'];

        return view('admin.offer_category.parts.edit_modal', [
            'offer_category' => $offer_category,
            'title_en' => $title_en,
        ]);
    }
}
