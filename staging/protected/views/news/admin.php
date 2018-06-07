<div class="info"><?php
foreach (Yii::app()->user->getFlashes() as $key => $message) {
    echo '<div class="flash-' . $key . '">' . base64_decode($message) . "</div>\n";
}
?> </div>
<?php
Yii::app()->clientScript->registerScript(
        'myHideEffect', '$(".info").animate({opacity: 1.0}, 3000).fadeOut("slow");', CClientScript::POS_READY
);


Yii::app()->clientScript->registerScript('search', "
$('.search-button').click(function(){
	$('.search-form').toggle();
	return false;
});
$('.search-form form').submit(function(){
	$('#news-grid').yiiGridView('update', {
		data: $(this).serialize()
	});
	return false;
});
");
?>
<p style="float:right;" class="add_player"><?php echo CHtml::link('Add News', array('news/create')); ?></p>
<h1>Manage News</h1>
<div class="clearfix"></div>

<div class="search-form" style="display:none">
<?php
$this->renderPartial('_search', array(
    'model' => $model,
));
?>
</div><!-- search-form -->

<?php
$this->widget('application.components.SpecialCGridView', array(
    'id' => 'news-grid',
    'language' => $this->langType,
    'dataProvider' => $model->search(),
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
        array( 'header'=>'Action',
            'class' => 'EButtonColumnWithClearFilters',
            'template' => '{active_button}{inactive_button}{update}{delete}{ViewNews}{published}{unpublished}{version}{preview}',
            'htmlOptions' => array('class' => 'alignLeft td-col-img', 'style' => 'width:250px;'),
            'buttons' => array
                (
                'active_button' => array
                    (
                    'label' => Yii::t('translation', 'Activate'),
                    'url' => 'Yii::app()->createUrl("news/status", array("id"=>$data->id, "status"=> "1"))',
                    'imageUrl' => Yii::app()->request->baseUrl . '/images/disable.png',
                    'visible' => '$data->status == 0',
                    'click' => "function(){
                               if(confirm('Update online status?') ==true){
                                        $.fn.yiiGridView.update('news-grid', {
                                            type:'POST',
                                            url:$(this).attr('href'),
                                            'cache':false,
                                            success:function(data) {
                                                 $.fn.yiiGridView.update('news-grid');
                                            }
                                        })
                                        }
                                        return false;
                                  }",
                ),
                'inactive_button' => array
                    (
                    'label' => Yii::t('translation', 'Deactivate'),
                    'url' => 'Yii::app()->createUrl("news/status", array("id"=>$data->id, "status"=> "0"))',
                    'imageUrl' => Yii::app()->request->baseUrl . '/images/enable.png',
                    'visible' => '$data->status == 1',
                    'click' => "function(){
                             if(confirm('Update online status?') ==true){
                                        $.fn.yiiGridView.update('news-grid', {
                                            type:'POST',
                                            url:$(this).attr('href'),
                                            'cache':false,
                                            success:function(data) {
                                             $.fn.yiiGridView.update('news-grid');
                                            }
                                        })
                                        }
                                        return false;
                                  }",
                ),
                 'ViewNews' => array(
                    'label' => yii::t('translation', 'News Detail'),
                    'url' => 'yii::app()->createUrl("news/view",array("id"=>$data->id))',
                    'imageUrl' => yii::app()->baseUrl . '/images/view_detail.png',
                ),
                'published' => array(
                    'label' => Yii::t('translation', 'Published'),
                    'url' => 'Yii::app()->createUrl("news/showstatus", array("id"=>$data->id, "showstatus"=> "P"))',
                    'imageUrl' => Yii::app()->request->baseUrl . '/images/unpublish.png',
                    'visible' => '$data->show_status == "U"',
                    'click' => "function(){
						   if(confirm('Update online status?') ==true){
								$.fn.yiiGridView.update('news-grid', {
									type:'POST',
									url:$(this).attr('href'),
									'cache':false,
									success:function(data) {
										 $.fn.yiiGridView.update('news-grid');
									}
								})
								}
								return false;
						  }",
                ),
                'unpublished' => array(
                    'label' => Yii::t('translation', 'UnPublished'),
                    'url' => 'Yii::app()->createUrl("news/showstatus", array("id"=>$data->id, "showstatus"=> "U"))',
                    'imageUrl' => Yii::app()->request->baseUrl . '/images/publish.png',
                    'visible' => '$data->show_status == "P"',
                    'click' => "function(){
						 if(confirm('Update online status?') ==true){
							$.fn.yiiGridView.update('news-grid', {
								type:'POST',
								url:$(this).attr('href'),
								'cache':false,
								success:function(data) {
								 $.fn.yiiGridView.update('news-grid');
								}
							})
							}
							return false;
					  }",
                ),
                'version' => array(
                    'label' => yii::t('translation', 'Version'),
                    'url' => 'yii::app()->createUrl("news/version",array("id"=>$data->id))',
                    'imageUrl' => yii::app()->baseUrl . '/images/version.png',
                ),
                 'preview' => array(
                    'label' => yii::t('translation', 'Preview'),
                    'url' => 'yii::app()->createUrl($this->grid->language."/news?preview")',
                    'imageUrl' => yii::app()->baseUrl . '/images/preview.png',
                    'options' => array('target' => '_blank')
                ),
            ),
        ),
    ),
));
?>
