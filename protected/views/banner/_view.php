<?php
/* @var $this BannerController */
/* @var $data Banner */
?>

<div class="view">

	<b><?php echo CHtml::encode($data->getAttributeLabel('id')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->id), array('view', 'id'=>$data->id)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('banner_title_eng')); ?>:</b>
	<?php echo CHtml::encode($data->banner_title_eng); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('banner_title_chi')); ?>:</b>
	<?php echo CHtml::encode($data->banner_title_chi); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('banner_image_eng')); ?>:</b>
	<?php echo CHtml::encode($data->banner_image_eng); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('banner_image_chi')); ?>:</b>
	<?php echo CHtml::encode($data->banner_image_chi); ?>
	<br />

	<?php /*
	<b><?php echo CHtml::encode($data->getAttributeLabel('product_page')); ?>:</b>
	<?php echo CHtml::encode($data->product_page); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('category_page')); ?>:</b>
	<?php echo CHtml::encode($data->category_page); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('status')); ?>:</b>
	<?php echo CHtml::encode($data->status); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('is_delete')); ?>:</b>
	<?php echo CHtml::encode($data->is_delete); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('created_date')); ?>:</b>
	<?php echo CHtml::encode($data->created_date); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('updated_date')); ?>:</b>
	<?php echo CHtml::encode($data->updated_date); ?>
	<br />

	*/ ?>

</div>