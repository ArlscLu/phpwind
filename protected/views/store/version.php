<p style="float:right; " class="add_player">
<a href="#" onclick="javascript:history.back();return false;">Back</a></p>
<h1>Manage Product Version</h1>
<?php
$this->widget('zii.widgets.grid.CGridView', array(
   'id' => 'store-grid',
    'dataProvider' => $model->search($id),
    'filter' => $model,
    'columns' => array(
        array(
            'name' => 'id',           
            'htmlOptions' => array("width"=>30),
        ),
		array(
            'name' => 'city_eng',           
            'htmlOptions' => array("width"=>70),
        ),        
		array(
            'name' => 'city_chi',
            'htmlOptions' => array("width"=>70),
        ),        
		array(
            'name' => 'shop_name_eng',
            'htmlOptions' => array("width"=>120),
        ),
		array(
            'name' => 'shop_name_chi',
            'htmlOptions' => array("width"=>140),
        ),
        array(
            'name' => 'created_date',
           'value' => 'AppHelper::applicationDateFormat($data->created_date,\'Y-m-d\')',
            'htmlOptions' => array("width"=>100),
        ),
        array(
            'name' => 'status',
            'value' => 'Banner::getStatus($data->status)',
            'filter' => CHtml::listData(Banner::getStatuss(), 'id', 'title'),
			'htmlOptions' => array("width"=>100),
        ),
       array(
            'header' => 'Action',
            'class' => 'EButtonColumnWithClearFilters',
            'template' => '{RollBack},{ViewBanner}{delete}',
            'htmlOptions' => array('class' => 'alignLeft td-col-img', 'width' => 130),
            'buttons' => array(
                'RollBack' => array(
                    'label' => Yii::t('translation', 'Rollback'),
                    'url' => 'Yii::app()->createUrl("store/rollback", array("id"=>$data->id,"bid"=>$data->store_id))',
                    'imageUrl' => yii::app()->baseUrl . '/images/rollback.png',
                    'click' => "function(){
                             if(confirm('Are you sure to rollback this version?') ==true){
                                        $.fn.yiiGridView.update('store-grid', {
                                            type:'POST',
                                            url:$(this).attr('href'),
                                            'cache':false,
                                            success:function(data) 
                                            {
                                             $.fn.yiiGridView.update('store-grid');
                                            }
                                        })
                                        }
                                        return false;
                                  }",
                ),
                 'ViewBanner' => array(
                    'label' => yii::t('translation', 'Product Version Detail'),
                    'url' => 'yii::app()->createUrl("store/viewversion",array("id"=>$data->id))',
                    'imageUrl' => yii::app()->baseUrl . '/images/view_detail.png',
                ),
                'delete' => array
                    (
                    'label' => Yii::t('translation', 'Delete'),
                    'url' => 'Yii::app()->createUrl("store/deleteversion", array("id"=>$data->id))',
                    'imageUrl' => Yii::app()->request->baseUrl . '/images/delete.png',
                    'click' => "function(){
                             if(confirm('Are you sure to delete?') ==true){
                                        $.fn.yiiGridView.update('store-grid', {
                                            type:'POST',
                                            url:$(this).attr('href'),
                                            'cache':false,
                                            success:function(data) 
                                            {
                                             $.fn.yiiGridView.update('store-grid');
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

