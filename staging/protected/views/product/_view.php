<?php
/* @var $this ProductController */
/* @var $data Product */
?>

<div class="view">

	<b><?php echo CHtml::encode($data->getAttributeLabel('id')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->id), array('view', 'id'=>$data->id)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('category_id')); ?>:</b>
	<?php echo CHtml::encode($data->category_id); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('product_title_eng')); ?>:</b>
	<?php echo CHtml::encode($data->product_title_eng); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('product_title_chi')); ?>:</b>
	<?php echo CHtml::encode($data->product_title_chi); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('product_image')); ?>:</b>
	<?php echo CHtml::encode($data->product_image); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('product_image_resize')); ?>:</b>
	<?php echo CHtml::encode($data->product_image_resize); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('status')); ?>:</b>
	<?php echo CHtml::encode($data->status); ?>
	<br />

	<?php /*
	<b><?php echo CHtml::encode($data->getAttributeLabel('is_delete')); ?>:</b>
	<?php echo CHtml::encode($data->is_delete); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('created_date')); ?>:</b>
	<?php echo CHtml::encode($data->created_date); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('updated_date')); ?>:</b>
	<?php echo CHtml::encode($data->updated_date); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('case_diameter_E')); ?>:</b>
	<?php echo CHtml::encode($data->case_diameter_E); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('case_diameter_C')); ?>:</b>
	<?php echo CHtml::encode($data->case_diameter_C); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('case_E')); ?>:</b>
	<?php echo CHtml::encode($data->case_E); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('case_C')); ?>:</b>
	<?php echo CHtml::encode($data->case_C); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('dial_color_E')); ?>:</b>
	<?php echo CHtml::encode($data->dial_color_E); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('dial_color_C')); ?>:</b>
	<?php echo CHtml::encode($data->dial_color_C); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('water_resistent_E')); ?>:</b>
	<?php echo CHtml::encode($data->water_resistent_E); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('water_resistent_C')); ?>:</b>
	<?php echo CHtml::encode($data->water_resistent_C); ?>
	<br />

	*/ ?>

</div>