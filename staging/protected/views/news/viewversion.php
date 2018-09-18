<p style="float:right; " class="add_player">
    <a href="#" onclick="javascript:history.back();return false;">Back</a></p>
<h1>News Detail</h1>

<?php
$this->widget('zii.widgets.CDetailView', array(
    'data' => $model,
    'attributes' => array(
        'news_header_E',
        'news_desc_E:html',
        'news_long_desc_E:html',
        'news_header_C',
        'news_desc_C:html',
        'news_long_desc_C:html',
         'news_year',
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
             'name' => 'Image',
            'type' => 'raw',
            'value' => CHtml::image(Yii::app()->baseUrl . "/images/upload/news/" . $model->news_image, 'alt', array("width" => "100%"))
        ),
    ),
));
?>
