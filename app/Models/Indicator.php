<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Indicator extends Model
{

    use SoftDeletes;
    protected $guarded = ['id'];


    public function questions()
    {
        return $this->hasMany(Question::class);
    }
}
