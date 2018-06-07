<?php
/* @var $this StoreController */
/* @var $data Store */
?>

<div class="view">

	<b><?php echo CHtml::encode($data->getAttributeLabel('id')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->id), array('view', 'id'=>$data->id)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('city_eng')); ?>:</b>
	<?php echo CHtml::encode($data->city_eng); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('city_chi')); ?>:</b>
	<?php echo CHtml::encode($data->city_chi); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('shop_name_eng')); ?>:</b>
	<?php echo CHtml::encode($data->shop_name_eng); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('shop_name_chi')); ?>:</b>
	<?php echo CHtml::encode($data->shop_name_chi); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('address_eng')); ?>:</b>
	<?php echo CHtml::encode($data->address_eng); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('address_chi')); ?>:</b>
	<?php echo CHtml::encode($data->address_chi); ?>
	<br />

	<?php /*
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