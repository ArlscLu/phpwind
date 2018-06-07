<p style="float:right; " class="add_player">
<a href="#" onclick="javascript:history.back();return false;">Back</a></p>
<h1>Manage Category Version</h1>



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
        array('header' => 'Collection (EN)',
            'name' => 'category_title_eng'),
        array('header' => 'Collection (CN)',
            'name' => 'category_title_chi'),
        array(
            'name' => 'cate_image',
            'type' => 'raw',
            'value' => 'CHtml::image(Yii::app()->baseUrl . "/images/upload/category/" . $data->cate_image  ,"cate_image",array("width"=>60))'
        ),
        array(
            'name' => 'created_date',
            'value' => 'AppHelper::applicationDateFormat($data->created_date,\'Y-m-d\')',
            'htmlOptions' => array('width' => '120px'),
        ),
        array(
            'name' => 'status',
            'value' => 'Category::getStatus($data->status)',
            'filter' => CHtml::listData(Category::getStatuss(), 'id', 'title'),
            'htmlOptions' => array('width' => '90px'),
        ),
        array(
            'header' => 'Action',
            'class' => 'EButtonColumnWithClearFilters',
            'template' => '{RollBack},{ViewBanner}{delete}',
            'htmlOptions' => array('class' => 'alignLeft td-col-img', 'width' => 130),
            'buttons' => array(
                'RollBack' => array(
                    'label' => Yii::t('translation', 'Rollback'),
                    'url' => 'Yii::app()->createUrl("category/rollback", array("id"=>$data->id,"bid"=>$data->category_id))',
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
                    'url' => 'yii::app()->createUrl("category/viewversion",array("id"=>$data->id))',
                    'imageUrl' => yii::app()->baseUrl . '/images/view_detail.png',
                ),
                'delete' => array
                    (
                    'label' => Yii::t('translation', 'Delete'),
                    'url' => 'Yii::app()->createUrl("category/deleteversion", array("id"=>$data->id))',
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

