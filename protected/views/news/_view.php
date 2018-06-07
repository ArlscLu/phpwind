<?php
/* @var $this NewsController */
/* @var $data News */
?>

<div class="view">

	<b><?php echo CHtml::encode($data->getAttributeLabel('id')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->id), array('view', 'id'=>$data->id)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('news_header_E')); ?>:</b>
	<?php echo CHtml::encode($data->news_header_E); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('news_header_C')); ?>:</b>
	<?php echo CHtml::encode($data->news_header_C); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('news_year')); ?>:</b>
	<?php echo CHtml::encode($data->news_year); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('news_desc_E')); ?>:</b>
	<?php echo CHtml::encode($data->news_desc_E); ?>
	<br />

	<?php /*
	<b><?php echo CHtml::encode($data->getAttributeLabel('news_desc_C')); ?>:</b>
	<?php echo CHtml::encode($data->news_desc_C); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('news_long_desc_E')); ?>:</b>
	<?php echo CHtml::encode($data->news_long_desc_E); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('news_long_desc_C')); ?>:</b>
	<?php echo CHtml::encode($data->news_long_desc_C); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('news_image')); ?>:</b>
	<?php echo CHtml::encode($data->news_image); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('news_resize_image')); ?>:</b>
	<?php echo CHtml::encode($data->news_resize_image); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('status')); ?>:</b>
	<?php echo CHtml::encode($data->status); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('is_deleted')); ?>:</b>
	<?php echo CHtml::encode($data->is_deleted); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('created_date')); ?>:</b>
	<?php echo CHtml::encode($data->created_date); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('updated_date')); ?>:</b>
	<?php echo CHtml::encode($data->updated_date); ?>
	<br />

	*/ ?>

</div>