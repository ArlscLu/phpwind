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
	$('#category-grid').yiiGridView('update', {
		data: $(this).serialize()
	});
	return false;
});
");
?>

<p style="float:right;" class="add_player"><?php echo CHtml::link('Add Collection', array('category/create')); ?></p>
<h1>Manage Collections</h1>
<div class="search-form" style="display:none">
    <?php
    $this->renderPartial('_search', array(
        'model' => $model,
    ));
    ?>
</div><!-- search-form -->

<?php
$this->widget('application.components.SpecialCGridView', array(
    'id' => 'category-grid',
    'dataProvider' => $model->search(),
    'language' => $this->langType,
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
            'header' => 'Order',
            'name' => 'order_by',
            'type' => 'raw',
            'htmlOptions' => array('width' => '100px'),
            'value' => function($data) {
        return '<input type name="order_by" value ="' . $data->order_by . '" id="show-' . $data->id . '" onblur="saveData(' . $data->id . ',' . $data->order_by . ')"><div style="margin:3px;" id="showloader' . $data->id . '"></div>';
    },
        ),
        array('header' => 'Action',
            'class' => 'EButtonColumnWithClearFilters',
            'template' => '{active_button}{inactive_button}{update}{delete}{ViewCategory}{published}{unpublished}{version}{preview}',
            'htmlOptions' => array('class' => 'alignLeft td-col-img', 'style' => 'width:250px;'),
            'buttons' => array
                (
                'published' => array(
                    'label' => Yii::t('translation', 'Published'),
                    'url' => 'Yii::app()->createUrl("category/showstatus", array("id"=>$data->id, "showstatus"=> "P"))',
                    'imageUrl' => Yii::app()->request->baseUrl . '/images/unpublish.png',
                    'visible' => '$data->show_status == "U"',
                    'click' => "function(){
						   if(confirm('Update online status?') ==true){
								$.fn.yiiGridView.update('category-grid', {
									type:'POST',
									url:$(this).attr('href'),
									'cache':false,
									success:function(data) {
										 $.fn.yiiGridView.update('category-grid');
									}
								})
								}
								return false;
						  }",
                ),
                'unpublished' => array(
                    'label' => Yii::t('translation', 'UnPublished'),
                    'url' => 'Yii::app()->createUrl("category/showstatus", array("id"=>$data->id, "showstatus"=> "U"))',
                    'imageUrl' => Yii::app()->request->baseUrl . '/images/publish.png',
                    'visible' => '$data->show_status == "P"',
                    'click' => "function(){
						 if(confirm('Update online status?') ==true){
							$.fn.yiiGridView.update('category-grid', {
								type:'POST',
								url:$(this).attr('href'),
								'cache':false,
								success:function(data) {
								 $.fn.yiiGridView.update('category-grid');
								}
							})
							}
							return false;
					  }",
                ),
                'active_button' => array
                    (
                    'label' => Yii::t('translation', 'Activate'),
                    'url' => 'Yii::app()->createUrl("category/status", array("id"=>$data->id, "status"=> "1"))',
                    'imageUrl' => Yii::app()->request->baseUrl . '/images/disable.png',
                    'visible' => '$data->status == 0',
                    'click' => "function(){
                               if(confirm('Update online status?') ==true){
                                        $.fn.yiiGridView.update('category-grid', {
                                            type:'POST',
                                            url:$(this).attr('href'),
                                            'cache':false,
                                            success:function(data) {
                                                 $.fn.yiiGridView.update('category-grid');
                                            }
                                        })
                                        }
                                        return false;
                                  }",
                ),
                'inactive_button' => array
                    (
                    'label' => Yii::t('translation', 'Deactivate'),
                    'url' => 'Yii::app()->createUrl("category/status", array("id"=>$data->id, "status"=> "0"))',
                    'imageUrl' => Yii::app()->request->baseUrl . '/images/enable.png',
                    'visible' => '$data->status == 1',
                    'click' => "function(){
                             if(confirm('Update online status?') ==true){
                                        $.fn.yiiGridView.update('category-grid', {
                                            type:'POST',
                                            url:$(this).attr('href'),
                                            'cache':false,
                                            success:function(data) {
                                             $.fn.yiiGridView.update('category-grid');
                                            }
                                        })
                                        }
                                        return false;
                                  }",
                ),
                'delete' => array
                    (
                    'label' => Yii::t('translation', 'Delete'),
                    'url' => 'Yii::app()->createUrl("category/delete", array("id"=>$data->id,"order"=>$data->order_by))',
                    'imageUrl' => Yii::app()->request->baseUrl . '/images/delete.png',
                    'click' => "function(){
                             if(confirm('Are you sure to delete?') ==true){
                                        $.fn.yiiGridView.update('category-grid', {
                                            type:'POST',
                                            url:$(this).attr('href'),
                                            'cache':false,
                                            success:function(data) 
                                            {
                                            if(data == 1)
                                            {
                                            alert('This category has some products, so can not delete category');
                                            }
                                             $.fn.yiiGridView.update('category-grid');
                                            }
                                        })
                                        }
                                        return false;
                                  }",
                ),
                'ViewCategory' => array(
                    'label' => yii::t('translation', 'Category Detail'),
                    'url' => 'yii::app()->createUrl("category/view",array("id"=>$data->id))',
                    'imageUrl' => yii::app()->baseUrl . '/images/view_detail.png',
                ),
                'version' => array(
                    'label' => yii::t('translation', 'Version'),
                    'url' => 'yii::app()->createUrl("category/version",array("id"=>$data->id))',
                    'imageUrl' => yii::app()->baseUrl . '/images/version.png',
                ),
                'preview' => array(
                    'label' => yii::t('translation', 'Preview'),
                    'url' => 'yii::app()->createUrl($this->grid->language."/collections/$data->category_slug?preview")',
                    'imageUrl' => yii::app()->baseUrl . '/images/preview.png',
                    'options' => array('target' => '_blank')
                ),
            ),
        ),
    ),
));
?>
<script>
    function saveData(iCategoryID, order_by)
    {
        var CO = order_by;
        var value = PO = $('#show-' + iCategoryID).val();
        $('#showloader' + iCategoryID).show();
        $('#showloader' + iCategoryID).html('Saving...<img style ="display:block;" src="../images/ajax-loader.gif"/>');
        var formData = "id=" + iCategoryID + "&pv=" + PO + "&cv=" + CO;
        $.ajax({
            type: 'POST',
            url: '<?php echo Yii::app()->createAbsoluteUrl("category/updategridorder"); ?>',
            data: formData,
            success: function (data) {

                if (data == 'false') {
                    $('#showloader' + iCategoryID).html('Please try with another order');
                    $.when($('#showloader' + iCategoryID).fadeOut(1000))
                            .done(function () {
                                updateGrid('category-grid');
                            });
                }
                else {
                    $('#showloader' + iCategoryID).hide();
                    updateGrid('category-grid');
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