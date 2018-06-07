<script src="<?php echo Yii::app()->request->baseUrl; ?>/js/jquery.min.js"></script>
<style>.errormsg{ color:#f00; clear: both; text-align: left; padding-left:307px; }
    #addOption{ cursor: pointer; color: #3b85b9; font-weight: bold !important; font-size: 16px; }
</style>
<div class="form">
    <?php
    $form = $this->beginWidget('CActiveForm', array(
        'id' => 'news-form',
        'enableAjaxValidation' => false,
        'htmlOptions' => array('enctype' => 'multipart/form-data')));
    ?>

        <div class="col-sm-12 ">
        <p class="note">Fields with <span class="required">*</span> are required.</p>
		<div class="col-xs-12 lang-cat1"  style="text-align:left;">News Details</div>
     <div class="row">
	 
	
        <div class="col-xs-12 col-sm-6 col-md-3  ">   <?php echo $form->labelEx($model, 'news_year'); ?></div>
         <div class="col-xs-12 col-sm-6 col-md-3  ">  <?php //echo $form->textField($model, 'expiry'); ?>
        <?php
        $this->widget('zii.widgets.jui.CJuiDatePicker', array(
            'model' => $model,
            'attribute' => 'news_year',
            'options' => array(
                'readonly' => 'readonly',
                'buttonImage' => Yii::app()->request->baseUrl . '/images/calendar.png',
                'buttomImageOnly' => true,
                'buttonText' => 'Select',
                'showAnim' => 'fold',
                'showOn' => 'button',
                'dateFormat' => 'yy-mm-dd',
                'yearRange' => '1990:2100', //Varun-28-Mar-2013-Bug#1100
                //       'yearRange'=>'1900',
                'changeYear' => 'true',
                'changeMonth' => 'true',
//                'minDate' => 0,
            ), 'htmlOptions' => array(
                'readonly' => 'readonly',
            //'style'=>'height:16px; width:65px;',
            ),
        ));
        ?>
        <div id="news_year" class="errormsg"></div></div>
		  <div class="clearfix"></div>
		<div class="col-xs-12 col-sm-6 col-md-3  "> <?php echo $form->labelEx($model, 'news_image'); ?></div>
       <div class="col-xs-12 col-sm-6 col-md-9  "> <?php echo CHtml::activeFileField($model, 'news_image', array('maxlength' => 255)); ?>
        <input type="hidden" id="news_imageH" value="<?php echo $model->news_image;?>"/></div>
		 <div class="clearfix"></div>
		 <div class="col-xs-12 col-sm-6 col-md-3  "> <label>&nbsp;</label></div>
		<div class="col-xs-12 col-sm-6 col-md-9  "><p><?php echo $model->news_image; ?> </p>
            <?php echo CHtml::image(Yii::app()->request->baseUrl.'/images/upload/news/'.$model->news_image,"news_image",array("width"=>150)); ?>  
        <div id="news_image" class="errormsg"></div></div>
    
	<div class="col-xs-12 col-sm-6 col-md-3  "> <?php echo $form->labelEx($model, 'status'); ?></div>
      <div class="col-xs-12 col-sm-6 col-md-9  ">   <?php
        $accountStatus = array('1' => 'Active', '0' => 'Inactive');
        echo $form->radioButtonList($model, 'status', $accountStatus, array('separator' => ' ', 'labelOptions' => array('style' => 'display:inline'), // add this code
        ));
        ?></div>
	 
	 </div>
       </div>
	   
	   
 <p>&nbsp;</p>
    <p>&nbsp;</p>
	<div class="col-sm-12 " ><div class="col-xs-12 lang-cat1" style="text-align:left;">News Specifications</div></div>
    <div class="row"> 
     <div class="col-xs-12 col-sm-6 col-md-6  ">
              <div class="col-sm-12 " > <div class=" col-xs-12 lang-cat2">CN</div></div>
        
   

<!--         <div class="col-xs-12 col-sm-6 col-md-6  ">   <?php // echo $form->labelEx($model, 'news_title_C'); ?>  </div>
          <div class="col-xs-12 col-sm-6 col-md-6  ">  <?php // echo $form->textField($model, 'news_title_C', array('size' => 60, 'maxlength' => 255)); ?>
        <div id="news_title_C" class="errormsg"></div>  </div>-->
		
		
         <div class="col-xs-12 col-sm-6 col-md-6  ">   <?php echo $form->labelEx($model, 'news_header_C'); ?>  </div>
          <div class="col-xs-12 col-sm-6 col-md-6  ">  <?php echo $form->textField($model, 'news_header_C', array('size' => 60, 'maxlength' => 255)); ?>
        <div id="news_header_C" class="errormsg"></div>  </div>
		
		   <div class="col-xs-12 col-sm-12 col-md-12  ">  <?php echo CHtml::label('Part 1', 'Part 1'); ?></div>
          <div class="col-xs-12 col-sm-12 col-md-12  ">  <?php echo $form->textArea($model, 'news_desc_C', array('rows' => 6, 'cols' => 50)); ?>
        <div id="news_desc_C" class="errormsg"></div>  </div>
		
		
		   <div class="col-xs-12 col-sm-12 col-md-12  ">  <?php echo CHtml::label('Part 2', 'Part 2'); ?></div>
         <div class="col-xs-12 col-sm-12 col-md-12  ">   <?php echo $form->textArea($model, 'news_long_desc_C', array('rows' => 6, 'cols' => 50)); ?>
        <div id="news_long_desc_C" class="errormsg"></div>  </div>
    </div>
	 <div class="col-xs-12 col-sm-6 col-md-6  ">
         <div class="col-sm-12 " ><div class="col-xs-12 lang-cat1">EN</div></div>  
		 
<!--		  <div class="col-xs-12 col-sm-6 col-md-6  "> <?php // echo $form->labelEx($model, 'news_title_E'); ?></div>
         <div class="col-xs-12 col-sm-6 col-md-6  "> <?php // echo $form->textField($model, 'news_title_E', array('size' => 60, 'maxlength' => 255)); ?>
        <div id="news_title_E" class="errormsg"></div>  </div>-->
   
        <div class="col-xs-12 col-sm-6 col-md-6  ">  <?php echo $form->labelEx($model, 'news_header_E'); ?>  </div>
         <div class="col-xs-12 col-sm-6 col-md-6  "> <?php echo $form->textField($model, 'news_header_E', array('size' => 60, 'maxlength' => 255)); ?>
        <div id="news_header_E" class="errormsg"></div>  </div>
  
  
  
         <div class="col-xs-12 col-sm-12 col-md-12  "> <?php echo CHtml::label('Part 1', 'Part 1'); ?></div>
        <div class="col-xs-12 col-sm-12 col-md-12  ">  <?php echo $form->textArea($model, 'news_desc_E', array('rows' => 6, 'cols' => 50)); ?>
        <div id="news_desc_E" class="errormsg"></div>  </div>
  
       

   
        <div class="col-xs-12 col-sm-12 col-md-12  ">  <?php echo CHtml::label('Part 2', 'Part 2'); ?></div>
        <div class="col-xs-12 col-sm-12 col-md-12  ">  <?php echo $form->textArea($model, 'news_long_desc_E', array('rows' => 6, 'cols' => 50)); ?>
        <div id="news_long_desc_E" class="errormsg"></div>  </div>
   
   
       
    </div>
    
    <div class="clearfix"></div>
    <div class="col-xs-12 col-sm-6 col-md-6  "> 
       
        <div class="col-xs-12 col-sm-6 col-md-6  ">  <input type="button" onclick="return validate();" value="Update" name=""></div>
		 <div class="col-xs-12 col-sm-6 col-md-6  ">  <label>&nbsp;</label></div>
    </div>
	 <div class="col-xs-12 col-sm-6 col-md-6  "> </div>
</div>
    <?php $this->endWidget(); ?>
</div>
    <!-- form -->
    <script type="text/javascript">
        function validate (){ 
//            var News_news_title_E = $('#News_news_title_E').val(); 
//            var News_news_title_C = $('#News_news_title_C').val(); 
            var News_news_header_E = $('#News_news_header_E').val(); 
            var News_news_header_C = $('#News_news_header_C').val(); 
            var News_news_year = $('#News_news_year').val(); 
            var News_news_desc_E = $('#News_news_desc_E').val(); 
            var News_news_desc_C = $('#News_news_desc_C').val(); 
            var News_news_long_desc_E = $('#News_news_long_desc_E').val(); 
            var News_news_long_desc_C = $('#News_news_long_desc_C').val(); 
            var News_news_image = $('#News_news_image').val(); 
             var news_imageI = $('#news_imageI').val();
           
            var error = false;
//            if (News_news_title_E == '') {
//                $('#news_title_E').html('Please enter news title in english');
//                error = true;
//            }
//            else {
//                $('#news_title_E').html('');
//            }
//            
//            if (News_news_title_C == '') {
//                $('#news_title_C').html('Please enter news title in chinese');
//                error = true;
//            }
//            else {
//                $('#news_title_C').html('');
//            }
            
            if (News_news_header_E == '') {
                $('#news_header_E').html('Please enter news header in english');
                error = true;
            }
            else {
                $('#news_header_E').html('');
            }
            
            if (News_news_header_C == '') {
                $('#news_header_C').html('Please enter news header in chinese');
                error = true;
            }
            else {
                $('#news_header_C').html('');
            }
            if (News_news_year == '') {
                $('#news_year').html('Please enter news year');
                error = true;
            }
            else {
                $('#news_year').html('');
            }
            if (News_news_desc_E == '') {
                $('#news_desc_E').html('Please enter news description in english');
                error = true;
            }
            else {
                $('#news_desc_E').html('');
            }
            if (News_news_desc_E == '') {
                $('#news_desc_E').html('Please enter news description in english');
                error = true;
            }
            else {
                $('#news_desc_E').html('');
            }
            if (News_news_desc_C == '') {
                $('#news_desc_C').html('Please enter news description in chinese');
                error = true;
            }
            else {
                $('#news_desc_C').html('');
            }
//            if (News_news_long_desc_E == '') {
//                $('#news_long_desc_E').html('Please enter news long description in english');
//                error = true;
//            }
//            else {
//                $('#news_long_desc_E').html('');
//            }
//            if (News_news_long_desc_C == '') {
//                $('#news_long_desc_C').html('Please enter news long description in chinese');
//                error = true;
//            }
//            else {
//                $('#news_long_desc_C').html('');
//            }
            
            if (News_news_image == '' && news_imageI=='') {
            $('#news_image').html('Please upload news image');
            error = true;
           
        }
        else if (!News_news_image.match(/\.(jpg|jpeg|png|gif)$/) && News_news_image!='')
        {
            $('#news_image').html('Please upload image type of jpg, jpeg, png, gif');
            error = true;
        }


        else {
            $('#news_image').html('');
        }
              
            if (error == false) {
                var $form = $('#news-form');
                var formData = new FormData($form[0]);
                formData.append('ajax', $form.prop('id'))
                $.ajax({
                
                    type: 'POST',
                    url: '<?php echo Yii::app()->createAbsoluteUrl("news/update?id=". $model->id); ?>',
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function(data) {
                        window.location.href = '<?php echo Yii::app()->createAbsoluteUrl("news/admin"); ?>';
                    },
                    error: function(data) { // if error occured
                        alert("Error occured.please try again");
                        return false;
                    }

                });
            }
            else {
                return false;
            }
        }
    </script>