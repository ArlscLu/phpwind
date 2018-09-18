<?php
Yii::app()->clientScript->registerScript('search', "
$('.search-button').click(function(){
	$('.search-form').toggle();
	return false;
});
$('.search-form form').submit(function(){
	$('#setting-grid').yiiGridView('update', {
		data: $(this).serialize()
	});
	return false;
});
");
?>


<h1>Manage Setting</h1>


<?php
$this->widget('zii.widgets.grid.CGridView', array(
    'id' => 'setting-grid',
    'dataProvider' => $model->search(),
    'filter' => $model,
    'columns' => array(
        
		array(
            'name' => 'id',           
            'htmlOptions' => array("width"=>70),
        ),
        'name',
        array(
            'name' => 'status',
            'value' => 'Banner::getStatus($data->status)',
            'filter' => CHtml::listData(Banner::getStatuss(), 'id', 'title'),
        ),
         array( 'header'=>'Action',
            'class' => 'EButtonColumnWithClearFilters',
            'template' => '{active_button}{inactive_button}{delete}',
            'htmlOptions' => array('class' => 'alignLeft td-col-img','width'=>130),
            'buttons' => array(
                'active_button' => array(
                    'label' => Yii::t('translation', 'Activate'),
                    'url' => 'Yii::app()->createUrl("setting/status", array("id"=>$data->id, "status"=> "1"))',
                    'imageUrl' => Yii::app()->request->baseUrl . '/images/disable.png',
                    'visible' => '$data->status == 0',
                    'click' => "function(){
						   if(confirm('Update online status?') ==true){
								$.fn.yiiGridView.update('setting-grid', {
									type:'POST',
									url:$(this).attr('href'),
									'cache':false,
									success:function(data) {
										 $.fn.yiiGridView.update('setting-grid');
									}
								})
								}
								return false;
						  }",
                ),
                'inactive_button' => array(
                    'label' => Yii::t('translation', 'Deactivate'),
                    'url' => 'Yii::app()->createUrl("setting/status", array("id"=>$data->id, "status"=> "0"))',
                    'imageUrl' => Yii::app()->request->baseUrl . '/images/enable.png',
                    'visible' => '$data->status == 1',
                    'click' => "function(){
						 if(confirm('Update online status?') ==true){
							$.fn.yiiGridView.update('setting-grid', {
								type:'POST',
								url:$(this).attr('href'),
								'cache':false,
								success:function(data) {
								 $.fn.yiiGridView.update('setting-grid');
								}
							})
							}
							return false;
					  }",
                )
            ),
        ),
    ),
));
?>
