<?php

Yii::app()->clientScript->registerScript('search', "
$('.search-button').click(function(){
	$('.search-form').toggle();
	return false;
});
$('.search-form form').submit(function(){
	$('#contact-grid').yiiGridView('update', {
		data: $(this).serialize()
	});
	return false;
});
");
?>

<p style="float:right;" class="add_player"><?php echo CHtml::link('Download List', array('contact/download?name='.$model->name.'&mobile='.$model->mobile.'&type='.$model->type)); ?></p>
<h1>Manage Contacts</h1>
<?php
    $this->renderPartial('_search_custom', array(
        'model' => $model,
    ));
    ?>
<div class="clearfix"></div>
<div class="search-form" style="display:none">
    <?php
    $this->renderPartial('_search', array(
        'model' => $model,
    ));
    ?>
</div>
<!-- search-form -->

<?php
$this->widget('zii.widgets.grid.CGridView', array(
    'id' => 'contact-grid',
    'dataProvider' => $model->search(),
    'filter' => $model,
    'columns' => array(
        array(
            'name' => 'id',
			'htmlOptions' => array('width'=>40),
		),
        'name',
        'mobile',
        'email',
        array(
            'name' => 'type',
            'value' => 'Banner::getType($data->type)',
        ),
        array(
            'name' => 'status',
            'value' => 'Banner::getStatus($data->status)',
            'filter' => CHtml::listData(Banner::getStatuss(), 'id', 'title'),
        ),
        array( 'header'=>'Action',
            'class' => 'EButtonColumnWithClearFilters',
            'template' => '{active_button}{inactive_button}{delete}{ViewContact}',
            'htmlOptions' => array('class' => 'alignLeft td-col-img', 'style' => 'width:110px;'),
            'buttons' => array
                (
                'active_button' => array
                    (
                    'label' => Yii::t('translation', 'Activate'),
                    'url' => 'Yii::app()->createUrl("contact/status", array("id"=>$data->id, "status"=> "1"))',
                    'imageUrl' => Yii::app()->request->baseUrl . '/images/disable.png',
                    'visible' => '$data->status == 0',
                    'click' => "function(){
						   if(confirm('Update online status?') ==true){
								$.fn.yiiGridView.update('contact-grid', {
									type:'POST',
									url:$(this).attr('href'),
									'cache':false,
									success:function(data) {
										 $.fn.yiiGridView.update('contact-grid');
									}
								})
								}
								return false;
						  }",
                ),
                'inactive_button' => array
                    (
                    'label' => Yii::t('translation', 'Deactivate'),
                    'url' => 'Yii::app()->createUrl("contact/status", array("id"=>$data->id, "status"=> "0"))',
                    'imageUrl' => Yii::app()->request->baseUrl . '/images/enable.png',
                    'visible' => '$data->status == 1',
                    'click' => "function(){
						 if(confirm('Update online status?') ==true){
								$.fn.yiiGridView.update('contact-grid', {
									type:'POST',
									url:$(this).attr('href'),
									'cache':false,
									success:function(data) {
									 $.fn.yiiGridView.update('contact-grid');
									}
								})
								}
								return false;
						  }",
                ),
                 'ViewContact' => array(
                    'label' => yii::t('translation', 'contact Detail'),
                    'url' => 'yii::app()->createUrl("contact/view",array("id"=>$data->id))',
                    'imageUrl' => yii::app()->baseUrl . '/images/view_detail.png',
                ),
            ),
        ),
    ),
));
?>
<style>
    .filters{display:none!important;}
</style>