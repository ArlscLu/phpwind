<p style="float:right; " class="add_player">
    <a href="#" onclick="javascript:history.back();return false;">Back</a></p>
<h1>Content Detail</h1>
<?php
$this->widget('zii.widgets.CDetailView', array(
    'data' => $model,
    'attributes' => array(
        'content_title_E_A',
        'content_E_A:html',
        'content_title_C_A',
        'content_C_A:html',
        'content_title_E',
        'content_E:html',
        'content_title_C',
        'content_C:html',
        
        
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
