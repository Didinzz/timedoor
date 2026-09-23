<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Teacher extends Model
{
    use SoftDeletes;
    protected $guarded = ['id'];

    public function surveyResponses()
    {
        return $this->hasMany(SurveyResponse::class);
    }
}