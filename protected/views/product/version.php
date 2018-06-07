<p style="float:right; " class="add_player">
<a href="#" onclick="javascript:history.back();return false;">Back</a></p>
<h1>Manage Product Version</h1>



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
        'category.category_title_eng',
        'category.category_title_chi',
        'product_title_eng',
        'product_title_chi',
        'product_model_eng',
        array(
            'name' => 'product_image',
            'type' => 'raw',
            'value' => 'CHtml::image(Yii::app()->baseUrl . "/images/upload/product/" . $data->product_image  ,"product_image",array("width"=>60))'
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
                    'url' => 'Yii::app()->createUrl("product/rollback", array("id"=>$data->id,"bid"=>$data->product_id))',
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
                    'label' => yii::t('translation', 'Product Version Detail'),
                    'url' => 'yii::app()->createUrl("product/viewversion",array("id"=>$data->id))',
                    'imageUrl' => yii::app()->baseUrl . '/images/view_detail.png',
                ),
                'delete' => array
                    (
                    'label' => Yii::t('translation', 'Delete'),
                    'url' => 'Yii::app()->createUrl("product/deleteversion", array("id"=>$data->id))',
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

