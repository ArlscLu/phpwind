<?php
/* @var $this ProductController */
/* @var $model Product */
/* @var $form CActiveForm */
?>

<div class="wide form">

    <?php
    $form = $this->beginWidget('CActiveForm', array(
        'action' => Yii::app()->createUrl($this->route),
        'method' => 'get',
        'id' => 'search-product'
            ));
    ?>
	<div class="row">
    <div class="col-sm-6 ">
        <div class="">
            <?php echo $form->dropDownList($model, 'category_id', CHtml::listData(Category::model()->findAll(), 'id', 'category_title_eng'), array('empty' => 'Select Collection', 'options' => '')) ?>
        </div><div class="clearfix"></div>

        <div class="">
            <?php echo $form->textField($model, 'product_title_eng', array('placeholder' => 'Product Title (English)')); ?>
        </div><div class="clearfix"></div>
        <div class="">

            <?php echo $form->textField($model, 'case_diameter_E', array('placeholder' => 'Case Diameter (English)')); ?>
        </div>
        <div class="clearfix"></div>
        <div class="">
            <?php echo $form->textField($model, 'case_E', array('placeholder' => 'Case (English)')); ?>
        </div>
        <div class="clearfix"></div>
        <div class="">
            <?php echo $form->textField($model, 'dial_color_E', array('placeholder' => 'Dial color (English)')); ?>
        </div>
        <div class="clearfix"></div>
        <div class="">
            <?php echo $form->textField($model, 'water_resistent_E', array('placeholder' => 'Water resistent (English)')); ?>
        </div>
    </div>
    <div class="col-sm-6 ">
        <div class="">
            <?php echo $form->textField($model, 'product_title_chi', array('placeholder' => 'Product Title (Chinese)')); ?>
        </div>
        <div class="clearfix"></div>

        <div class="">
            <?php echo $form->textField($model, 'case_diameter_C', array('placeholder' => 'Case Diameter (Chinese)')); ?>
        </div><div class="clearfix"></div>


        <div class="">
            <?php echo $form->textField($model, 'case_C', array('placeholder' => 'Case (Chinese)')); ?>
        </div>
        <div class="clearfix"></div>

        <div class="">
            <?php echo $form->textField($model, 'dial_color_C', array('placeholder' => 'dial color (Chinese)')); ?>
        </div><div class="clearfix"></div>


        <div class="">
            <?php echo $form->textField($model, 'water_resistent_C', array('placeholder' => 'Water resistent (Chinese)')); ?>
        </div>
    </div>
	<div class="clearfix"></div>
	<div class="col-sm-6 buttons" >
        <?php echo CHtml::submitButton('Search', array("class" => "search-btn black-btn")); ?>
        <div class ="reset"> <?php echo CHtml::link('Reset', array($this->route), array("class" => "search-btn black-btn")); ?></div>
    </div> 
	</div>
    <div class="clearfix"></div>

     </div>

<?php $this->endWidget(); ?>

</div><!-- search-form -->