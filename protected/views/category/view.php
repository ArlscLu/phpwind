<p style="float:right; " class="add_player">
    <a href="#" onclick="javascript:history.back();return false;">Back</a></p>
<h1>Category Detail</h1>

<?php
$this->widget('zii.widgets.CDetailView', array(
    'data' => $model,
    'attributes' => array(
        'category_title_eng',
        'category_title_chi',
        'cate_image',
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
            'value' => CHtml::image(Yii::app()->baseUrl . "/images/upload/category/" . $model->cate_image, 'alt', array("width" => "50%"))
        ),
    ),
));
?>
