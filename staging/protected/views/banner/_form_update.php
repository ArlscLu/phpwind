<script src="<?php echo Yii::app()->request->baseUrl; ?>/js/jquery.min.js"></script>
<?php
/* @var $this BannerController */
/* @var $model Banner */
/* @var $form CActiveForm */
?>
<style>.errormsg{ color:#f00; clear: both; text-align: left; padding-left:307px; }
    #addOption{ cursor: pointer; color: #3b85b9; font-weight: bold !important; font-size: 16px; }
</style>
<div class="form">

    <?php
    $form = $this->beginWidget('CActiveForm', array(
        'id' => 'banner-form',
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
        <div class="col-xs-12 lang-cat1"  style="text-align:left;">Banner Details</div>


        <div class="row">

            <div class="col-xs-12 col-sm-6 col-md-3 "> <?php echo CHtml::label('Product Page', 'Product Page'); ?>  </div>
            <div class="col-xs-12 col-sm-6 col-md-9 ">  <?php echo $form->dropDownList($model, 'product_page', CHtml::listData(Product::model()->findAll(array('select' => '*', 'condition' => 'status="1"')), 'id', 'product_model_eng'), array('empty' => '-- Select Product --', 'options' => '')) ?>
            </div>  

            <div class="clearfix"></div>

            <div class="col-xs-12 col-sm-6 col-md-3  "><?php echo CHtml::label('Collections', 'Collections'); ?>  </div>
            <div class="col-xs-12 col-sm-6 col-md-9 "> <?php echo $form->dropDownList($model, 'category_page', CHtml::listData(Category::model()->findAll(array('select' => '*', 'condition' => 'status="1"')), 'id', 'category_title_eng'), array('empty' => '-- Select Collection --', 'options' => '')) ?>
                <div id="errormsgCategoryProduct" class="errormsg"></div>  </div>




            <div class="col-xs-12 col-sm-6 col-md-3  "> <?php echo $form->labelEx($model, 'status'); ?>  </div>
            <div class="col-xs-12 col-sm-6 col-md-9 ">   <?php
    $accountStatus = array('1' => 'Active', '0' => 'Inactive');
    echo $form->radioButtonList($model, 'status', $accountStatus, array('separator' => ' ', 'labelOptions' => array('style' => 'display:inline'), // add this code
    ));
    ?>  </div>









        </div>
    </div>





    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <div class="col-sm-12 " ><div class="col-xs-12 lang-cat1" style="text-align:left;">Banner Specifications</div></div>
    <div class="row">
        <div class="col-xs-12 col-sm-6 ">
            <div class="col-sm-12 " ><div class="col-xs-12 lang-cat1">CN</div></div>
            <div class="col-xs-12 col-sm-6   "> <?php echo $form->labelEx($model, 'banner_title_chi'); ?>  </div>
            <div class="col-xs-12 col-sm-6 "> <?php echo $form->textField($model, 'banner_title_chi', array('size' => 60, 'maxlength' => 100)); ?>
                <div id="errormsgTitleChinese" class="errormsg"></div>  </div>
            <div class="col-xs-12 col-sm-6  ">   <?php echo $form->labelEx($model, 'banner_alt_title_chi'); ?></div>
            <div class="col-xs-12 col-sm-6  ">  <?php echo $form->textField($model, 'banner_alt_title_chi', array('size' => 60, 'maxlength' => 100)); ?>
                <div id="errormsgAltTitleChinese" class="errormsg"></div></div>
            <div class="col-xs-12 col-sm-6  ">  <label>Img Desc (CN) <span class="required">*</span></label></div>
            <div class="col-xs-12 col-sm-6  ">  <?php echo CHtml::activeFileField($model, 'banner_image_chi', array('maxlength' => 255)); ?> 
                <input type="hidden" id="banner_image_chi" value="<?php echo $model->banner_image_chi; ?>"/></div>
            <div class="clearfix"></div>
            <div class="col-xs-12 col-sm-6   ">   <label>&nbsp;</label></div>
            <div class="col-xs-12 col-sm-6  ">  <p><?php echo $model->banner_image_chi; ?> </p>
                <?php echo CHtml::image(Yii::app()->request->baseUrl . '/images/upload/' . $model->banner_image_chi, "banner_image_chi", array("width" => 150)); ?> 
                <div id="errormsgImageChinese" class="errormsg"></div>  </div>

            <div class="col-xs-12 col-sm-6  "> <label>Mobile Banner (CN)<span class="required">*</span></label></div>
            <div class="col-xs-12 col-sm-6  "> <?php echo CHtml::activeFileField($model, 'banner_mobile_image_chi', array('maxlength' => 255)); ?> 
                <input type="hidden" id="banner_mobile_image_chi" value="<?php echo $model->banner_mobile_image_chi; ?>"/></div>
            <div class="clearfix"></div>
            <div class="col-xs-12 col-sm-6   ">   <label>&nbsp;</label></div>
            <div class="col-xs-12 col-sm-6  ">  <p><?php echo $model->banner_mobile_image_chi; ?> </p>
                <?php echo CHtml::image(Yii::app()->request->baseUrl . '/images/upload/' . $model->banner_mobile_image_chi, "banner_mobile_image_chi", array("width" => 150)); ?> 
                <div id="errormsgMobileCN" class="errormsg"></div> </div>
        </div>
        <div class="col-xs-12 col-sm-6 ">
            <div class="col-sm-12 " ><div class="col-xs-12 lang-cat1">EN</div></div>

            <div class="col-xs-12 col-sm-6   ">  <?php echo $form->labelEx($model, 'banner_title_eng'); ?></div>
            <div class="col-xs-12 col-sm-6  ">  <?php echo $form->textField($model, 'banner_title_eng', array('size' => 60, 'maxlength' => 100)); ?>
                <div id="errormsgTitleEnglish" class="errormsg"></div></div>
            <div class="col-xs-12 col-sm-6  ">   <?php echo $form->labelEx($model, 'banner_alt_title_eng'); ?></div>
            <div class="col-xs-12 col-sm-6  ">  <?php echo $form->textField($model, 'banner_alt_title_eng', array('size' => 60, 'maxlength' => 100)); ?>
                <div id="errormsgAltTitleEnglish" class="errormsg"></div></div>

            <div class="col-xs-12 col-sm-6 "><label>Img Desc (EN) <span class="required">*</span></label></div>
            <div class="col-xs-12 col-sm-6  "> <?php echo CHtml::activeFileField($model, 'banner_image_eng', array('maxlength' => 255)); ?>
                <input type="hidden" id="banner_image_eng" value="<?php echo $model->banner_image_eng; ?>"/> </div>
            <div class="clearfix"></div>
            <div class="col-xs-12 col-sm-6   "><label>&nbsp;</label> </div>
            <div class="col-xs-12 col-sm-6  "><p><?php echo $model->banner_image_eng; ?> </p>
                <?php echo CHtml::image(Yii::app()->request->baseUrl . '/images/upload/' . $model->banner_image_eng, "banner_image_eng", array("width" => 150)); ?>  
                <div id="errormsgImagenglish" class="errormsg"></div>  </div>
            <div class="col-xs-12 col-sm-6  "> <label>Mobile Banner (EN)<span class="required">*</span></label></div>
            <div class="col-xs-12 col-sm-6  "> <?php echo CHtml::activeFileField($model, 'banner_mobile_image', array('maxlength' => 255)); ?> 
                <input type="hidden" id="banner_mobile_image" value="<?php echo $model->banner_mobile_image; ?>"/></div>
            <div class="clearfix"></div>
            <div class="col-xs-12 col-sm-6   ">   <label>&nbsp;</label></div>
            <div class="col-xs-12 col-sm-6  ">  <p><?php echo $model->banner_mobile_image; ?> </p>
                <?php echo CHtml::image(Yii::app()->request->baseUrl . '/images/upload/' . $model->banner_mobile_image, "banner_mobile_image", array("width" => 150)); ?> 
                <div id="errormsgMobileEN" class="errormsg"></div> </div>





        </div>
        <div class="clearfix"></div>
        <div class="col-xs-12 col-sm-6   ">
            <div class="col-xs-12 col-sm-6  ">
                <label>&nbsp;</label> </div>  
            <div class="col-xs-12 col-sm-6  "><?php echo CHtml::Button('Update', array('onclick' => 'return send();', 'class' => 'black-btn ')); ?> 
            </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6  "></div>
        <?php $this->endWidget(); ?>
    </div><!-- form -->

    <script type="text/javascript">

        function send()
        {  
            var banner_title_eng = $('#Banner_banner_title_eng').val();
            var banner_title_chi = $('#Banner_banner_title_chi').val();
            var banner_alt_title_eng = $('#Banner_banner_alt_title_eng').val();
            var banner_alt_title_chi = $('#Banner_banner_alt_title_chi').val();
            var product_page =   $('#Banner_product_page').val();
            var category_page = $('#Banner_category_page').val();
            var banner_image_eng = $('#Banner_banner_image_eng').val();
            var banner_image_chi = $('#Banner_banner_image_chi').val();
            var ImageEng = $('#banner_image_eng').val();
            var ImageChi = $('#banner_image_chi').val();
            var mobEN = $('#banner_mobile_image').val();
            var mobCN = $('#banner_mobile_image_chi').val();
            var banner_mobile_image = $('#Banner_banner_mobile_image').val();
            var banner_mobile_image_chi = $('#Banner_banner_mobile_image_chi').val();
            
            var error = false;
       
            if (banner_alt_title_eng == '') {
                $('#errormsgAltTitleEnglish').html('Please enter chinese banner Alt title');
                error = true;
            }
            else {
                $('#errormsgAltTitleEnglish').html('');
            }
            if (banner_alt_title_chi == '') {
                $('#errormsgAltTitleChinese').html('Please enter chinese banner Alt title');
                error = true;
            }
            else {
                $('#errormsgAltTitleChinese').html('');
            }
            if (banner_title_eng == '') {
                $('#errormsgTitleEnglish').html('Please enter english banner title');
                error = true;
            }
            else {
                $('#errormsgTitleEnglish').html('');
            }
            if (banner_title_chi == '') {
                $('#errormsgTitleChinese').html('Please enter chinese banner title');
                error = true;
            }
            else {
                $('#errormsgTitleChinese').html('');
            }
            if (banner_image_eng == '' && ImageEng=='') {
                $('#errormsgImagenglish').html('Please upload english banner');
                error = true;
            }
            else if (!banner_image_eng.match(/\.(jpg|jpeg|png|gif)$/) && banner_image_eng!='' )
            {
                $('#errormsgImagenglish').html('Please upload image type of jpg, jpeg, png, gif');
                error = true;
            }
            else {
                $('#errormsgImagenglish').html('');
            }
            if (banner_image_chi == '' && ImageChi=='') {
                $('#errormsgImageChinese').html('Please upload chinese banner');
                error = true;
           
            }
            else if (!banner_image_chi.match(/\.(jpg|jpeg|png|gif)$/) && banner_image_chi!='')
            {
                $('#errormsgImageChinese').html('Please upload image type of jpg, jpeg, png, gif');
                error = true;
            }


            else {
                $('#errormsgImageChinese').html('');
            }
       
            if (product_page == '' && category_page=='') {
                $('#errormsgCategoryProduct').html('Please select product page or category page');
                error = true;
            }
      
            else {
                $('#errormsgCategoryProduct').html('');
            }
                
            if (banner_mobile_image == '' && mobEN=='') {
                $('#errormsgMobileEN').html('Please upload english mobile banner');
                error = true;
            }
            else if (!banner_mobile_image.match(/\.(jpg|jpeg|png|gif)$/) && banner_mobile_image!='' )
            {
                $('#errormsgMobileEN').html('Please upload image type of jpg, jpeg, png, gif');
                error = true;
            }
            else {
                $('#errormsgMobileEN').html('');
            }
                
            if (banner_mobile_image_chi == '' && mobCN=='') {
                $('#errormsgMobileCN').html('Please upload chinese mobile banner');
                error = true;
            }
            else if (!banner_mobile_image_chi.match(/\.(jpg|jpeg|png|gif)$/) && banner_mobile_image_chi!='' )
            {
                $('#errormsgMobileCN').html('Please upload image type of jpg, jpeg, png, gif');
                error = true;
            }
            else {
                $('#errormsgMobileCN').html('');
            }
               
            if (error == false) {
                var $form = $('#banner-form');
                var formData = new FormData($form[0]);
                formData.append('ajax', $form.prop('id'))
                //            var data = $("#banner-form").serialize()+"&isAjaxRequest=1";
                $.ajax({
                    type: 'POST',
                    url: '<?php echo Yii::app()->createAbsoluteUrl("banner/update?id=" . $model->id); ?>',
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function(data) {
                        window.location.href = "<?php echo Yii::app()->createAbsoluteUrl('banner/admin') ?>" ;
                    },
                    error: function(data) { // if error occured
//                        alert("Error occured.please try again");
                        return false;
                    }

                });
            }
            else {
                return false;
            }



        }

    </script>