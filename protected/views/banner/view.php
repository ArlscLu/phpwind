<p style="float:right; " class="add_player">
    <a href="#" onclick="javascript:history.back();return false;">Back</a></p>
<h1>Banner Detail</h1>

<?php
$this->widget('zii.widgets.CDetailView', array(
    'data' => $model,
    'attributes' => array(
        'banner_title_eng',
        array(
            'name' => 'category.category_title_eng',
            'htmlOptions' => array("width" => 110),
        ),
        array(
            'name' => 'product.product_title_eng',
            'htmlOptions' => array("width" => 110),
        ),
        'banner_title_chi',
        array(
            'name' => 'category.category_title_chi',
            'htmlOptions' => array("width" => 110),
        ),
        array(
            'name' => 'product.product_title_chi',
            'htmlOptions' => array("width" => 110),
        ),
        array(
            'name' => 'banner_alt_title_eng',
            'htmlOptions' => array("width" => 110),
        ),
        array(
            'name' => 'banner_alt_title_chi',
            'htmlOptions' => array("width" => 110),
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
        array(
            'type' => 'raw',
            'value' => CHtml::image(Yii::app()->baseUrl . "/images/upload/" . $model->banner_image_eng, 'alt', array("width" => "100%"))
        ),
    ),
));
?>
