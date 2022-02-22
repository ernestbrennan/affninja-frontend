<?php

if (!function_exists('hardRedirect')) {

    function hardRedirect($url)
    {
        header("Location: {$url}");
        exit;
    }
}

function getCurrentScheme()
{
    $s = substr(strtolower($_SERVER['SERVER_PROTOCOL']), 0,
        strpos($_SERVER['SERVER_PROTOCOL'], '/'));

    if (!empty($_SERVER["HTTPS"])) {
        $s .= ($_SERVER["HTTPS"] == "on") ? "s" : "";
    }
    return $s;
}

if (!function_exists('getSelfUrl')) {
    function getSelfUrl()
    {
        $s = getCurrentScheme();
        $s .= '://' . $_SERVER['HTTP_HOST'];

        if (!empty($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] != '80') {
            $s .= ':' . $_SERVER['SERVER_PORT'];
        }

        $s .= dirname($_SERVER['SCRIPT_NAME']);

        return $s;
    }
}

if (!function_exists('dbd')) {
    /**
     * Showing all database queries.
     *
     * @param null|\Illuminate\Console\Command|\Psr\Log\LoggerInterface $channel
     */
    function dbd($channel = null)
    {
        static $initialized;
        if ($initialized) {
            return;
        }
        app('db')->listen(function ($sql) use ($channel) {
            foreach ($sql->bindings as $i => $binding) {
                $sql->bindings[$i] = is_string($binding) ? "'$binding'" : (string)$binding;
            }
            $query = str_replace(['%', '?'], ['%%', '%s'], $sql->sql);
            $query = vsprintf($query, $sql->bindings);
            if (null === $channel) {
                dump($query);
            } elseif ($channel instanceof \Illuminate\Console\Command) {
                $channel->info($query);
            } elseif ($channel instanceof \Psr\Log\LoggerInterface) {
                $channel->info($query);
            }
        });
        $initialized = true;
    }
}

if (!function_exists('hidePartOfString')) {

    /**
     * Функция для замены части строки нужными символами
     *
     * @param $str // Срока замены
     * @param int $length // Кол-во символов замены
     * @param string $symbol // Символ, которым нужно заменять
     * @param string $start_point // Откуда начинать менять строку - с начала или конца
     * @return string
     */
    function hidePartOfString($str, $length = 0, $symbol = '*', $start_point = 'end')
    {
        $str_length = mb_strlen($str);

        if ($str_length < 1) {
            return $str;
        }

        // Если не задано сколько символов нужно заменять - меняем всю строку
        if ($length == 0) {
            $length = $str_length;
        }

        // Если длина строки меньше заданой - меняем всю строку
        if ($str_length <= $length) {
            return str_repeat($symbol, $length);
        }

        // Начинаем менять с начала строки
        if ($start_point == 'start') {

            return str_repeat($symbol, $length) . mb_substr($str, $length);

        } else {
            // Начинаем менять с конца строки
            return mb_substr($str, 0, $str_length - $length) . str_repeat($symbol, $length);
        }
    }
}

if (!function_exists('getHumanPrice')) {
    /**
     * Возврат цены пригодной для человеческого глаза
     *
     * @param float $price
     * @param string $currency
     * @return string
     */
    function getHumanPrice(float $price, string $currency): string
    {
        switch (strtolower($currency)) {
            case 'rub':
                return $price . ' ' . getHumanCurrency($currency);

            case 'usd':
                return getHumanCurrency($currency) . $price;

            default:
                return '-';
        }

    }
}

if (!function_exists('getHumanPriceByCurrencyId')) {
    /**
     * Возврат цены пригодной для человеческого глаза
     *
     * @param array $price
     * @param string $currency_id
     * @return string
     */
    function getHumanPriceByCurrencyId($price, $currency_id)
    {
        switch ($currency_id) {
            case 1:// RUB
                return $price . ' ' . getHumanCurrencyByCurrencyId($currency_id);

            case 3:// USD
                return getHumanCurrencyByCurrencyId($currency_id) . $price;

            case 5:// EUR
                return getHumanCurrencyByCurrencyId($currency_id) . $price;

            default:
                return '-';
        }

    }
}

if (!function_exists('getNameUserRole')) {
    /**
     * Возврат названия роли пользователя
     *
     * @param string $user_role
     * @return array
     */
    function getNameUserRole($user_role)
    {
        switch ($user_role) {
            case 'administrator':
                return trans('global::app.administrator');

            case 'publisher':
                return trans('global::app.publisher');


            case 'manager':
                return trans('global::app.manager');

            default:
                return '-';
        }
    }
}

if (!function_exists('getHumanCurrency')) {

    /**
     * Получение обозначения валюты
     *
     * @param string $currency_code
     * @return string
     */
    function getHumanCurrency($currency_code): string
    {
        switch (strtolower($currency_code)) {
            case 'rub':
                return '<span class="rubl">о</span>';

            case 'usd':
                return '$';

            case 'eur':
                return '€';

            default:
                return '-';
        }

    }
}

if (!function_exists('getHumanCurrencyByCurrencyId')) {

    /**
     * Получение обозначения валюты
     *
     * @param string $currency_id
     * @return string
     */
    function getHumanCurrencyByCurrencyId($currency_id)
    {
        switch ($currency_id) {
            case 1:
                return '<span class="rubl">о</span>';

            case 3:
                return '$';

            case 5:
                return '€';

            default:
                return '-';
        }

    }
}

if (!function_exists('getSimpleArrayFromAssociative')) {
    /**
     * Получение необходимых полей ассоциативного массива
     *
     * @param array $associative_array
     * @param string $field
     * @return array
     */
    function getSimpleArrayFromAssociative($associative_array, $field)
    {
        $result_array = [];
        foreach ($associative_array AS $array) {
            $result_array[] = $array[$field];
        }

        return $result_array;
    }
}

if (!function_exists('file_force_contents')) {

    /**
     * Запись файлов с рекурсивным созданием папок
     *  !Внимание, так как файлы могут запрашиваться отдновременно,
     *  возможен вариант создания одной и той же папки одновременно.
     *  Поэтому создание папки и запись файлы обернуты в блоки try catch
     *
     * @param $dir
     * @param $contents
     */
    function file_force_contents($dir, $contents)
    {
        $parts = explode('/', $dir);
        $file = array_pop($parts);
        $dir = '';
        foreach ($parts as $part) {
            if (!is_dir($dir .= "/$part")) {
                try {

                    mkdir($dir);

                } catch (Exception $e) {

                }
            }
        }

        try {

            file_put_contents("$dir/$file", $contents);

        } catch (Exception $e) {

        }
    }
}

if (!function_exists('ddMail')) {

    function ddMail($data)
    {
        \Mail::raw(print_r($data, TRUE), function ($message) {
            $message->from('us@example.com', 'Laravel');
            $message->to('foo@example.com')->cc('bar@example.com');
        });
    }
}

if (!function_exists('sendApiRequest')) {

    /**
     * Отправка HTTP запроса к API
     *
     * @param $method
     * @param $api_method
     * @param $params
     * @param $debug
     * @return array
     */
    function sendApiRequest($method, string $api_method, $params = [], $debug = false): array
    {
        $params['locale'] = \App::getLocale();

        // bad code, but....
        try {
            $response = Requests::request(
                env('API_HOST') . "/{$api_method}", [
                'Authorization' => 'Bearer ' . Cookie::get('token'),
                'User-Agent' => request()->header('User-Agent'),
                'Internal' => 'yes',
                'Origin' => $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'],
                'ip' => request()->ip(),
            ], $params,
                $method
            );
        } catch (Requests_Exception $e) {
            $response = Requests::request(
                env('API_HOST') . "/{$api_method}", [
                'Authorization' => 'Bearer ' . Cookie::get('token'),
                'Internal' => 'yes',
                'User-Agent' => request()->header('User-Agent'),
                'ip' => request()->ip(),
            ], $params,
                $method
            );
        }

        $response = json_decode($response->body, true);

        if ($debug) {
            dd($response);
        }

        if (isset($response['status_code'])) {
            switch ($response['status_code']) {
                case 401:
                    throw new App\Exceptions\BadAuth();

                case 403:
                    throw new App\Exceptions\ForeignCabinet();

                case 500:
                    hardRedirect(getUserCabinetUrl() . '?api_error');
                    break;
            }
        }

        return $response;
    }
}

if (!function_exists('getUserCabinetUrl')) {
    function getUserCabinetUrl($user_role = null)
    {
        $scheme = getCurrentScheme();
        $subdomain = getUserCabinetSubdomain($user_role);
        $subdomain = empty($subdomain) ? '' : $subdomain . '.';

        return $scheme . '://' . $subdomain . env('MAIN_DOMAIN');
    }
}

if (!function_exists('getUserCabinetSubdomain')) {

    function getUserCabinetSubdomain(?string $user_role = null)
    {
        switch ($user_role) {
            case 'publisher':
                return 'my';

            case 'administrator':
                return 'control';

            case 'advertiser':
                return 'office';

            case 'support':
                return 'support';

            case 'manager':
                return 'manager';

            default:
                return '';
        }
    }
}

if (!function_exists('hardRedirect')) {

    /**
     * Отправка пользователя на главную страницу с завершением работы скриптов
     *
     * @param $url
     */
    function hardRedirect($url)
    {
        header("Location: {$url}");
        die;
    }
}

if (!function_exists('cidrToRange')) {
    function cidrToRange($cidr)
    {
        $range = array();
        $cidr = explode('/', $cidr);
        $range[0] = long2ip((ip2long($cidr[0])) & ((-1 << (32 - (int)$cidr[1]))));
        $range[1] = long2ip((ip2long($cidr[0])) + pow(2, (32 - (int)$cidr[1])) - 1);

        return $range;
    }
}

if (!function_exists('getRandomNumber')) {

    function getRandomNumber($min, $max)
    {
        return $min + rand(0, getrandmax()) / getrandmax() * abs($max - $min);
    }
}

if (!function_exists('getRandomCode')) {
    /**
     * Получение рандомной строки заданой длины
     *
     * @param int $len
     * @return string
     */
    function getRandomCode($len = 6)
    {
        $len = intval($len);
        $array = array(
            'a', 'b', 'c',
            'd', 'e', 'f',
            'g', 'h', 'j',
            'k', 'm', 'n',
            'p', 'q', 'r',
            's', 't', 'u',
            'v', 'w', 'x',
            'y', 'z', '1',
            '2', '3', '4',
            '5', '6', '7',
            '8', '9', '0',
            'A', 'B', 'C',
            'D', 'E', 'F',
            'G', 'H', 'J',
            'K', 'M', 'N',
            'P', 'Q', 'R',
            'S', 'T', 'U',
            'V', 'W', 'X',
            'Y', 'Z'
        );
        shuffle($array);
        $gen_code = '';
        for ($in = 0; $in < $len; $in++) {
            $rand_let = (rand(1, 50) + 1);
            $gen_code .= $array[$rand_let];
        }
        return $gen_code;
    }
}

if (!function_exists('getIpInfo')) {

    /**
     * Получение данных по IP адрессу
     *
     * @param $ip
     * @return mixed
     * @throws Exception
     */
    function getIpInfo($ip)
    {
        $reader = new \GeoIp2\Database\Reader(env('PATH_TO_GEOIP_LITE_FILE'));
        $record = $reader->city($ip);

        return (array)$record->raw;
    }
}

if (!function_exists('getIpIsp')) {

    /**
     * Получение ISP ip адресса
     *
     * @param $ip
     * @return mixed
     * @throws Exception
     */
    function getIpIsp($ip)
    {
        $giisp = geoip_open(env('PATH_TO_GEOIP_ISP_FILE'), GEOIP_STANDARD);
        $isp = geoip_org_by_addr($giisp, $ip);
        geoip_close($giisp);

        return $isp;
    }
}

if (!function_exists('getCountryNameByIp')) {

    /**
     * Получение названия страны по IP
     *
     * @param $ip
     * @return mixed
     * @throws Exception
     */
    function getCountryNameByIp($ip)
    {
        $gi = geoip_open(env('PATH_TO_GEOIP_FILE'), GEOIP_STANDARD);

        $country_name = geoip_country_name_by_addr($gi, $ip);

        geoip_close($gi);

        if ($country_name == '') {
            throw new NotDetarmineCountryName();
        }

        return $country_name;
    }
}
if (!function_exists('getLogoutLink')) {
    function getLogoutLink()
    {
        return url(sprintf($_SERVER['REQUEST_SCHEME'] . '://api.%s/logout', env('MAIN_DOMAIN')));
    }
}