<script src="<?php echo Yii::app()->request->baseUrl; ?>/js/jquery.min.js"></script>
<style>.errormsg{ color:#f00; clear: both; text-align: left; padding-left:307px; }
    #addOption{ cursor: pointer; color: #3b85b9; font-weight: bold !important; font-size: 16px; }
</style>
<div class="form">

    <?php
    $form = $this->beginWidget('CActiveForm', array(
        'id' => 'content-form',
        // Please note: When you enable ajax validation, make sure the corresponding
        // controller action is handling ajax validation correctly.
        // There is a call to performAjaxValidation() commented in generated controller code.
        // See class documentation of CActiveForm for details on this.
        'enableAjaxValidation' => false,
        'stateful' => true,
        'htmlOptions' => array('enctype' => 'multipart/form-data',
        ),
            ));
    ?>

   <div class="col-sm-12 ">
        <p class="note">Fields with <span class="required">*</span> are required.</p>
		<div class="col-xs-12 lang-cat1"  style="text-align:left;">Content Details</div>
     <div class="row">
	          <div class="col-xs-12 col-sm-6 col-md-3  ">  <?php echo $form->labelEx($model, 'status'); ?> </div>
          <div class="col-xs-12 col-sm-6 col-md-9  "><?php
        $accountStatus = array('1' => 'Active', '0' => 'Inactive');
        echo $form->radioButtonList($model, 'status', $accountStatus, array('separator' => ' ', 'labelOptions' => array('style' => 'display:inline'), // add this code
        ));
        ?> </div>
			
		  </div>
  </div>		  
			
			
		    	   
 <p>&nbsp;</p>
    <p>&nbsp;</p>
	<div class="col-sm-12 " ><div class="col-xs-12 lang-cat1" style="text-align:left;">Content Specifications</div></div>
    <div class="row"> 
           <div class="col-xs-12 col-sm-6 col-md-6  ">	
			
			   <div class="col-sm-12 " > <div class=" col-xs-12 lang-cat2">CN</div></div>
              <div class="col-xs-12 col-sm-6 col-md-6  ">	  <?php echo $form->labelEx($model, 'content_title_C'); ?></div>
				 <div class="col-xs-12 col-sm-6 col-md-6  ">		<input type ="text" name ="content_title_C" id ="content_title_C" >
					<div id="errormsgtitle_C" class="errormsg"></div></div>
				
				
				 <div class="col-xs-12 col-sm-12 col-md-12  ">	 <?php echo $form->labelEx($model, 'content_C'); ?></div>
    <div class="col-xs-12 col-sm-12 col-md-12  ">	 <textarea name="content_C" id="content_C" class="editor">
        </textarea>
        <div id="errormsgcontent_C" class="errormsg"></div></div>
				 
    </div>
   <div class="col-xs-12 col-sm-6 col-md-6  ">
      <div class="col-sm-12 " ><div class=" col-xs-12 lang-cat2">EN</div></div>
        
	
	   <div class="col-xs-12 col-sm-6 col-md-6  ">	 <?php echo $form->labelEx($model, 'content_title_E'); ?></div>
       <div class="col-xs-12 col-sm-6 col-md-6  ">	  <input type ="text" name ="content_title_E" id ="content_title_E">
        <div id="errormsgtitle_E" class="errormsg"></div></div>
	 

	 <div class="col-xs-12 col-sm-12 col-md-12  ">	 <?php echo $form->labelEx($model, 'content_E'); ?> </div>
   

         <div class="col-xs-12 col-sm-12 col-md-12  ">	<textarea name="content_E" id="content_E" class="editor">
        </textarea>
        <div id="errormsgcontent_E" class="errormsg"></div></div>
	
	</div>
	
	





<div class="clearfix"></div>
    <div class="col-xs-12 col-sm-6 col-md-6  ">	
	   
         <div class="col-xs-12 col-sm-6 col-md-6  ">	 <input type="button" onclick="return validate();" value="Add" name=""></div>
		  <div class="col-xs-12 col-sm-6 col-md-6  ">	<label>&nbsp;</label></div>
    </div>
	  <div class="col-xs-12 col-sm-6 col-md-6  ">	</div>
</div>
    <?php $this->endWidget(); ?>

</div><!-- form -->
<script src="<?php echo Yii::app()->request->baseUrl; ?>/js/ckeditor/ckeditor.js" type="text/javascript" language="javascript"></script>
<script src="<?php echo Yii::app()->request->baseUrl; ?>/js/ckfinder/ckfinder.js" type="text/javascript" language="javascript"></script>
<script src="<?php echo Yii::app()->request->baseUrl; ?>/js/ckeditor/adapters/jquery.js" type="text/javascript" language="javascript"></script>
<script type="text/javascript">

    $(document).ready(function() {
       CKEDITOR.replace('content_C', {
                        toolbar: [
                            {name: 'document', items: ['Source']}, // Defines toolbar group with name (used to create voice label) and items in 3 subgroups.
                            {name: 'basicstyles', items: ['Bold', 'Italic', 'Underline']},
                            {name: 'styles', items: ['Styles', 'Format']},
                            {name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-']},
                        ]
                    });
         CKEDITOR.replace('content_E', {
                        toolbar: [
                            {name: 'document', items: ['Source']}, // Defines toolbar group with name (used to create voice label) and items in 3 subgroups.
                            {name: 'basicstyles', items: ['Bold', 'Italic', 'Underline']},
                            {name: 'styles', items: ['Styles', 'Format']},
                            {name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-']},
                        ]
                    });
    });
   
    function validate (){
        var content_title_E = $('#content_title_E').val();
        var content_title_C = $('#content_title_C').val();
        var contentTxtE = CKEDITOR.instances.content_E.getData();  
        var contentTxtC = CKEDITOR.instances.content_C.getData();  
        contentTxtE = contentTxtE.replace(/\s|&nbsp;/g, '');    
        contentTxtC = contentTxtC.replace(/\s|&nbsp;/g, '');    
        for (instance in CKEDITOR.instances) {
                CKEDITOR.instances[instance].updateElement();
            }
        var error = false;
        if (content_title_E == '') {
            $('#errormsgtitle_E').html('Please enter english title');
            error = true;
        }
        else {
            $('#errormsgtitle_E').html('');
        }
        if (content_title_C == '') {
            $('#errormsgtitle_C').html('Please enter chinese title');
            error = true;
        }
        else {
            $('#errormsgtitle_C').html('');
        }
        
        if(jQuery(contentTxtE).length == 0){
            jQuery('#errormsgcontent_E').html('<label  style = "margin-left:10px;color:#f00; " class="error" >Please enter english content.</label>');
            error = true;
        }  
        else {  
            $('#errormsgcontent_E').html('');
        }        
        if(jQuery(contentTxtC).length == 0){
            jQuery('#errormsgcontent_C').html('<label  style = "margin-left:10px;color:#f00; " class="error" >Please enter chinese content.</label>');
            error = true;
        }  
        else {  
            $('#errormsgcontent_C').html('');
        }        
        if (error == false) {
//            var $form = $('#content-form');
//            var formD = $('#content-form').serialize();
            var formD = $('#content-form').find('input, select, textarea, button').serialize();
            
//            var formData = new FormData($form[0]);
//            formData.append('ajax', $form.prop('id'))
            $.ajax({
                
                type: 'POST',
                url: '<?php echo Yii::app()->createAbsoluteUrl("content/create"); ?>',
                data: formD,
                success: function(data) {
                                    window.location.href = '<?php echo Yii::app()->createAbsoluteUrl("content/admin"); ?>';
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