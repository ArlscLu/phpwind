<p style="float:right; " class="add_player">
    <a href="#" onclick="javascript:history.back();return false;">Back</a></p>
<h1>Product Detail</h1>

<?php
$this->widget('zii.widgets.CDetailView', array(
    'data' => $model,
    'attributes' => array(
        'category.category_title_eng',
        'product_title_eng',
        'case_diameter_E',
        'case_E',
        'dial_color_E',
        'water_resistent_E',
        'category.category_title_chi',
        'product_title_chi',
        'case_diameter_C',
        'case_C',
        'dial_color_C',
        'water_resistent_C',
        array(
            'name' => 'status',
            'value' => Store::getStatus($model->status),
            'filter' => CHtml::listData(Banner::getStatuss(), 'id', 'title'),
        ),
        array(
            'name' => 'created_date',
            'value' => AppHelper::applicationDateFormat($model->created_date, 'd-M-Y'),
        ),
        array(
            'type' => 'raw',
            'value' => CHtml::image(Yii::app()->baseUrl . "/images/upload/product/" . $model->product_image, 'alt', array("width" => "50%"))
        ),
    ),
));
?>
