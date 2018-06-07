<script src="<?php echo Yii::app()->request->baseUrl; ?>/js/jquery.min.js"></script>
<style>.errormsg{ color:#f00; clear: both; text-align: left; padding-left:307px; }
    #addOption{ cursor: pointer; color: #3b85b9; font-weight: bold !important; font-size: 16px; }
</style>

<div class="form">

    <?php
    $form = $this->beginWidget('CActiveForm', array(
        'id' => 'store-form',
        // Please note: When you enable ajax validation, make sure the corresponding
        // controller action is handling ajax validation correctly.
        // There is a call to performAjaxValidation() commented in generated controller code.
        // See class documentation of CActiveForm for details on this.
        'enableAjaxValidation' => false,
    ));
    ?>

    <div class="col-sm-12 ">
        <p class="note">Fields with <span class="required">*</span> are required.</p>
        <div class="col-xs-12 lang-cat1"  style="text-align:left;">Store Details</div>



        <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-3 ">      <?php echo $form->labelEx($model, 'status'); ?> </div>
            <div class="col-xs-12 col-sm-6 col-md-9 ">  <?php
                $accountStatus = array('1' => 'Active', '0' => 'Inactive');
                echo $form->radioButtonList($model, 'status', $accountStatus, array('separator' => ' ', 'labelOptions' => array('style' => 'display:inline'), // add this code
                ));
                ?>
            </div>
        </div>
    </div>




    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <div class="col-sm-12 " ><div class="col-xs-12 lang-cat1" style="text-align:left;">Store Specifications</div></div>

    <div class="row">
        <div class="col-xs-12 col-sm-6 ">
            <div class="col-sm-12 " ><div class="col-xs-12 lang-cat1">CN</div></div>
            <div class="col-xs-12 col-sm-6 "> <?php echo $form->labelEx($model, 'city_chi'); ?></div>
            <div class="col-xs-12 col-sm-6 "> <?php echo $form->textField($model, 'city_chi', array('size' => 60, 'maxlength' => 100)); ?>
                <div id="errorCityC" class="errormsg"></div></div>


            <div class="col-xs-12 col-sm-6 "> <?php echo $form->labelEx($model, 'shop_name_chi'); ?></div>
            <div class="col-xs-12 col-sm-6 ">   <?php echo $form->textField($model, 'shop_name_chi', array('size' => 60, 'maxlength' => 100)); ?>
                <div id="errorShopNameC" class="errormsg"></div></div>


            <div class="col-xs-12 col-sm-12 "> <?php echo $form->labelEx($model, 'address_chi'); ?></div>

            <div class="col-xs-12 col-sm-12 "><textarea name="address_chi" id="address_chi" class="editor">
                </textarea>
                <div id="errormsgcontent_C" class="errormsg"></div></div>


        </div>


        <div class="col-xs-12 col-sm-6 ">
            <div class="col-sm-12 " ><div class="col-xs-12 lang-cat1">EN</div></div>

            <div class="col-xs-12 col-sm-6 ">  <?php echo $form->labelEx($model, 'city_eng'); ?></div>
            <div class="col-xs-12 col-sm-6 "> <?php echo $form->textField($model, 'city_eng', array('size' => 60, 'maxlength' => 100)); ?>
                <div id="errorCityE" class="errormsg"></div></div>
            <div class="col-xs-12 col-sm-6 "> <?php echo $form->labelEx($model, 'shop_name_eng'); ?></div>
            <div class="col-xs-12 col-sm-6 "> <?php echo $form->textField($model, 'shop_name_eng', array('size' => 60, 'maxlength' => 100)); ?>
                <div id="errorShopNameE" class="errormsg"></div></div>



            <div class="col-xs-12 col-sm-12 "> <?php echo $form->labelEx($model, 'address_eng'); ?> </div>

            <div class="col-xs-12 col-sm-12 "> <textarea name="address_eng" id="address_eng" class="editor">
                </textarea>
                <div id="errormsgcontent_E" class="errormsg"></div> </div>


        </div>
        <div class="clearfix"></div>

        <div class="col-xs-12 col-sm-6 "> 

            <div class="col-xs-12 col-sm-6 ">   <input type="button" onclick="return validate();" value="Add" name=""> </div>
            <div class="col-xs-12 col-sm-6 ">  <label>&nbsp;</label> </div>
        </div>
        <div class="col-xs-12 col-sm-6 ">  </div>
        <?php $this->endWidget(); ?>
    </div>
</div><!-- form -->

<script src="<?php echo Yii::app()->request->baseUrl; ?>/js/ckeditor/ckeditor.js" type="text/javascript" language="javascript"></script>
<script src="<?php echo Yii::app()->request->baseUrl; ?>/js/ckfinder/ckfinder.js" type="text/javascript" language="javascript"></script>
<script src="<?php echo Yii::app()->request->baseUrl; ?>/js/ckeditor/adapters/jquery.js" type="text/javascript" language="javascript"></script>
<script type="text/javascript">

                $(document).ready(function () {
                    CKEDITOR.replace('address_chi', {
                        toolbar: [
                            {name: 'document', items: ['Source']}, // Defines toolbar group with name (used to create voice label) and items in 3 subgroups.
                            {name: 'basicstyles', items: ['Bold', 'Italic', 'Underline']},
                            {name: 'styles', items: ['Styles', 'Format']},
                            {name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-']},
                        ]
                    });
                    CKEDITOR.replace('address_eng', {
                        toolbar: [
                            {name: 'document', items: ['Source']}, // Defines toolbar group with name (used to create voice label) and items in 3 subgroups.
                            {name: 'basicstyles', items: ['Bold', 'Italic', 'Underline']},
                            {name: 'styles', items: ['Styles', 'Format']},
                            {name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-']},
                        ]
                    });

                });

                function validate() {
                    var Store_city_eng = $('#Store_city_eng').val();
                    var Store_city_chi = $('#Store_city_chi').val();
                    var Store_shop_name_eng = $('#Store_shop_name_eng').val();
                    var Store_shop_name_chi = $('#Store_shop_name_chi').val();
                    var contentTxtE = CKEDITOR.instances.address_eng.getData();
                    var contentTxtC = CKEDITOR.instances.address_chi.getData();
                    contentTxtE = contentTxtE.replace(/\s|&nbsp;/g, '');
                    contentTxtC = contentTxtC.replace(/\s|&nbsp;/g, '');
                    for (instance in CKEDITOR.instances) {
                        CKEDITOR.instances[instance].updateElement();
                    }
                    var error = false;
                    if (Store_city_eng == '') {
                        $('#errorCityE').html('Please enter city name in english');
                        error = true;
                    }
                    else {
                        $('#errorCityE').html('');
                    }
                    if (Store_city_chi == '') {
                        $('#errorCityC').html('Please enter city name in chinese');
                        error = true;
                    }
                    else {
                        $('#errorCityC').html('');
                    }
                    if (Store_shop_name_eng == '') {
                        $('#errorShopNameE').html('Please enter shop name in english');
                        error = true;
                    }
                    else {
                        $('#errorShopNameE').html('');
                    }
                    if (Store_shop_name_chi == '') {
                        $('#errorShopNameC').html('Please enter shop name in chinese');
                        error = true;
                    }
                    else {
                        $('#errorShopNameC').html('');
                    }

                    if (jQuery(contentTxtE).length == 0) {
                        jQuery('#errormsgcontent_E').html('<label  style = "margin-left:10px;color:#f00; " class="error" >Please enter store name in english.</label>');
                        error = true;
                    }
                    else {
                        $('#errormsgcontent_E').html('');
                    }
                    if (jQuery(contentTxtC).length == 0) {
                        jQuery('#errormsgcontent_C').html('<label  style = "margin-left:10px;color:#f00; " class="error" >Please enter store name in chinese</label>');
                        error = true;
                    }
                    else {
                        $('#errormsgcontent_C').html('');
                    }
                    if (error == false) {
                        //            var $form = $('#content-form');
                        //            var formD = $('#content-form').serialize();
                        var formD = $('#store-form').find('input, select, textarea, button').serialize();
                        $.ajax({
                            type: 'POST',
                            url: '<?php echo Yii::app()->createAbsoluteUrl("store/create"); ?>',
                            data: formD,
                            success: function (data) {
                                window.location.href = '<?php echo Yii::app()->createAbsoluteUrl("store/admin"); ?>';
                            },
                            error: function (data) { // if error occured
                                return false;
                            }

                        });
                    }
                    else {
                        return false;
                    }
                }
</script>