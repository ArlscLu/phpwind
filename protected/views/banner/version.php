<p style="float:right; " class="add_player">
<a href="#" onclick="javascript:history.back();return false;">Back</a></p>
<h1>Manage Banner Version</h1>




<?php
$this->widget('zii.widgets.grid.CGridView', array(
    'id' => 'version-grid',
    'dataProvider' => $model->search($id),
    'filter' => $model,
    'columns' => array(
        array(
            'name' => 'id',
            'htmlOptions' => array("width" => 40),
        ),
        array(
            'name' => 'banner_title_eng',
            'htmlOptions' => array("width" => 90),
        ),
        array(
            'name' => 'banner_title_chi',
            'htmlOptions' => array("width" => 90),
        ),
        array(
            'header' => 'Collection',
            'name' => 'category.category_title_eng',
            'htmlOptions' => array("width" => 110),
        ),
        array(
            'name' => 'banner_image_eng',
            'type' => 'raw',
            'value' => 'CHtml::image(Yii::app()->baseUrl . "/images/upload/" . $data->banner_image_eng  ,"banner_image_eng",array("width"=>80))'
        ),
        array(
            'name' => 'banner_image_chi',
            'type' => 'raw',
            'value' => 'CHtml::image(Yii::app()->baseUrl . "/images/upload/" . $data->banner_image_chi  ,"banner_image_chi",array("width"=>80))'
        ),
        array(
            'name' => 'created_date',
            'value' => 'AppHelper::applicationDateFormat($data->created_date,\'Y-m-d\')',
            'htmlOptions' => array(),
        ),
        array(
            'name' => 'status',
            'value' => 'Banner::getStatus($data->status)',
            'filter' => CHtml::listData(Banner::getStatuss(), 'id', 'title'),
        ),
        array(
            'header' => 'Action',
            'class' => 'EButtonColumnWithClearFilters',
            'template' => '{RollBack},{ViewBanner}{delete}',
            'htmlOptions' => array('class' => 'alignLeft td-col-img', 'width' => 130),
            'buttons' => array(
                'RollBack' => array(
                    'label' => Yii::t('translation', 'Rollback'),
                    'url' => 'Yii::app()->createUrl("banner/rollback", array("id"=>$data->id,"bid"=>$data->banner_id))',
                    'imageUrl' => yii::app()->baseUrl . '/images/rollback.png',
                    'click' => "function(){
                             if(confirm('Are you sure to rollback this version?') ==true){
                                        $.fn.yiiGridView.update('version-grid', {
                                            type:'POST',
                                            url:$(this).attr('href'),
                                            'cache':false,
                                            success:function(data) 
                                            {
                                             $.fn.yiiGridView.update('version-grid');
                                            }
                                        })
                                        }
                                        return false;
                                  }",
                ),
                 'ViewBanner' => array(
                    'label' => yii::t('translation', 'Banner Version Detail'),
                    'url' => 'yii::app()->createUrl("banner/viewversion",array("id"=>$data->id))',
                    'imageUrl' => yii::app()->baseUrl . '/images/view_detail.png',
                ),
                'delete' => array
                    (
                    'label' => Yii::t('translation', 'Delete'),
                    'url' => 'Yii::app()->createUrl("banner/deleteversion", array("id"=>$data->id))',
                    'imageUrl' => Yii::app()->request->baseUrl . '/images/delete.png',
                    'click' => "function(){
                             if(confirm('Are you sure to delete?') ==true){
                                        $.fn.yiiGridView.update('version-grid', {
                                            type:'POST',
                                            url:$(this).attr('href'),
                                            'cache':false,
                                            success:function(data) 
                                            {
                                             $.fn.yiiGridView.update('version-grid');
                                            }
                                        })
                                        }
                                        return false;
                                  }",
                ),
            ),
        ),
    ),
));
?>
<style>
    .filters{display:none!important;}
</style>

