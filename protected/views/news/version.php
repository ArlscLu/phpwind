<p style="float:right; " class="add_player">
<a href="#" onclick="javascript:history.back();return false;">Back</a></p>
<h1>Manage Category Version</h1>



<?php
$this->widget('zii.widgets.grid.CGridView', array(
    'id' => 'news-grid',
    'dataProvider' => $model->search($id),
    'filter' => $model,
    'columns' => array(
       array(
            'name' => 'id',           
            'htmlOptions' => array("width"=>40),
        ),
       
        'news_header_E',
        'news_header_C',
        array(
            'name' => 'news_year',
            'value' => 'AppHelper::applicationDateFormat($data->news_year,\'Y-m-d\')',
        ),
        array(
            'name' => 'news_image',
            'type' => 'raw',
            'value' => 'CHtml::image(Yii::app()->baseUrl . "/images/upload/news/" . $data->news_image  ,"news_image",array("width"=>60))'
        ),
        array(
            'name' => 'created_date',
            'value' => 'AppHelper::applicationDateFormat($data->created_date,\'Y-m-d\')',
            'htmlOptions' => array('width' => '100px'),
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
                    'url' => 'Yii::app()->createUrl("news/rollback", array("id"=>$data->id,"bid"=>$data->news_id))',
                    'imageUrl' => yii::app()->baseUrl . '/images/rollback.png',
                    'click' => "function(){
                             if(confirm('Are you sure to rollback this version?') ==true){
                                        $.fn.yiiGridView.update('news-grid', {
                                            type:'POST',
                                            url:$(this).attr('href'),
                                            'cache':false,
                                            success:function(data) 
                                            {
                                             $.fn.yiiGridView.update('news-grid');
                                            }
                                        })
                                        }
                                        return false;
                                  }",
                ),
                 'ViewBanner' => array(
                    'label' => yii::t('translation', 'News Version Detail'),
                    'url' => 'yii::app()->createUrl("news/viewversion",array("id"=>$data->id))',
                    'imageUrl' => yii::app()->baseUrl . '/images/view_detail.png',
                ),
                'delete' => array
                    (
                    'label' => Yii::t('translation', 'Delete'),
                    'url' => 'Yii::app()->createUrl("news/deleteversion", array("id"=>$data->id))',
                    'imageUrl' => Yii::app()->request->baseUrl . '/images/delete.png',
                    'click' => "function(){
                             if(confirm('Are you sure to delete?') ==true){
                                        $.fn.yiiGridView.update('news-grid', {
                                            type:'POST',
                                            url:$(this).attr('href'),
                                            'cache':false,
                                            success:function(data) 
                                            {
                                             $.fn.yiiGridView.update('news-grid');
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

