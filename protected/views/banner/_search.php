<?php
/* @var $this BannerController */
/* @var $model Banner */
/* @var $form CActiveForm */
?>

<div class="wide form">

    <?php
    $form = $this->beginWidget('CActiveForm', array(
        'action' => Yii::app()->createUrl($this->route),
        'method' => 'get',
            ));
    ?>

    <div class="row">
<?php echo $form->label($model, 'id'); ?>
<?php echo $form->textField($model, 'id'); ?>
    </div>

    <div class="row">
<?php echo $form->label($model, 'banner_title_eng'); ?>
<?php echo $form->textField($model, 'banner_title_eng', array('size' => 60, 'maxlength' => 100)); ?>
    </div>

    <div class="row">
<?php echo $form->label($model, 'banner_title_chi'); ?>
        <?php echo $form->textField($model, 'banner_title_chi', array('size' => 60, 'maxlength' => 100)); ?>
    </div>
    <div class="row">
<?php echo $form->label($model, 'banner_image_eng'); ?>
<?php echo $form->textField($model, 'banner_image_eng', array('size' => 60, 'maxlength' => 100)); ?>
    </div>

    <div class="row">
<?php echo $form->label($model, 'banner_image_chi'); ?>
<?php echo $form->textField($model, 'banner_image_chi', array('size' => 60, 'maxlength' => 100)); ?>
    </div>

    <div class="row">
<?php echo $form->label($model, 'product_page'); ?>
<?php echo $form->textField($model, 'product_page'); ?>
    </div>

    <div class="row">
<?php echo $form->label($model, 'category_page'); ?>
<?php echo $form->textField($model, 'category_page'); ?>
    </div>

    

    <div class="row buttons">
    <?php echo CHtml::submitButton('Search'); ?>
    </div>

<?php $this->endWidget(); ?>

</div><!-- search-form -->