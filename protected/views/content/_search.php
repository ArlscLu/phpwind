<?php
/* @var $this ContentController */
/* @var $model Content */
/* @var $form CActiveForm */
?>

<div class="wide form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'action'=>Yii::app()->createUrl($this->route),
	'method'=>'get',
)); ?>

	<div class="row">
		<?php echo $form->label($model,'id'); ?>
		<?php echo $form->textField($model,'id'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'content_title_E'); ?>
		<?php echo $form->textField($model,'content_title_E',array('size'=>60,'maxlength'=>255)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'content_title_C'); ?>
		<?php echo $form->textField($model,'content_title_C',array('size'=>60,'maxlength'=>255)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'content_E'); ?>
		<?php echo $form->textArea($model,'content_E',array('rows'=>6, 'cols'=>50)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'content_C'); ?>
		<?php echo $form->textArea($model,'content_C',array('rows'=>6, 'cols'=>50)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'status'); ?>
		<?php echo $form->textField($model,'status',array('size'=>1,'maxlength'=>1)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'created_date'); ?>
		<?php echo $form->textField($model,'created_date'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'updated_date'); ?>
		<?php echo $form->textField($model,'updated_date'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton('Search'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- search-form -->