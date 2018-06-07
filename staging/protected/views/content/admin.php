<div class="info">
    <?php foreach (Yii::app()->user->getFlashes() as $key => $message) {
        echo '<div class="flash-' . $key . '">' . base64_decode($message) . "</div>\n";
    } ?>
</div>
<?php
Yii::app()->clientScript->registerScript('myHideEffect', '$(".info").animate({opacity: 1.0}, 3000).fadeOut("slow");', CClientScript::POS_READY);
/* @var $this ContentController */
/* @var $model Content */
$this->menu = array(array('label' => 'List Content', 'url' => array('index')), array('label' => 'Create Content', 'url' => array('create')),);
Yii::app()->clientScript->registerScript('search', "
$('.search-button').click(function(){
	$('.search-form').toggle();
	return false;
});
$('.search-form form').submit(function(){
	$('#content-grid').yiiGridView('update', {
		data: $(this).serialize()
	});
	return false;
});
");
?>
<p style="float:right;" class="add_player"><?php echo CHtml::link('Add Content', array('content/create')); ?></p>
<h1>Manage Content</h1>
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
$this->widget('application.components.SpecialCGridView', array(
    'id' => 'content-grid',
    'language' => $this->langType,
    'dataProvider' => $model->search(),
    'filter' => $model,
    'columns' => array(
       array(
            'name' => 'id',           
            'htmlOptions' => array("width"=>40),
        ),
        array(
            'name' => 'content_title_E',
        ),
        array(
            'name' => 'content_title_C',
        ),
        array(
            'name' => 'status',
            'value' => 'Banner::getStatus($data->status)',
            'filter' => CHtml::listData(Banner::getStatuss(), 'id', 'title'),
            'htmlOptions' => array('text-align:center', 'width' => 120),
        ),
        array( 'header'=>'Action',
            'class' => 'EButtonColumnWithClearFilters',
            'template' => '{active_button}{inactive_button}{update}{delete}{ViewContent}{published}{unpublished}{preview}',
            'htmlOptions' => array('class' => 'alignLeft td-col-img', 'style' => 'text-align:center;width:250px;'),
            'buttons' => array
                (
                'active_button' => array
                    (
                    'label' => Yii::t('translation', 'Activate'),
                    'url' => 'Yii::app()->createUrl("content/status", array("id"=>$data->id, "status"=> "1"))',
                    'imageUrl' => Yii::app()->request->baseUrl . '/images/disable.png',
                    'visible' => '$data->status == 0',
                    'click' => "function(){
                               if(confirm('Update online status?') ==true){
                                        $.fn.yiiGridView.update('content-grid', {
                                            type:'POST',
                                            url:$(this).attr('href'),
                                            'cache':false,
                                            success:function(data) {
                                                 $.fn.yiiGridView.update('content-grid');
                                            }
                                        })
                                        }
                                        return false;
                                  }",
                ),
                'inactive_button' => array
                    (
                    'label' => Yii::t('translation', 'Deactivate'),
                    'url' => 'Yii::app()->createUrl("content/status", array("id"=>$data->id, "status"=> "0"))',
                    'imageUrl' => Yii::app()->request->baseUrl . '/images/enable.png',
                    'visible' => '$data->status == 1',
                    'click' => "function(){
                             if(confirm('Update online status?') ==true){
                                        $.fn.yiiGridView.update('content-grid', {
                                            type:'POST',
                                            url:$(this).attr('href'),
                                            'cache':false,
                                            success:function(data) {
                                             $.fn.yiiGridView.update('content-grid');
                                            }
                                        })
                                        }
                                        return false;
                                  }",
                ),
                'ViewContent' => array(
                    'label' => yii::t('translation', 'Content Detail'),
                    'url' => 'yii::app()->createUrl("content/view",array("id"=>$data->id))',
                    'imageUrl' => yii::app()->baseUrl . '/images/view_detail.png',
                ),
                 'published' => array(
                    'label' => Yii::t('translation', 'Published'),
                    'url' => 'Yii::app()->createUrl("content/showstatus", array("id"=>$data->id, "showstatus"=> "P"))',
                    'imageUrl' => Yii::app()->request->baseUrl . '/images/unpublish.png',
                    'visible' => '$data->show_status == "U"',
                    'click' => "function(){
						   if(confirm('Update online status?') ==true){
								$.fn.yiiGridView.update('content-grid', {
									type:'POST',
									url:$(this).attr('href'),
									'cache':false,
									success:function(data) {
										 $.fn.yiiGridView.update('content-grid');
									}
								})
								}
								return false;
						  }",
                ),
                'unpublished' => array(
                    'label' => Yii::t('translation', 'UnPublished'),
//                    'url' => 'Yii::app()->createUrl("content/showstatus", array("id"=>$data->id, "showstatus"=> "U"))',
                    'imageUrl' => Yii::app()->request->baseUrl . '/images/publish.png',
                    'visible' => '$data->show_status == "P"',
//                    'click' => "function(){
//						 if(confirm('Update online status?') ==true){
//							$.fn.yiiGridView.update('content-grid', {
//								type:'POST',
//								url:$(this).attr('href'),
//								'cache':false,
//								success:function(data) {
//								 $.fn.yiiGridView.update('content-grid');
//								}
//							})
//							}
//							return false;
//					  }",
                ),
//                'version' => array(
//                    'label' => yii::t('translation', 'Version'),
//                    'url' => 'yii::app()->createUrl("content/version",array("id"=>$data->id))',
//                    'imageUrl' => yii::app()->baseUrl . '/images/version.png',
//                ),
                 'preview' => array(
                    'label' => yii::t('translation', 'Preview'),
                    'url' => 'yii::app()->createUrl($this->grid->language."/$data->slug")',
                    'imageUrl' => yii::app()->baseUrl . '/images/preview.png',
                    'options' => array('target' => '_blank')
                ),
            ),
        ),
    ),
));
?>
