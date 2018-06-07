<?php
/* @var $this SettingController */
/* @var $model Setting */
/* @var $form CActiveForm */
?>

<div class="form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'setting-form',
	// Please note: When you enable ajax validation, make sure the corresponding
	// controller action is handling ajax validation correctly.
	// There is a call to performAjaxValidation() commented in generated controller code.
	// See class documentation of CActiveForm for details on this.
	'enableAjaxValidation'=>false,
)); ?>

	<p class="note">Fields with <span class="required">*</span> are required.</p>


	<div class="">
		<?php echo $form->labelEx($model,'name'); ?>
		<?php echo $form->textField($model,'name',array('size'=>50,'maxlength'=>50)); ?>
		<?php echo $form->error($model,'name'); ?>
	</div><div class="clearfix"></div>

	<div class="">
        <?php echo $form->labelEx($model, 'status'); ?>
        <?php
        $accountStatus = array('1' => 'Active', '0' => 'Inactive');
        echo $form->radioButtonList($model, 'status', $accountStatus, array('separator' => ' ', 'labelOptions' => array('style' => 'display:inline'), // add this code
        ));
        ?>
    </div>

	<div class="clearfix"></div>
    <div class=" btn-left">
        <label>&nbsp;</label>
      <?php echo CHtml::submitButton($model->isNewRecord ? 'Add' : 'Save'); ?>
    </div>


<?php $this->endWidget(); ?>

</div><!-- form -->