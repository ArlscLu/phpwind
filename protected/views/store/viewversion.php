<p style="float:right; " class="add_player">
    <a href="#" onclick="javascript:history.back();return false;">Back</a></p>
<h1>Store Detail</h1>

<?php
$this->widget('zii.widgets.CDetailView', array(
    'data' => $model,
    'attributes' => array(
        'city_eng',
        'shop_name_eng',
        'address_eng:html',
        'city_chi',
        'shop_name_chi',
        'address_chi:html',
        array(
            'name' => 'status',
            'value' => Store::getStatus($model->status),
            'filter' => CHtml::listData(Banner::getStatuss(), 'id', 'title'),
        ),
        array(
            'name' => 'created_date',
            'value' => AppHelper::applicationDateFormat($model->created_date, 'd-M-Y'),
        ),
        
    ),
));
?>
