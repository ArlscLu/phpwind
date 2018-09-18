<?php
/* @var $this ContactController */
/* @var $model Contact */
/* @var $form CActiveForm */
?>
<div class="clearfix"></div>
<div class="wide">
    <?php $form=$this->beginWidget('CActiveForm', array('action'=>Yii::app()->createUrl($this->route),'method'=>'get',)); ?>    
        <div class="row">
            <?php echo '<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">'.$form->textField($model,'name',array('class'=>'form-control','placeholder'=>'Name')).'</div>';?>
            <?php echo '<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">'.$form->textField($model,'mobile',array('class'=>'form-control','placeholder'=>'Mobile')).'</div>';?>
            <?php echo '<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">'.$form->textField($model,'type',array('class'=>'form-control','placeholder'=>'Type')).'</div>';?>
            <?php echo '<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">'.CHtml::submitButton('Search',array('class'=>'btn')).'<div class ="reset">'. CHtml::link('Reset', array($this->route),array("class" => "search-btn black-btn")).'</div></div>'; ?> 
            
        </div>
    
    <?php $this->endWidget(); ?>
</div>
<!-- search-form -->