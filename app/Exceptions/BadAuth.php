<?php

namespace App\Exceptions;

class BadAuth extends \RuntimeException
{
    public function __construct()
    {
        parent::__construct();
    }
}