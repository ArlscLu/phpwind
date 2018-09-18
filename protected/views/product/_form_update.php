<script src="<?php echo Yii::app()->request->baseUrl; ?>/js/jquery.min.js"></script>
<style>.errormsg{ color:#f00; clear: both; text-align: left; padding-left:307px; }
    #addOption{ cursor: pointer; color: #3b85b9; font-weight: bold !important; font-size: 16px; }
</style>
<div class="info">
    <?php
foreach (Yii::app()->user->getFlashes() as $key => $message) {
    echo '<div class="flash-' . $key . '">' . base64_decode($message) . "</div>\n";
}
?>
</div>
<?php
Yii::app()->clientScript->registerScript(
   'myHideEffect',
   '$(".info").animate({opacity: 1.0}, 3000).fadeOut("slow");',
   CClientScript::POS_READY
);
?>

<div class="form">


    <?php
    $form = $this->beginWidget('CActiveForm', array(
        'id' => 'product-form',
        // Please note: When you enable ajax validation, make sure the corresponding
        // controller action is handling ajax validation correctly.
        // There is a call to performAjaxValidation() commented in generated controller code.
        // See class documentation of CActiveForm for details on this.
        'enableAjaxValidation' => false,
        'htmlOptions' => array('enctype' => 'multipart/form-data', 'onsubmit' => "return false;", 'onkeypress' => " if(event.keyCode == 13){ send(); } "
        ),
            ));
    ?>
    <div class="col-sm-12 ">
        <p class="note">Fields with <span class="required">*</span> are required.</p>
		<div class="col-xs-12 lang-cat1"  style="text-align:left;">Product Details</div>
        <div class="row">

            <div class="col-xs-12 col-sm-6 col-md-3  "> <?php echo CHtml::label('Collection', 'Collection'); ?></div>
            <div class="col-xs-12 col-sm-6 col-md-9 ">  <?php echo $form->dropDownList($model, 'category_id', CHtml::listData(Category::model()->findAll(array('select'=>'*','condition'=>'status="1"')), 'id', 'category_title_eng'), array('empty' => '-- Select Collection --', 'options' => '')) ?>
                <div id="errormsgCategory" class="errormsg"></div></div>

            <div class="col-xs-12 col-sm-6 col-md-3  "> <label>Product Model</label></div>
            <div class="col-xs-12 col-sm-6 col-md-9 ">  <?php echo $form->textField($model, 'product_model_eng', array('size' => 60, 'maxlength' => 100)); ?>
                <div id="errormsgProductModelE" class="errormsg"></div></div>



 
            <div class="col-xs-12 col-sm-6 col-md-3  ">
                <label class =" required">Product Image<p style="color:red;">(size should be 252px × 379px)</p></label></div>
            <div class="col-xs-12 col-sm-6 col-md-9 "> <?php echo CHtml::activeFileField($model, 'product_image', array('maxlength' => 255)); ?> 

                <input type="hidden" id="product_image" value="<?php echo $model->product_image; ?>"/>
                <div class="clearfix"></div>
                <label class =" required">&nbsp;</label>
                <p><?php echo $model->product_image; ?> </p>
                <?php echo CHtml::image(Yii::app()->request->baseUrl . '/images/upload/product/' . $model->product_image, "product_image", array("width" => 150)); ?>
                <div id="errormsgProductImage" class="errormsg"></div>
            </div>


            <div class="col-xs-12 col-sm-6 col-md-3  ">   <?php echo $form->labelEx($model, 'status'); ?></div>
            <div class="col-xs-12 col-sm-6 col-md-9  ">    <?php
                $accountStatus = array('1' => 'Active', '0' => 'Inactive');
                echo $form->radioButtonList($model, 'status', $accountStatus, array('separator' => ' ', 'labelOptions' => array('style' => 'display:inline'), // add this code
                ));
                ?></div>
        </div>
    </div>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
	<div class="col-sm-12 " ><div class="col-xs-12 lang-cat1" style="text-align:left;">Product Specifications</div></div>
    <div class="row"> 
        <div class="col-sm-6 ">
              <div class="col-sm-12 " > <div class=" col-xs-12 lang-cat2">CN</div></div>
            <div class="col-xs-12 col-sm-6 col-md-6  ">   <?php echo $form->labelEx($model, 'product_title_chi'); ?></div>
            <div class="col-xs-12 col-sm-6 col-md-6 ">  <?php echo $form->textField($model, 'product_title_chi', array('size' => 60, 'maxlength' => 100)); ?>
                <div id="errormsgProductTitleC" class="errormsg"></div></div>
            <div class="col-xs-12 col-sm-6 col-md-6  "> <?php echo $form->labelEx($model, 'case_diameter_C'); ?></div>
            <div class="col-xs-12 col-sm-6 col-md-6  "> <?php echo $form->textField($model, 'case_diameter_C', array('size' => 60, 'maxlength' => 100)); ?>
                <div id="errormsgCDC" class="errormsg"></div></div>
            <div class="col-xs-12 col-sm-6 col-md-6  "> <?php echo $form->labelEx($model, 'dial_color_C'); ?></div>
            <div class="col-xs-12 col-sm-6 col-md-6  "> <?php echo $form->textField($model, 'dial_color_C', array('size' => 60, 'maxlength' => 100)); ?>
                <div id="errormsgDCC" class="errormsg"></div></div>

            <div class="col-xs-12 col-sm-6 col-md-6  "> <?php echo $form->labelEx($model, 'case_C'); ?></div>
            <div class="col-xs-12 col-sm-6 col-md-6  "> <?php echo $form->textField($model, 'case_C', array('size' => 60, 'maxlength' => 100)); ?>
                <div id="errormsgCC" class="errormsg"></div></div>



            <div class="col-xs-12 col-sm-6 col-md-6  "> <?php echo $form->labelEx($model, 'water_resistent_C'); ?></div>
            <div class="col-xs-12 col-sm-6 col-md-6  "> <?php echo $form->textField($model, 'water_resistent_C', array('size' => 60, 'maxlength' => 100)); ?>
                <div id="errormsgWRC" class="errormsg"></div></div>
            
			

        </div>

        <div class="col-sm-6 ">
        
			 <div class="col-sm-12 " ><div class="col-xs-12 lang-cat1">EN</div></div>

            <div class="col-xs-12 col-sm-6 col-md-6  ">  <?php echo $form->labelEx($model, 'product_title_eng'); ?></div>
            <div class="col-xs-12 col-sm-6 col-md-6 "> <?php echo $form->textField($model, 'product_title_eng', array('size' => 60, 'maxlength' => 100)); ?>
                <div id="errormsgProductTitleE" class="errormsg"></div></div>

            <div class="col-xs-12 col-sm-6 col-md-6  "><?php echo $form->labelEx($model, 'case_diameter_E'); ?></div>
            <div class="col-xs-12 col-sm-6 col-md-6  "> <?php echo $form->textField($model, 'case_diameter_E', array('size' => 60, 'maxlength' => 100)); ?>
                <div id="errormsgCDE" class="errormsg"></div></div>







            <div class="col-xs-12 col-sm-6 col-md-6  "> <?php echo $form->labelEx($model, 'dial_color_E'); ?></div>
            <div class="col-xs-12 col-sm-6 col-md-6  "> <?php echo $form->textField($model, 'dial_color_E', array('size' => 60, 'maxlength' => 100)); ?>
                <div id="errormsgDCE" class="errormsg"></div></div>
            <div class="col-xs-12 col-sm-6 col-md-6  "> <?php echo $form->labelEx($model, 'case_E'); ?></div>
            <div class="col-xs-12 col-sm-6 col-md-6  "> <?php echo $form->textField($model, 'case_E', array('size' => 60, 'maxlength' => 100)); ?>
                <div id="errormsgCE" class="errormsg"></div></div>

            <div class="col-xs-12 col-sm-6 col-md-6  "> <?php echo $form->labelEx($model, 'water_resistent_E'); ?></div>
            <div class="col-xs-12 col-sm-6 col-md-6  "> <?php echo $form->textField($model, 'water_resistent_E', array('size' => 60, 'maxlength' => 100)); ?>
                <div id="errormsgWRE" class="errormsg"></div></div>

        </div>

        <div class="clearfix"></div>
        <div class="col-xs-12 col-sm-6 col-md-6  ">
            <div class="col-xs-12 col-sm-6 col-md-6  "><label>&nbsp;</label></div>
            <div class="col-xs-12 col-sm-6 col-md-6  ">   <?php echo CHtml::Button('Update', array('onclick' => 'return send();', 'class' => 'black-btn ')); ?> </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6  "> </div>
    </div>
</div>

<?php $this->endWidget(); ?>







<script type="text/javascript">

    function send()
    {  
        var category_id = $('#Product_category_id').val();
        var order = $('#Product_order_by').val();
        var product_title_eng = $('#Product_product_title_eng').val();
        var product_title_chi = $('#Product_product_title_chi').val();
        var product_model_eng = $('#Product_product_model_eng').val();
        var product_model_chi = $('#Product_product_model_chi').val();
        var product_image =   $('#Product_product_image').val();
        var productImage =   $('#product_image').val();
        var case_diameter_E = $('#Product_case_diameter_E').val();
        var case_diameter_C = $('#Product_case_diameter_C').val();
        var case_E = $('#Product_case_E').val();
        var case_C = $('#Product_case_C').val();
        var dial_color_E = $('#Product_dial_color_E').val();
        var dial_color_C = $('#Product_dial_color_C').val();
        var water_resistent_E = $('#Product_water_resistent_E').val();
        var water_resistent_C = $('#Product_water_resistent_C').val();
//         var product_mrp = $('#Product_product_mrp').val();
        var error = false;
        
      
        if (category_id == '') {
            $('#errormsgCategory').html('Please select category');
            error = true;
        }
        else {
            $('#errormsgCategory').html('');
        }
//        if (product_mrp == '') {
//            $('#errormsgMRP').html('Please enter MRP');
//            error = true;
//        }
//        else {
//            $('#errormsgMRP').html('');
//        }
        if (product_title_eng == '') {
            $('#errormsgProductTitleE').html('Please enter english product title');
            error = true;
        }
        else {
            $('#errormsgProductTitleE').html('');
        }
        if (product_title_chi == '') {
            $('#errormsgProductTitleC').html('Please enter chinese product title');
            error = true;
        }
        else {
            $('#errormsgProductTitleC').html('');
        }
        if (product_model_eng == '') {
            $('#errormsgProductModelE').html('Please enter model number');
            error = true;
        }
        else {
            $('#errormsgProductModelE').html('');
        }
        if (product_model_chi == '') {
            $('#errormsgProductModelC').html('Please enter model number');
            error = true;
        }
        else {
            $('#errormsgProductModelC').html('');
        }
        if (product_image == '' && productImage == '') {
            $('#errormsgProductImage').html('Please upload product image');
            error = true;
        }
        else if (!product_image.match(/\.(jpg|jpeg|png|gif)$/) && product_image!='')
        {
            $('#errormsgProductImage').html('Please upload image type of jpg, jpeg, png, gif');
            error = true;
        }
        else {
            $('#errormsgProductImage').html('');
        }
        if (case_diameter_E == '') {
            $('#errormsgCDE').html('Please enter english case diameter');
            error = true;
        }
        else {
            $('#errormsgCDE').html('');
        }
        if (case_diameter_C == '') {
            $('#errormsgCDC').html('Please enter chinese case diameter');
            error = true;
        }
        else {
            $('#errormsgCDC').html('');
        }
        if (case_E == '') {
            $('#errormsgCE').html('Please enter english case');
            error = true;
        }
        else {
            $('#errormsgCE').html('');
        }
        if (case_C == '') {
            $('#errormsgCC').html('Please enter chinese case');
            error = true;
        }
        else {
            $('#errormsgCC').html('');
        }
        if (dial_color_E == '') {
            $('#errormsgDCE').html('Please enter english dial color');
            error = true;
        }
        else {
            $('#errormsgDCE').html('');
        }
        if (dial_color_C == '') {
            $('#errormsgDCC').html('Please enter chinese dial color');
            error = true;
        }
        else {
            $('#errormsgDCC').html('');
        }
        if (water_resistent_E == '') {
            $('#errormsgWRE').html('Please enter english water resistent');
            error = true;
        }
        else {
            $('#errormsgWRE').html('');
        }
        if (water_resistent_C == '') {
            $('#errormsgWRC').html('Please enter chinese water resisitent');
            error = true;
        }
        else {
            $('#errormsgWRC').html('');
        }
       
       
       
        if (error == false) {
            var $form = $('#product-form');
            var formData = new FormData($form[0]);
            formData.append('ajax', $form.prop('id'))
            //            var data = $("#banner-form").serialize()+"&isAjaxRequest=1";
            $.ajax({
                type: 'POST',
                url: '<?php echo Yii::app()->createAbsoluteUrl("product/update?id=" . $model->id); ?>',
                data: formData,
                contentType: false,
                processData: false,
                success: function(data) {
                    if(data==false){ 
                        window.location.href = '<?php echo Yii::app()->createAbsoluteUrl("product/update?id=" . $model->id); ?>'
                    }else {
                        window.location.href ='<?php echo Yii::app()->createAbsoluteUrl("product/admin"); ?>';
                    }
                },
                error: function(data) { // if error occured
//                    alert("Error occured.please try again");
                    return false;
                }

            });
        }
        else {
            return false;
        }



    }

</script>