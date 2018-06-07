
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
        'myHideEffect', '$(".info").animate({opacity: 1.0}, 3000).fadeOut("slow");', CClientScript::POS_READY
);
?>
<div class="form">
    <?php
    $form = $this->beginWidget('CActiveForm', array(
        'id' => 'category-form',
        // Please note: When you enable ajax validation, make sure the corresponding
        // controller action is handling ajax validation correctly.
        // There is a call to performAjaxValidation() commented in generated controller code.
        // See class documentation of CActiveForm for details on this.
        'enableAjaxValidation' => false,
        'stateful' => true,
        'htmlOptions' => array('enctype' => 'multipart/form-data', 'onsubmit' => "return false;", 'onkeypress' => " if(event.keyCode == 13){ send(); } "
        ),
            ));
    ?>

    <div class="col-sm-12 ">
        <p class="note">Fields with <span class="required">*</span> are required.</p>
        <div class="col-xs-12 lang-cat1"  style="text-align:left;">Collection Details</div>



        <?php echo $form->errorSummary($model); ?>
        <div class="row"><div class="clearfix"></div>
 
            <div class="col-xs-12 col-sm-6  col-md-3 "> <?php echo $form->labelEx($model, 'status'); ?> </div>
            <div class="col-xs-12 col-sm-6  col-md-9 "> <?php
        $accountStatus = array('1' => 'Active', '0' => 'Inactive');
        echo $form->radioButtonList($model, 'status', $accountStatus, array('separator' => ' ', 'labelOptions' => array('style' => 'display:inline'), // add this code
        ));
        ?>            
                <?php echo $form->error($model, 'status'); ?></div>
            <div class="clearfix"></div>
            <div class="col-xs-12 col-sm-6 col-md-3  ">  <label >Collection Image<span class="required"> *</span></label><p style="color:red;">(size should be 252px × 379px)</p></div>
            <div class="col-xs-12 col-sm-6 col-md-9  ">  <?php echo CHtml::activeFileField($model, 'cate_image', array('maxlength' => 255)); ?> 

                <input type="hidden" id="cate_image" value="<?php echo $model->cate_image; ?>"/></div>
            <div class="clearfix"></div>
            <div class="col-xs-12 col-sm-6 col-md-3 ">	   <label>&nbsp;</label></div>
            <div class="col-xs-12 col-sm-6  col-md-9"><p><?php echo $model->cate_image; ?> </p>
                <?php
                if (!empty($model->id) && isset($model->id)) {
                    echo CHtml::image(Yii::app()->request->baseUrl . '/images/upload/category/' . $model->cate_image, "cate_image", array("width" => 150));
                }
                ?>
                <div id="errorCategoryImage" class="errormsg"></div></div>



        </div>
    </div>

    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <div class="col-sm-12 " ><div class="col-xs-12 lang-cat1" style="text-align:left;">Category Specifications</div></div>

    <div class="row">
        <div class="col-xs-12 col-sm-6 ">
            <div class="col-sm-12 " ><div class="col-xs-12 lang-cat1">CN</div></div>


            <div class="col-xs-12 col-sm-6  ">  <?php echo $form->labelEx($model, 'category_title_chi'); ?></div>
            <div class="col-xs-12 col-sm-6  ">  <?php echo $form->textField($model, 'category_title_chi', array('size' => 60, 'maxlength' => 100)); ?>
                <div id="errorCategoryTitleChi" class="errormsg"></div></div>


            <div class="col-xs-12 col-sm-6  "> <?php echo $form->labelEx($model, 'category_name_chi'); ?></div>
            <div class="col-xs-12 col-sm-6  ">  <?php echo $form->textField($model, 'category_name_chi', array('size' => 60, 'maxlength' => 100)); ?>
                <div id="errorCategoryNameChi" class="errormsg"></div></div>

        </div>

        <div class="col-xs-12 col-sm-6 ">
            <div class="col-sm-12 " ><div class="col-xs-12 lang-cat1">EN</div></div>
            <div class="col-xs-12 col-sm-6   ">   <?php echo $form->labelEx($model, 'category_title_eng'); ?></div>
            <div class="col-xs-12 col-sm-6 ">   <?php echo $form->textField($model, 'category_title_eng', array('size' => 60, 'maxlength' => 100)); ?>
                <div id="errorCategoryTitleEng" class="errormsg"></div></div>

            <div class="col-xs-12 col-sm-6  ">  <?php echo $form->labelEx($model, 'category_name_eng'); ?></div>
            <div class="col-xs-12 col-sm-6  ">  <?php echo $form->textField($model, 'category_name_eng', array('size' => 60, 'maxlength' => 100)); ?>
                <div id="errorCategoryNameEng" class="errormsg"></div></div>



        </div>

        <div class="clearfix"></div>
        <div class="col-xs-12 col-sm-6  ">   
            <div class="col-xs-12 col-sm-6  ">   <label>&nbsp;</label> </div>
            <div class="col-xs-12 col-sm-6  ">   <?php echo CHtml::Button('Update', array('onclick' => 'return send();', 'class' => 'black-btn ')); ?>  </div>
        </div>
    </div>

    <?php $this->endWidget(); ?>
</div>
</div><!-- form -->

<script type="text/javascript">

    function send()
    {  
        var cate_title_eng = $('#Category_category_title_eng').val();
        var cate_title_chi = $('#Category_category_title_chi').val();
        var cate_name_eng = $('#Category_category_name_eng').val();
        var cate_name_chi = $('#Category_category_name_chi').val();
        var cate_iamge =   $('#Category_cate_image').val();
        var cateImage =   $('#cate_image').val();
        var error = false;
//        var integerEx =  /^\d*$/ ;
//        var order = $('#Category_order_by').val();        
//        if (order == '') {
//            $('#errormsgOrder').html('Please enter order');
//            error = true;
//        }
//        
//        else if(!integerEx.test(order))
//        {
//            $('#errormsgOrder').html('Please enter order (number only)');
//            error = true;
//        }
//        else {
//            $('#errormsgOrder').html('');
//        }
        if (cate_title_eng == '') {
            $('#errorCategoryTitleEng').html('Please enter english category title');
            error = true;
        }
        else {
            $('#errorCategoryTitleEng').html('');
        }
        if (cate_title_chi == '') {
            $('#errorCategoryTitleChi').html('Please enter chinese category title');
            error = true;
        }
        else {
            $('#errorCategoryTitleChi').html('');
        }
        if (cate_name_eng == '') {
            $('#errorCategoryNameEng').html('Please enter chinese category name');
            error = true;
        }
        else {
            $('#errorCategoryNameEng').html('');
        }
        if (cate_name_chi == '') {
            $('#errorCategoryNameChi').html('Please enter chinese category name');
            error = true;
        }
        else {
            $('#errorCategoryNameChi').html('');
        }
        if (cate_iamge == '' && cateImage == '') {
            $('#errorCategoryImage').html('Please upload category image');
            error = true;
        }
        else if (!cate_iamge.match(/\.(jpg|jpeg|png|gif)$/) && cate_iamge != '')
        {
            $('#errorCategoryImage').html('Please upload image type of jpg, jpeg, png, gif');
            error = true;
        }
        else {
            $('#errorCategoryImage').html('');
        }
        if (error == false) {
            var $form = $('#category-form');
            var formData = new FormData($form[0]);
            formData.append('ajax', $form.prop('id'))
            //            var data = $("#banner-form").serialize()+"&isAjaxRequest=1";
            $.ajax({
                type: 'POST',
                url: '<?php echo Yii::app()->createAbsoluteUrl("category/update?id=" . $model->id); ?>',
                data: formData,
                contentType: false,
                processData: false,
                success: function(data) {
                    
                    if(data==false){ 
                        window.location.href = '<?php echo Yii::app()->createAbsoluteUrl("category/update?id=" . $model->id); ?>'
                    }else {
                        window.location.href ='<?php echo Yii::app()->createAbsoluteUrl("category/admin"); ?>';
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