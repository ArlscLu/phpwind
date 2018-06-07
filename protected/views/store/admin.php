<div class="info">
    <?php
foreach (Yii::app()->user->getFlashes() as $key => $message) {
    echo '<div class="flash-' . $key . '">' . base64_decode($message) . "</div>\n";
}
?>
</div>
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
	$('#store-grid').yiiGridView('update', {
		data: $(this).serialize()
	});
	return false;
});
");
?>
<p style="float:right;" class="add_player"><?php echo CHtml::link('Add Store', array('store/create')); ?></p>
<h1>Manage Stores</h1>
<div class="clearfix"></div>
<?php $this->renderPartial('_search_short', array('model' => $model,)); ?>
<div class="search-form" style="display:none">
    <?php $this->renderPartial('_search', array('model' => $model,)); ?>
</div>
<!-- search-form -->

<?php
$this->widget('application.components.SpecialCGridView', array(
    'id' => 'store-grid',
    'language' => $this->langType,
    'dataProvider' => $model->search(),
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
        array(  'header'=>'Action',
            'class' => 'EButtonColumnWithClearFilters',
            'template' => '{active_button}{inactive_button}{update}{delete}{ViewStore}{published}{unpublished}{version}{preview}',
            'htmlOptions' => array('class' => 'alignLeft td-col-img','style' => 'width:250px;'),
            'buttons' => array
                (
                 'published' => array(
                    'label' => Yii::t('translation', 'Published'),
                    'url' => 'Yii::app()->createUrl("store/showstatus", array("id"=>$data->id, "showstatus"=> "P"))',
                    'imageUrl' => Yii::app()->request->baseUrl . '/images/unpublish.png',
                    'visible' => '$data->show_status == "U"',
                    'click' => "function(){
						   if(confirm('Update online status?') ==true){
								$.fn.yiiGridView.update('store-grid', {
									type:'POST',
									url:$(this).attr('href'),
									'cache':false,
									success:function(data) {
										 $.fn.yiiGridView.update('store-grid');
									}
								})
								}
								return false;
						  }",
                ),
                'unpublished' => array(
                    'label' => Yii::t('translation', 'UnPublished'),
                    'url' => 'Yii::app()->createUrl("store/showstatus", array("id"=>$data->id, "showstatus"=> "U"))',
                    'imageUrl' => Yii::app()->request->baseUrl . '/images/publish.png',
                    'visible' => '$data->show_status == "P"',
                    'click' => "function(){
						 if(confirm('Update online status?') ==true){
							$.fn.yiiGridView.update('store-grid', {
								type:'POST',
								url:$(this).attr('href'),
								'cache':false,
								success:function(data) {
								 $.fn.yiiGridView.update('store-grid');
								}
							})
							}
							return false;
					  }",
                ),
                'active_button' => array
                    (
                    'label' => Yii::t('translation', 'Activate'),
                    'url' => 'Yii::app()->createUrl("store/status", array("id"=>$data->id, "status"=> "1"))',
                    'imageUrl' => Yii::app()->request->baseUrl . '/images/disable.png',
                    'visible' => '$data->status == 0',
                    'click' => "function(){
                               if(confirm('Update online status?') ==true){
                                        $.fn.yiiGridView.update('store-grid', {
                                            type:'POST',
                                            url:$(this).attr('href'),
                                            'cache':false,
                                            success:function(data) {
                                                 $.fn.yiiGridView.update('store-grid');
                                            }
                                        })
                                        }
                                        return false;
                                  }",
                ),
                'inactive_button' => array
                    (
                    'label' => Yii::t('translation', 'Deactivate'),
                    'url' => 'Yii::app()->createUrl("store/status", array("id"=>$data->id, "status"=> "0"))',
                    'imageUrl' => Yii::app()->request->baseUrl . '/images/enable.png',
                    'visible' => '$data->status == 1',
                    'click' => "function(){
                             if(confirm('Update online status?') ==true){
                                        $.fn.yiiGridView.update('store-grid', {
                                            type:'POST',
                                            url:$(this).attr('href'),
                                            'cache':false,
                                            success:function(data) {
                                             $.fn.yiiGridView.update('store-grid');
                                            }
                                        })
                                        }
                                        return false;
                                  }",
                ),
                 'ViewStore' => array(
                        'label'=>yii::t('translation','Store Detail'),
                        'url'=> 'yii::app()->createUrl("store/view",array("id"=>$data->id))',
                        'imageUrl' => yii::app()->baseUrl.'/images/view_detail.png',
                    ),
                'version' => array(
                    'label' => yii::t('translation', 'Version'),
                    'url' => 'yii::app()->createUrl("store/version",array("id"=>$data->id))',
                    'imageUrl' => yii::app()->baseUrl . '/images/version.png',
                ),
                'preview' => array(
                    'label' => yii::t('translation', 'Preview'),
                    'url' => 'yii::app()->createUrl($this->grid->language."/store?preview")',
                    'imageUrl' => yii::app()->baseUrl . '/images/preview.png',
                    'options' => array('target' => '_blank')
                ),
            ),
        ),
    ),
));
?>
<style>
    .filters{display:none!important;}
</style>
