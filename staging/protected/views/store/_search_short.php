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

        <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3"> 
            <?php
            $criteriaEN = new CDbCriteria();
            $criteriaEN->group = 'city_eng';
            $criteriaEN->order = 'city_eng asc';
            echo $form->dropDownList($model, 'city_eng', CHtml::listData(Store::model()->findAll($criteriaEN), 'city_eng', 'city_eng'), array('empty' => 'Select City (EN)', 'options' => '', 'class' => 'form-control'))
            ?> 
        </div>
        <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3"> 
            <?php
            $criteriaCN = new CDbCriteria();
            $criteriaCN->group = 'city_chi';
             $criteriaCN->order = 'city_eng asc';
            echo $form->dropDownList($model, 'city_chi', CHtml::listData(Store::model()->findAll($criteriaCN), 'city_chi', 'city_chi'), array('empty' => 'Select City (CN)', 'options' => '', 'class' => 'form-control'))
            ?> 
        </div>

        <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
<?php echo CHtml::submitButton('Search', array("class" => "search-btn black-btn")); ?>

            <div class ="reset"> <?php echo CHtml::link('Reset', array($this->route), array("class" => "search-btn black-btn")); ?></div>
        </div>

    </div>
    <div class="clearfix"></div>
<?php $this->endWidget(); ?>
</div>
<!-- search-form --> 
