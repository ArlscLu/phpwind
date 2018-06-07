<?php
/* @var $this ContentController */
/* @var $data Content */
?>

<div class="view">

	<b><?php echo CHtml::encode($data->getAttributeLabel('id')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->id), array('view', 'id'=>$data->id)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('content_title_E')); ?>:</b>
	<?php echo CHtml::encode($data->content_title_E); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('content_title_C')); ?>:</b>
	<?php echo CHtml::encode($data->content_title_C); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('content_E')); ?>:</b>
	<?php echo CHtml::encode($data->content_E); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('content_C')); ?>:</b>
	<?php echo CHtml::encode($data->content_C); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('status')); ?>:</b>
	<?php echo CHtml::encode($data->status); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('created_date')); ?>:</b>
	<?php echo CHtml::encode($data->created_date); ?>
	<br />

	<?php /*
	<b><?php echo CHtml::encode($data->getAttributeLabel('updated_date')); ?>:</b>
	<?php echo CHtml::encode($data->updated_date); ?>
	<br />

	*/ ?>

</div>