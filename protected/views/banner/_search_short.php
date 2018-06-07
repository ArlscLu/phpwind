<?php
/* @var $this ProjectController */
/* @var $model Project */
/* @var $form CActiveForm */
?>

<div class="wide">
    <?php
    $form = $this->beginWidget('CActiveForm', array(
        'action' => Yii::app()->createUrl($this->route),
        'method' => 'get',
        'htmlOptions' => array('class' => 'form-add-new-emp'),
    ));
    ?>
    <div class="row">
        <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3"> <?php echo $form->dropDownList($model, 'category_page', CHtml::listData(Category::model()->findAll(),'id', 'category_title_eng'), array('empty' => 'Select Collection', 'options' => '', 'class' => 'form-control')) ?> </div>
        <!--<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3"> <?php //echo $form->dropDownList($model, 'product_page', CHtml::listData(Product::model()->findAll(), 'id', 'product_title_eng'), array('empty' => 'Select Product Page', 'options' => '', 'class' => 'form-control')) ?> </div>-->
        <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
            <?php echo CHtml::submitButton('Search', array("class" => "btn btn-default")); ?>
            <div class ="reset"> <?php echo CHtml::link('Reset', array($this->route),array("class" => "search-btn black-btn")); ?></div>
        </div>
    </div>
    <div class="clearfix"></div>
    <?php $this->endWidget(); ?>
</div>
<!-- search-form --> 
