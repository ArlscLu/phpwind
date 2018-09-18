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
	$('#banner-grid').yiiGridView('update', {
		data: $(this).serialize()
	});
	return false;
});
");
?>
<p style="float:right;" class="add_player"><?php echo CHtml::link('Add Banner', array('banner/create')); ?></p>
<h1>Manage Banners</h1>
<div class="clearfix"></div>
<?php $this->renderPartial('_search_short', array('model' => $model,)); ?>
<div class="search-form" style="display:none">
    <?php $this->renderPartial('_search', array('model' => $model,)); ?>
</div>
<!-- search-form -->

<?php
$this->widget('zii.widgets.grid.CGridView', array(
    'id' => 'banner-grid',
    'dataProvider' => $model->search(),
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
            'header'=> 'Collection',
            'name' => 'category.category_title_eng',
            'htmlOptions' => array("width" => 110),
        ),
        //array(
//            'name' => 'category.banner_title_chi',           
//            'htmlOptions' => array("width"=>100),
//        ),
//		
//        'product.product_title_eng',
//        'product.product_title_chi',
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
            'header' => 'Order',
            'name' => 'order_by',
            'type' => 'raw',
            'htmlOptions' => array('width' => '100px'),
            'value' => function($data) {
                return '<input type name="order_by" value ="' . $data->order_by . '" id="show-' . $data->id . '" onblur="saveData(' . $data->id . ',' . $data->order_by . ')"><div style="margin:3px;" id="showloader' . $data->id . '"></div>';
            },
        ),
        array(
            'header' => 'Action',
            'class' => 'EButtonColumnWithClearFilters',
            'template' => '{active_button}{inactive_button}{update}{delete}{ViewBanner}{published}{unpublished}{version}{preview}',
            'htmlOptions' => array('class' => 'alignLeft td-col-img', 'style' => 'width:250px;'),
            'buttons' => array(
                'published' => array(
                    'label' => Yii::t('translation', 'Published'),
                    'url' => 'Yii::app()->createUrl("banner/showstatus", array("id"=>$data->id, "showstatus"=> "P"))',
                    'imageUrl' => Yii::app()->request->baseUrl . '/images/unpublish.png',
                    'visible' => '$data->show_status == "U"',
                    'click' => "function(){
						   if(confirm('Update online status?') ==true){
								$.fn.yiiGridView.update('banner-grid', {
									type:'POST',
									url:$(this).attr('href'),
									'cache':false,
									success:function(data) {
										 $.fn.yiiGridView.update('banner-grid');
									}
								})
								}
								return false;
						  }",
                ),
                'unpublished' => array(
                    'label' => Yii::t('translation', 'UnPublished'),
                    'url' => 'Yii::app()->createUrl("banner/showstatus", array("id"=>$data->id, "showstatus"=> "U"))',
                    'imageUrl' => Yii::app()->request->baseUrl . '/images/publish.png',
                    'visible' => '$data->show_status == "P"',
                    'click' => "function(){
						 if(confirm('Update online status?') ==true){
							$.fn.yiiGridView.update('banner-grid', {
								type:'POST',
								url:$(this).attr('href'),
								'cache':false,
								success:function(data) {
								 $.fn.yiiGridView.update('banner-grid');
								}
							})
							}
							return false;
					  }",
                ),
                'active_button' => array(
                    'label' => Yii::t('translation', 'Activate'),
                    'url' => 'Yii::app()->createUrl("banner/status", array("id"=>$data->id, "status"=> "1"))',
                    'imageUrl' => Yii::app()->request->baseUrl . '/images/disable.png',
                    'visible' => '$data->status == 0',
                    'click' => "function(){
						   if(confirm('Update online status?') ==true){
								$.fn.yiiGridView.update('banner-grid', {
									type:'POST',
									url:$(this).attr('href'),
									'cache':false,
									success:function(data) {
										 $.fn.yiiGridView.update('banner-grid');
									}
								})
								}
								return false;
						  }",
                ),
                'inactive_button' => array(
                    'label' => Yii::t('translation', 'Deactivate'),
                    'url' => 'Yii::app()->createUrl("banner/status", array("id"=>$data->id, "status"=> "0"))',
                    'imageUrl' => Yii::app()->request->baseUrl . '/images/enable.png',
                    'visible' => '$data->status == 1',
                    'click' => "function(){
						 if(confirm('Update online status?') ==true){
							$.fn.yiiGridView.update('banner-grid', {
								type:'POST',
								url:$(this).attr('href'),
								'cache':false,
								success:function(data) {
								 $.fn.yiiGridView.update('banner-grid');
								}
							})
							}
							return false;
					  }",
                ),
                  'delete' => array
                    (
                    'label' => Yii::t('translation', 'Delete'),
                    'url' => 'Yii::app()->createUrl("banner/delete", array("id"=>$data->id,"order"=>$data->order_by))',
                    'imageUrl' => Yii::app()->request->baseUrl . '/images/delete.png',
                    'click' => "function(){
                             if(confirm('Are you sure to delete?') ==true){
                                        $.fn.yiiGridView.update('banner-grid', {
                                            type:'POST',
                                            url:$(this).attr('href'),
                                            'cache':false,
                                            success:function(data) 
                                            {
                                             $.fn.yiiGridView.update('banner-grid');
                                            }
                                        })
                                        }
                                        return false;
                                  }",
                ),
                'ViewBanner' => array(
                    'label' => yii::t('translation', 'Banner Detail'),
                    'url' => 'yii::app()->createUrl("banner/view",array("id"=>$data->id))',
                    'imageUrl' => yii::app()->baseUrl . '/images/view_detail.png',
                ),
                'version' => array(
                    'label' => yii::t('translation', 'Version'),
                    'url' => 'yii::app()->createUrl("banner/version",array("id"=>$data->id))',
                    'imageUrl' => yii::app()->baseUrl . '/images/version.png',
                ),
                'preview' => array(
                    'label' => yii::t('translation', 'Preview'),
                    'url' => 'yii::app()->createUrl("home?preview")',
                    'imageUrl' => yii::app()->baseUrl . '/images/preview.png',
                    'options'=>array('target'=>'_blank')
                ),
            ),
        ),
    ),
));
?>
<style>
    .filters{display:none!important;}
</style>

<script>
    function saveData(iBannerID,order_by)
    {   var CO = order_by;
        var value =PO = $('#show-'+iBannerID).val();
        $('#showloader'+iBannerID).show();
        $('#showloader'+iBannerID).html('Saving...<img style ="display:block;" src="../images/ajax-loader.gif"/>');
        var formData = "id="+ iBannerID + "&pv=" + PO+ "&cv=" + CO;
        $.ajax({
            type: 'POST',
            url: '<?php echo Yii::app()->createAbsoluteUrl("banner/updategridorder"); ?>',
            data: formData,
                
            success: function(data) {
              
                if(data =='false'){ 
                    $('#showloader'+iBannerID).html('Please try with another order');
                    $.when($('#showloader'+iBannerID).fadeOut(1000))
                    .done(function() {
                        updateGrid('banner-grid');
                    });
                }
                else {
                    $('#showloader'+iBannerID).hide();
                    updateGrid('banner-grid');
                }
            },
                    
            error: function(data) { // if error occured
                alert("Error occured.please try again");
                return false;
            }

        });
        
        
        
    }
    
   
    function updateGrid(id)
    {
        $.fn.yiiGridView.update(id, {url:""});
    }
</script>