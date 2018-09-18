<p style="float:right; " class="add_player">
<a href="#" onclick="javascript:history.back();return false;">Back</a></p>
<h1>Contact Detail</h1>
<?php
$this->widget('zii.widgets.CDetailView', array(
    'data' => $model,
    'attributes' => array(
        'name',
        'mobile',
        'email',
        'message',
        array(
            'name' => 'type',
            'value' => Banner::getType($model->type),
        ),
        array(
            'name' => 'status',
            'value' => Banner::getStatus($model->status),
            'filter' => CHtml::listData(Banner::getStatuss(), 'id', 'title'),
        ),
        array(
            'name' => 'created_date',
            'value' => AppHelper::applicationDateFormat($model->created_date, 'd-M-Y'),
        ),
    ),
));
?>
