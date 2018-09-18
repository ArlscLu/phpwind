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
	$('#product-grid').yiiGridView('update', {
		data: $(this).serialize()
	});
	return false;
});
");
?>
<p style="float:right;" class="add_player"><?php echo CHtml::link('Add Product', array('product/create')); ?></p>
<h1>Manage Products</h1>
<span class="add_player"><?php echo CHtml::link('Advanced Search', '#', array('class' => 'search-button')); ?> </span>
<div class="search-form" style="display:none">
    <?php $this->renderPartial('_search', array('model' => $model));
    ?>
</div><!-- search-form -->

<?php
$this->widget('application.components.SpecialCGridView', array(
    'id' => 'product-grid',
    'language' => $this->langType,
    'dataProvider' => $model->search(),
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
            'name' => 'order_by',
            //    'value' => 'CHTML::activeTextField($data,\'order_by\',array(\'class\' =>"show$data->id",\'onblur\'=>"saveData($data->id,this.value);"))',
            'type' => 'raw',
            'htmlOptions' => array('width' => '100px'),
            'value' => function($data) {
        return '<input type name="order_by" value ="' . $data->order_by . '" id="show-' . $data->id . '" onblur="saveData(' . $data->id . ',' . $data->order_by . ',' . $data->category_id . ')"><div style="margin:3px;" id="showloader' . $data->id . '"></div>';
    },
        ),
        array('header' => 'Action',
            'class' => 'EButtonColumnWithClearFilters',
            'template' => '{active_button}{inactive_button}{update}{delete}{ViewProduct}{published}{unpublished}{version}{preview}',
            'htmlOptions' => array('class' => 'alignLeft td-col-img', 'style' => 'width:250px;'),
            'buttons' => array
                (
                'published' => array(
                    'label' => Yii::t('translation', 'Published'),
                    'url' => 'Yii::app()->createUrl("product/showstatus", array("id"=>$data->id, "showstatus"=> "P"))',
                    'imageUrl' => Yii::app()->request->baseUrl . '/images/unpublish.png',
                    'visible' => '$data->show_status == "U"',
                    'click' => "function(){
						   if(confirm('Update online status?') ==true){
								$.fn.yiiGridView.update('product-grid', {
									type:'POST',
									url:$(this).attr('href'),
									'cache':false,
									success:function(data) {
										 $.fn.yiiGridView.update('product-grid');
									}
								})
								}
								return false;
						  }",
                ),
                'unpublished' => array(
                    'label' => Yii::t('translation', 'UnPublished'),
                    'url' => 'Yii::app()->createUrl("product/showstatus", array("id"=>$data->id, "showstatus"=> "U"))',
                    'imageUrl' => Yii::app()->request->baseUrl . '/images/publish.png',
                    'visible' => '$data->show_status == "P"',
                    'click' => "function(){
						 if(confirm('Update online status?') ==true){
							$.fn.yiiGridView.update('product-grid', {
								type:'POST',
								url:$(this).attr('href'),
								'cache':false,
								success:function(data) {
								 $.fn.yiiGridView.update('product-grid');
								}
							})
							}
							return false;
					  }",
                ),
                'active_button' => array
                    (
                    'label' => Yii::t('translation', 'Activate'),
                    'url' => 'Yii::app()->createUrl("product/status", array("id"=>$data->id, "status"=> "1"))',
                    'imageUrl' => Yii::app()->request->baseUrl . '/images/disable.png',
                    'visible' => '$data->status == 0',
                    'click' => "function(){
                               if(confirm('Update online status?') ==true){
                                        $.fn.yiiGridView.update('product-grid', {
                                            type:'POST',
                                            url:$(this).attr('href'),
                                            'cache':false,
                                            success:function(data) {
                                                 $.fn.yiiGridView.update('product-grid');
                                            }
                                        })
                                        }
                                        return false;
                                  }",
                ),
                'inactive_button' => array
                    (
                    'label' => Yii::t('translation', 'Deactivate'),
                    'url' => 'Yii::app()->createUrl("product/status", array("id"=>$data->id, "status"=> "0"))',
                    'imageUrl' => Yii::app()->request->baseUrl . '/images/enable.png',
                    'visible' => '$data->status == 1',
                    'click' => "function(){
                             if(confirm('Update online status?') ==true){
                                        $.fn.yiiGridView.update('product-grid', {
                                            type:'POST',
                                            url:$(this).attr('href'),
                                            'cache':false,
                                            success:function(data) {
                                             $.fn.yiiGridView.update('product-grid');
                                            }
                                        })
                                        }
                                        return false;
                                  }",
                ),
                'delete' => array
                    (
                    'label' => Yii::t('translation', 'Delete'),
                    'url' => 'Yii::app()->createUrl("product/delete", array("id"=>$data->id,"order"=>$data->order_by,"cat"=> $data->category_id))',
                    'imageUrl' => Yii::app()->request->baseUrl . '/images/delete.png',
                    'click' => "function(){
                             if(confirm('Are you sure to delete?') ==true){
                                        $.fn.yiiGridView.update('product-grid', {
                                            type:'POST',
                                            url:$(this).attr('href'),
                                            'cache':false,
                                            success:function(data) 
                                            {
                                             $.fn.yiiGridView.update('product-grid');
                                            }
                                        })
                                        }
                                        return false;
                                  }",
                ),
                'ViewProduct' => array(
                    'label' => yii::t('translation', 'Product Detail'),
                    'url' => 'yii::app()->createUrl("product/view",array("id"=>$data->id))',
                    'imageUrl' => yii::app()->baseUrl . '/images/view_detail.png',
                ),
                'version' => array(
                    'label' => yii::t('translation', 'Version'),
                    'url' => 'yii::app()->createUrl("product/version",array("id"=>$data->id))',
                    'imageUrl' => yii::app()->baseUrl . '/images/version.png',
                ),
                'preview' => array(
                    'label' => yii::t('translation', 'Preview'),
                    'url' => 'yii::app()->createUrl($this->grid->language."/collections/".$data->category->category_slug."/$data->product_model_eng?preview")',
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

<script>
    function saveData(iProductID, order_by, category_id)
    {

        var CO = order_by;
        var value = PO = $('#show-' + iProductID).val();
        $('#showloader' + iProductID).show();
        $('#showloader' + iProductID).html('Saving...<img style ="display:block;" src="../images/ajax-loader.gif"/>');
        var formData = "id=" + iProductID + "&pv=" + PO + "&cv=" + CO + "&category_id=" + category_id;
        $.ajax({
            type: 'POST',
            url: '<?php echo Yii::app()->createAbsoluteUrl("product/updategridorder"); ?>',
            data: formData,
            success: function (data) {

                if (data == 'false') {
                    $('#showloader' + iProductID).html('Please try with another order');
                    $.when($('#showloader' + iProductID).fadeOut(1000))
                            .done(function () {
                                updateGrid('product-grid');
                            });
                }
                else {
                    $('#showloader' + iProductID).hide();
                    updateGrid('product-grid');
                }
            },
            error: function (data) { // if error occured
                alert("Error occured.please try again");
                return false;
            }

        });



    }


    function updateGrid(id)
    {
        $.fn.yiiGridView.update(id, {url: ""});
    }
</script>